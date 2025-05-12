using System.ComponentModel.DataAnnotations;

namespace DataServices.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; }

        public DateTime FeedbackDate { get; set; }
    }
}
