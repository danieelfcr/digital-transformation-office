using System.ComponentModel.DataAnnotations;

namespace ApiService.DTOs
{
    public class FeedbackDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; }
    }
}
