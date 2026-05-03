namespace PortafolioAPI.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string? PhotoUrl { get; set; }
        public string? GitHubUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? CvUrl { get; set; }
        public bool IsAvailable { get; set; } = true;
        public string Location { get; set; } = string.Empty;
    }
}