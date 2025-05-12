using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }

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
