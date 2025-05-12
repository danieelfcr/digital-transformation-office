using ApiService.Validators;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        [ValidEmailDomain("dto.com", ErrorMessage = "Solo se permiten correos con el dominio midominio.com.")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
