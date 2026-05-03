using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThemeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ThemeController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────
        // GET /api/theme
        // Devuelve el tema actual
        // ─────────────────────────────────────────
        [HttpGet]
        public async Task<ActionResult<AppTheme>> Get()
        {
            var theme = await _context.AppThemes.FirstOrDefaultAsync();

            if (theme == null)
            {
                // Si no hay tema, devuelve los valores por defecto
                return Ok(new AppTheme());
            }

            return Ok(theme);
        }

        // ─────────────────────────────────────────
        // POST /api/theme
        // Crea el tema inicial
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AppTheme>> Create(AppTheme theme)
        {
            var existing = await _context.AppThemes.FirstOrDefaultAsync();
            if (existing != null)
                return BadRequest(new { message = "Ya existe un tema" });

            _context.AppThemes.Add(theme);
            await _context.SaveChangesAsync();

            return Ok(theme);
        }

        // ─────────────────────────────────────────
        // PUT /api/theme
        // Actualiza el tema
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPut]
        public async Task<ActionResult<AppTheme>> Update(AppTheme theme)
        {
            var existing = await _context.AppThemes.FirstOrDefaultAsync();

            if (existing == null)
            {
                // Si no existe lo crea
                _context.AppThemes.Add(theme);
                await _context.SaveChangesAsync();
                return Ok(theme);
            }

            existing.AccentColor = theme.AccentColor;
            existing.BackgroundColor = theme.BackgroundColor;
            existing.SurfaceColor = theme.SurfaceColor;
            existing.TextColor = theme.TextColor;
            existing.FontDisplay = theme.FontDisplay;
            existing.FontBody = theme.FontBody;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }
    }
}