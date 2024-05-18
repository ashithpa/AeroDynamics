using API.Entities;

namespace API.Repository
{
    public interface IPassengerCostRepository
    {
        Task<List<PassengerCost>> GetPassengerCostsAsync();
    }
}
