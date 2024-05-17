
namespace API.Entities
{
    public class Flight
    {
        public int Id { get; set; }
        public string FlightNo { get; set; }
        public string AircraftRegistrationNo { get; set; }
        public string Destination { get; set; }
        public int NumberOfPassengers { get; set; }
        public decimal Cost { get; set; }
        public string Note { get; set; }

    }
}