using System.Globalization;
using System.Text;
using API.Entities;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    [ApiController]
    [Route("api/flights")]
     public class FlightController : ControllerBase
    {
        private readonly FlightRepository _flightRepository;
        private readonly ILogger<FlightController> _logger;

        public FlightController(FlightRepository flightRepository, ILogger<FlightController> logger)
        {
            _flightRepository = flightRepository;
            _logger = logger;
        }

        [HttpGet("PassengerCost")]
        public async Task<ActionResult<IEnumerable<PassengerCost>>> GetPassengerCosts()
        {
            try
            {
                var passengerCosts = await _flightRepository.GetPassengerCostsAsync();
                return Ok(passengerCosts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving passenger costs");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving passenger costs");
            }
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
                using (var stream = new StreamReader(file.OpenReadStream(), Encoding.UTF8))
                {
                    string line;
                    // Skip header
                    await stream.ReadLineAsync();
                    while ((line = await stream.ReadLineAsync()) != null)
                    {
                        var values = line.Split(',');
                        if (values.Length < 4)
                            return BadRequest("Invalid file format.");

                        var flight = new Flight
                        {
                            FlightNo = values[0],
                            AircraftRegistrationNo = values[1],
                            Destination = values[2],
                            NumberOfPassengers = int.Parse(values[3], CultureInfo.InvariantCulture),
                        };

                        // Calculate the cost based on the number of passengers
                        flight.Cost = _flightRepository.CalculateCost(flight.NumberOfPassengers);

                        flights.Add(flight);
                    }
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
                existingFlight.Cost = _flightRepository.CalculateCost(flight.NumberOfPassengers);

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