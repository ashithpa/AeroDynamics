using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class FlightRepository : IFlightRepository
    {
        private readonly FlightContext _context;

        public FlightRepository(FlightContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<PassengerCost>> GetPassengerCostsAsync()
        {
            return await _context.PassengerCosts.ToListAsync();
        }

        public async Task<List<Flight>> GetFlightsAsync()
        {
            return await _context.Flights.ToListAsync();
        }

        public async Task<Flight> GetFlightAsync(int id)
        {
            return await _context.Flights.FindAsync(id);
        }

        public Flight GetFlight(int id)
        {
            return _context.Flights.Find(id);
        }

        public async Task AddFlightsAsync(List<Flight> flights)
        {
            _context.Flights.AddRange(flights);
            await _context.SaveChangesAsync();
            Console.WriteLine("AddCompleted");
        }

        public async Task UpdateFlightAsync(Flight flight)
        {
            _context.Flights.Update(flight);
            await _context.SaveChangesAsync();
            Console.WriteLine("UpdateCompleted");
        }

        public decimal CalculateCost(int numberOfPassengers)
        {
            var costEntry = _context.PassengerCosts.FirstOrDefault(c => numberOfPassengers >= c.MinPassengers && numberOfPassengers <= c.MaxPassengers);
            return costEntry?.CostPerPassenger * numberOfPassengers ?? 0;
        }
    }
}