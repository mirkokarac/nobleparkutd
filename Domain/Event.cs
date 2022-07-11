namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public DateTime? EventDate { get; set; }
        public DateTime? EventTime { get; set; }
        public EventType EventType { get; set; } = EventType.Match;
        public Location? Location { get; set; }
        public string ImageUrl { get; set; } = String.Empty;
        public bool Completed { get; set; } = false;
    }

    public enum EventType
    {
        Match,
        Social
    }

    public class Location
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public Address? Address { get; set; }
        public float Long { get; set; }
        public float Lat { get; set; }
    }

    public class Address
    {
        public string Number { get; set; } = String.Empty;
        public string Street { get; set; } = String.Empty;
        public string StreetAdditional { get; set; } = String.Empty;
        public int PostCode { get; set; }
        public string State { get; set; } = String.Empty;
        public string Country {get; set;} = String.Empty;
    }
}