using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class FlightRepository : IFlightRepository
{
    private readonly FlightContext _context;

    public FlightRepository(FlightContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<List<Flight>> GetFlightsAsync() =>
        await _context.Flights.ToListAsync();

    public async Task<Flight> GetFlightAsync(int id) =>
        await _context.Flights.FindAsync(id);

    public Flight GetFlight(int id) =>
        _context.Flights.Find(id);

    public async Task AddFlightsAsync(List<Flight> flights)
    {
        _context.Flights.AddRange(flights);
        await _context.SaveChangesAsync();
        Console.WriteLine("Add Completed");
    }

    public async Task UpdateFlightAsync(Flight flight)
    {
        _context.Flights.Update(flight);
        await _context.SaveChangesAsync();
        Console.WriteLine("Update Completed");
    }

    public async Task DeleteFlightAsync(int id)
    {
        var flight = await _context.Flights.FindAsync(id);
        if (flight is not null)
        {
            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();
            Console.WriteLine("Delete Completed");
        }
    }

    public decimal CalculateCost(int numberOfPassengers, string destination)
    {
        var costEntry = _context.PassengerCosts.FirstOrDefault(c => numberOfPassengers >= c.MinPassengers && numberOfPassengers <= c.MaxPassengers && c.Location == destination);
        return costEntry?.CostPerPassenger * numberOfPassengers ?? 0;
    }
}
