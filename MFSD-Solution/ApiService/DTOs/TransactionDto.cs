using System.ComponentModel.DataAnnotations;

namespace ApiService.DTOs
{
    public class TransactionDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string SourceCurrency { get; set; }

        [Required]
        public string DestinationCurrency { get; set; }

        [Required]
        public decimal ExchangeRateUsed { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }
    }
}
