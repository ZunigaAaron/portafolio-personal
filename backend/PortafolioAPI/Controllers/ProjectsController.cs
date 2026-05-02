using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Esto se llama "inyección de dependencias"
        // Visual Studio nos da el DbContext automáticamente
        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────
        // GET /api/projects
        // Devuelve todos los proyectos
        // ─────────────────────────────────────────
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAll()
        {
            var projects = await _context.Projects
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return Ok(projects);
        }

        // ─────────────────────────────────────────
        // GET /api/projects/featured
        // Devuelve solo los proyectos destacados
        // ─────────────────────────────────────────
        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<Project>>> GetFeatured()
        {
            var featured = await _context.Projects
                .Where(p => p.IsFeatured)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return Ok(featured);
        }

        // ─────────────────────────────────────────
        // GET /api/projects/5
        // Devuelve un proyecto por su Id
        // ─────────────────────────────────────────
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetById(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return NotFound(new { message = "Proyecto no encontrado" });

            return Ok(project);
        }

        // ─────────────────────────────────────────
        // POST /api/projects
        // Crea un nuevo proyecto
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Project>> Create(Project project)
        {
            project.CreatedAt = DateTime.UtcNow;

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
        }

        // ─────────────────────────────────────────
        // PUT /api/projects/5
        // Edita un proyecto existente
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Project project)
        {
            if (id != project.Id)
                return BadRequest(new { message = "El Id no coincide" });

            var exists = await _context.Projects.AnyAsync(p => p.Id == id);
            if (!exists)
                return NotFound(new { message = "Proyecto no encontrado" });

            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ─────────────────────────────────────────
        // DELETE /api/projects/5
        // Elimina un proyecto
        // ─────────────────────────────────────────
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
                return NotFound(new { message = "Proyecto no encontrado" });

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}