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
        public Guid LocationId { get; set; }
        public Location? Location { get; set; }
        public string ImageUrl { get; set; } = String.Empty;
        public bool Completed { get; set; } = false;
        public Guid TeamId { get; set; }
        public Team? Team { get; set; }
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
        public Guid AddressId { get; set; }
        public Address? Address { get; set; }
        public float Long { get; set; }
        public float Lat { get; set; }
    }

    public class Address
    {
        public Guid Id { get; set; }
        public string Number { get; set; } = String.Empty;
        public string Street { get; set; } = String.Empty;
        public string StreetAdditional { get; set; } = String.Empty;
        public int PostCode { get; set; }
        public string State { get; set; } = String.Empty;
        public string Country {get; set;} = String.Empty;
    }

    public class Team
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string LogoUrl { get; set; } = String.Empty;        
    }
}