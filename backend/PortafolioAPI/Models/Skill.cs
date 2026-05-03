namespace PortafolioAPI.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // Frontend, Backend, Database, Tools
        public string Level { get; set; } = string.Empty;    // Básico, Intermedio, Avanzado
        public string? Icon { get; set; }                    // emoji o nombre de ícono
        public int Order { get; set; } = 0;                  // para ordenarlos
    }
}