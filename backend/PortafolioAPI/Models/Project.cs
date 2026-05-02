namespace PortafolioAPI.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string GitHubUrl { get; set; } = string.Empty;

        public string? LiveUrl { get; set; }  // opcional, puede estar vacío

        public string Technologies { get; set; } = string.Empty; // "React, .NET, SQL"

        public string? ImageUrl { get; set; } // opcional por ahora

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsFeatured { get; set; } = false;
    }
}