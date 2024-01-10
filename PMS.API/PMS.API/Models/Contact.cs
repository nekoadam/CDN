namespace PMS.API.Models
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? Mail { get; set; }
        public string? PhoneNo { get; set; }
        public string? Skillset { get; set; }
        public string? Hobby { get; set; }
    }
}

