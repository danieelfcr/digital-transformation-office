using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ApiService.Validators
{
    public class ValidEmailDomainAttribute : ValidationAttribute
    {
        private readonly string _allowedDomain;

        public ValidEmailDomainAttribute(string allowedDomain)
        {
            _allowedDomain = allowedDomain;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is string email && email.EndsWith("@" + _allowedDomain, StringComparison.OrdinalIgnoreCase))
            {
                return ValidationResult.Success;
            }

            return new ValidationResult(ErrorMessage ?? $"El correo debe ser del dominio {_allowedDomain}.");
        }
    }

}
