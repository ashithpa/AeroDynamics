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
                    CostPerPassenger = 16.50M,
                    Location = "Adelaide"
                },
                       new PassengerCost
                {
                    MinPassengers = 11,
                    MaxPassengers = 20,
                    CostPerPassenger = 15.20M,
                    Location = "Adelaide"
                },
                      new PassengerCost
                {
                    MinPassengers = 21,
                    MaxPassengers = 40,
                    CostPerPassenger = 14M,
                    Location = "Adelaide"
                },
                      new PassengerCost
                {
                    MinPassengers = 41,
                    MaxPassengers = int.MaxValue,
                    CostPerPassenger = 10.50M,
                    Location = "Adelaide"
                },
                         new PassengerCost
                {
                    MinPassengers = 1,
                    MaxPassengers = 10,
                    CostPerPassenger = 15.50M,
                    Location = "Melbourne"
                },
                       new PassengerCost
                {
                    MinPassengers = 11,
                    MaxPassengers = 20,
                    CostPerPassenger = 14.20M,
                    Location = "Melbourne"
                },
                      new PassengerCost
                {
                    MinPassengers = 21,
                    MaxPassengers = 40,
                    CostPerPassenger = 13.40M,
                    Location = "Melbourne"
                },
                      new PassengerCost
                {
                    MinPassengers = 41,
                    MaxPassengers = int.MaxValue,
                    CostPerPassenger = 10M,
                    Location = "Melbourne"
                },
                      new PassengerCost
                {
                    MinPassengers = 1,
                    MaxPassengers = int.MaxValue,
                    CostPerPassenger = 14.5M,
                    Location = Utils.Other
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