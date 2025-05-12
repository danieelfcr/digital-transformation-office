using DataServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.DTOs;

namespace ApiService.Controllers
{
    [ApiController]
    [Route ("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return NotFound(new { message = "User not found" });
            
            //Using bcrypt for security reasons
            bool passwordMatch = BCrypt.Net.BCrypt.Verify(request.Password, user.Password);
            if(!passwordMatch)
                return Unauthorized(new {message = "Password is incorrect"});

            var hour = DateTime.Now.Hour;
            var greeting = hour < 12 ? "Good morning" : (hour < 18 ? "Good afternoon" : "Good evening");
            var message = $"{greeting}, {user.Name}!";

            return Ok(new { user.Id, message});

        }
    }
}
