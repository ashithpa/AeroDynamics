using API.Entities;
using API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/passengercosts")]
    public class PassengerCostController : ControllerBase
    {
        private readonly IPassengerCostRepository _passengerCostRepository;
        private readonly ILogger<PassengerCostController> _logger;

        public PassengerCostController(IPassengerCostRepository passengerCostRepository, ILogger<PassengerCostController> logger)
        {
            _passengerCostRepository = passengerCostRepository ?? throw new ArgumentNullException(nameof(passengerCostRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PassengerCost>>> GetPassengerCosts()
        {
            try
            {
                var passengerCosts = await _passengerCostRepository.GetPassengerCostsAsync();
                return Ok(passengerCosts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving passenger costs");
                return StatusCode(500, "Error retrieving passenger costs");
            }
        }

        // Add other actions as needed
    }
}
