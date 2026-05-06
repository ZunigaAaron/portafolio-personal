using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────
        // GET /api/profile
        // Devuelve el perfil público
        // ─────────────────────────────────────────
        [HttpGet]
        public async Task<ActionResult<Profile>> Get()
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();

            // Si no existe, devuelve un perfil vacío en lugar de 404
            if (profile == null)
                return Ok(new Profile());

            return Ok(profile);
        }

        // ─────────────────────────────────────────
        // POST /api/profile
        // Crea el perfil inicial
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Profile>> Create(Profile profile)
        {
            var existing = await _context.Profiles.FirstOrDefaultAsync();
            if (existing != null)
                return BadRequest(new { message = "Ya existe un perfil" });

            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();

            return Ok(profile);
        }

        // ─────────────────────────────────────────
        // PUT /api/profile
        // Actualiza el perfil
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPut]
        public async Task<ActionResult<Profile>> Update(Profile profile)
        {
            var existing = await _context.Profiles.FirstOrDefaultAsync();

            if (existing == null)
                return NotFound(new { message = "Perfil no encontrado" });

            existing.Name = profile.Name;
            existing.Role = profile.Role;
            existing.Bio = profile.Bio;
            existing.PhotoUrl = profile.PhotoUrl;
            existing.Phone = profile.Phone;
            existing.Location = profile.Location;
            existing.LocationLat = profile.LocationLat;
            existing.LocationLng = profile.LocationLng;
            existing.GitHubUrl = profile.GitHubUrl;
            existing.LinkedInUrl = profile.LinkedInUrl;
            existing.TwitterUrl = profile.TwitterUrl;
            existing.InstagramUrl = profile.InstagramUrl;
            existing.YoutubeUrl = profile.YoutubeUrl;
            existing.CvUrl = profile.CvUrl;
            existing.IsAvailable = profile.IsAvailable;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }
    }
}