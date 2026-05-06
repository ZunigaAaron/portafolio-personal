namespace PortafolioAPI.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string? PhotoUrl { get; set; }      // URL o base64
        public string? Phone { get; set; }
        public string? Location { get; set; }
        public string? LocationLat { get; set; }   // latitud para el mapa
        public string? LocationLng { get; set; }   // longitud para el mapa
        public string? GitHubUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? TwitterUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? YoutubeUrl { get; set; }
        public string? CvUrl { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}