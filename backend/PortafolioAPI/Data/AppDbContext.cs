using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Models;

namespace PortafolioAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Estas propiedades representan las tablas en tu base de datos
        public DbSet<Project> Projects { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<AppTheme> AppThemes { get; set; }
    }
}