using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repository
{
    public interface IFlightRepository
    {
        Task<List<PassengerCost>> GetPassengerCostsAsync();
        Task<List<Flight>> GetFlightsAsync();
        Task<Flight> GetFlightAsync(int id);
        Flight GetFlight(int id);
        Task AddFlightsAsync(List<Flight> flights);
        Task UpdateFlightAsync(Flight flight);
        decimal CalculateCost(int numberOfPassengers);
    }
}