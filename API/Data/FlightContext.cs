using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FlightContext : DbContext
    {
        public FlightContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Flight> Flights{ get; set; }
        public DbSet<PassengerCost> PassengerCosts{ get; set; }

    }
}