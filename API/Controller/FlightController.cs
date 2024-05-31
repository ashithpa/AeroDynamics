using System.Globalization;
using System.Text;
using API.Entities;
using API.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/flights")]
    public class FlightController : ControllerBase
    {
        private readonly IFlightRepository _flightRepository;
        private readonly ILogger<FlightController> _logger;

        public FlightController(IFlightRepository flightRepository, ILogger<FlightController> logger)
        {
            _flightRepository = flightRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            try
            {
                var flights = await _flightRepository.GetFlightsAsync();
                return Ok(flights);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving flights");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving flights");
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFlights(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded.");

                var flights = new List<Flight>();

                // Check file extension to determine the format
                var fileExtension = Path.GetExtension(file.FileName);
                if (fileExtension.Equals(".csv", StringComparison.OrdinalIgnoreCase))
                {
                    flights = ParseCsvFile(file);
                }
                else if (fileExtension.Equals(".json", StringComparison.OrdinalIgnoreCase))
                {
                    flights = await ParseJsonFile(file);
                }
                else
                {
                    return BadRequest("Unsupported file format. Please upload a CSV or JSON file.");
                }

                await _flightRepository.AddFlightsAsync(flights);

                return Ok("Flights uploaded successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading flights");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading flights");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            try
            {
                var existingFlight = await _flightRepository.GetFlightAsync(id);
                if (existingFlight == null)
                {
                    return NotFound("Flight not found.");
                }

                await _flightRepository.DeleteFlightAsync(id);
                return Ok("Flight deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting flight");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting flight");
            }
        }

        private List<Flight> ParseCsvFile(IFormFile file)
        {
            var flights = new List<Flight>();

            using (var stream = new StreamReader(file.OpenReadStream(), Encoding.UTF8))
            {
                // Skip header
                stream.ReadLine();

                string line;
                while ((line = stream.ReadLine()) != null)
                {
                    var values = line.Split(',');
                    if (values.Length >= 4)
                    {
                        var flight = new Flight
                        {
                            FlightNo = values[0],
                            AircraftRegistrationNo = values[1],
                            Destination = values[2],
                            NumberOfPassengers = int.Parse(values[3], CultureInfo.InvariantCulture),
                        };

                        flight.Cost = _flightRepository.CalculateCost(flight.NumberOfPassengers, flight.Destination);

                        flights.Add(flight);
                    }
                }
            }

            return flights;
        }

        private async Task<List<Flight>> ParseJsonFile(IFormFile file)
        {
            var jsonContent = await new StreamReader(file.OpenReadStream()).ReadToEndAsync();
            return JsonConvert.DeserializeObject<List<Flight>>(jsonContent);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditFlight(int id, [FromBody] Flight flight)
        {
            try
            {
                if (id != flight.Id)
                    return BadRequest("Flight ID mismatch.");

                var existingFlight = await _flightRepository.GetFlightAsync(id);
                if (existingFlight == null)
                    return NotFound("Flight not found.");

                existingFlight.FlightNo = flight.FlightNo;
                existingFlight.AircraftRegistrationNo = flight.AircraftRegistrationNo;
                existingFlight.Destination = flight.Destination;
                existingFlight.NumberOfPassengers = flight.NumberOfPassengers;
                existingFlight.Note = flight.Note;
                existingFlight.Cost = _flightRepository.CalculateCost(flight.NumberOfPassengers, flight.Destination);

                await _flightRepository.UpdateFlightAsync(existingFlight);

                return Ok("Flight updated successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating flight");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating flight");
            }
        }
    }
}
