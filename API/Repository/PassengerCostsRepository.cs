using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class PassengerCostRepository : IPassengerCostRepository
    {
        private readonly FlightContext _context;

        public PassengerCostRepository(FlightContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<PassengerCost>> GetPassengerCostsAsync()
        {
            return await _context.PassengerCosts.ToListAsync();
        }

    }
}
