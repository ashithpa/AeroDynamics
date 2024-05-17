using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PassengerCost
    {
        public int Id { get; set; }
        public int MinPassengers { get; set; }
        public int MaxPassengers { get; set; }
        public decimal CostPerPassenger { get; set; }
    }
}