using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PortafolioAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PortafolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        // ─────────────────────────────────────────
        // POST /api/auth/login
        // Recibe usuario y password, devuelve un token JWT
        // ─────────────────────────────────────────
        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            // Leer las credenciales del appsettings.json
            var adminUsername = _config["Admin:Username"];
            var adminPassword = _config["Admin:Password"];

            // Verificar si el usuario y contraseña son correctos
            if (request.Username != adminUsername || request.Password != adminPassword)
                return Unauthorized(new { message = "Credenciales incorrectas" });

            // Si son correctos, generamos el token
            var token = GenerateToken();

            return Ok(new { token });
        }

        // ─────────────────────────────────────────
        // Método privado que genera el token JWT
        // ─────────────────────────────────────────
        private string GenerateToken()
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)
            );

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Claims: información que va dentro del token
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, _config["Admin:Username"]!),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8), // el token dura 8 horas
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}