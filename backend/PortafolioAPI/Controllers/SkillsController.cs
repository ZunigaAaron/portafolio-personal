using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SkillsController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────
        // GET /api/skills
        // Devuelve todas las habilidades
        // ─────────────────────────────────────────
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetAll()
        {
            var skills = await _context.Skills
                .OrderBy(s => s.Order)
                .ToListAsync();

            return Ok(skills);
        }

        // ─────────────────────────────────────────
        // POST /api/skills
        // Agrega una habilidad
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Skill>> Create(Skill skill)
        {
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();

            return Ok(skill);
        }

        // ─────────────────────────────────────────
        // PUT /api/skills/{id}
        // Edita una habilidad
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Skill>> Update(int id, Skill skill)
        {
            var existing = await _context.Skills.FindAsync(id);

            if (existing == null)
                return NotFound(new { message = "Habilidad no encontrada" });

            existing.Name = skill.Name;
            existing.Category = skill.Category;
            existing.Level = skill.Level;
            existing.Icon = skill.Icon;
            existing.Order = skill.Order;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // ─────────────────────────────────────────
        // DELETE /api/skills/{id}
        // Elimina una habilidad
        // ─────────────────────────────────────────
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var skill = await _context.Skills.FindAsync(id);

            if (skill == null)
                return NotFound(new { message = "Habilidad no encontrada" });

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}