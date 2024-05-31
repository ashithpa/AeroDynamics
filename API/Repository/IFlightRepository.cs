using API.Entities;

namespace API.Repository
{
    public interface IFlightRepository
    {
        Task<List<Flight>> GetFlightsAsync();
        Task<Flight> GetFlightAsync(int id);
        Flight GetFlight(int id);
        Task AddFlightsAsync(List<Flight> flights);
        Task UpdateFlightAsync(Flight flight);
        Task DeleteFlightAsync(int id);
        decimal CalculateCost(int numberOfPassengers, string destination);
    }
}