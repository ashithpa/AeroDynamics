using API.Entities;

namespace API.Data
{
    public static class DBInitializer
    {
        public static async Task Initialize(FlightContext context)
        {

            if (context.PassengerCosts.Any()) return;

            var PassengerCosts = new List<PassengerCost>
            {
                       new PassengerCost
                {
                    MinPassengers = 1,
                    MaxPassengers = 10,
                    CostPerPassenger = 15.50M
                },
                       new PassengerCost
                {
                    MinPassengers = 11,
                    MaxPassengers = 20,
                    CostPerPassenger = 14.20M
                },
                      new PassengerCost
                {
                    MinPassengers = 21,
                    MaxPassengers = 40,
                    CostPerPassenger = 13.40M
                },
                      new PassengerCost
                {
                    MinPassengers = 41,
                    MaxPassengers = 2147483647,
                    CostPerPassenger = 10M
                },
            };

            foreach (var PassengerCost in PassengerCosts)
            {
                context.PassengerCosts.Add(PassengerCost);
            }

            await context.SaveChangesAsync();
        }
    }
}