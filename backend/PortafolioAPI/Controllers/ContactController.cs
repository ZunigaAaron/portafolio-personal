using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        // ─────────────────────────────────────────
        // POST /api/contact
        // Alguien te manda un mensaje desde el portafolio
        // ─────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> Send(ContactMessage message)
        {
            message.SentAt = DateTime.UtcNow;
            message.IsRead = false;

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Mensaje enviado correctamente" });
        }

        // ─────────────────────────────────────────
        // GET /api/contact
        // Ver todos los mensajes que te han mandado
        // (solo tú deberías poder ver esto — lo protegeremos después)
        // ─────────────────────────────────────────
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactMessage>>> GetAll()
        {
            var messages = await _context.ContactMessages
                .OrderByDescending(m => m.SentAt)
                .ToListAsync();

            return Ok(messages);
        }

        // ─────────────────────────────────────────
        // PUT /api/contact/5/read
        // Marcar un mensaje como leído
        // ─────────────────────────────────────────
        [Authorize]
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);

            if (message == null)
                return NotFound(new { message = "Mensaje no encontrado" });

            message.IsRead = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ─────────────────────────────────────────
        // DELETE /api/contact/{id}
        // Elimina un mensaje
        // ─────────────────────────────────────────
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);

            if (message == null)
                return NotFound(new { message = "Mensaje no encontrado" });

            _context.ContactMessages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
