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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Flight>()
            .Property(f => f.Cost)
            .HasPrecision(18, 2); // or use .HasColumnType("decimal(18, 2)");

            modelBuilder.Entity<PassengerCost>()
            .Property(p => p.CostPerPassenger)
            .HasPrecision(18, 2); // or use .HasColumnType("decimal(18, 2)");
        
        // Other model configurations
    }

    }
}