using Microsoft.AspNetCore.Mvc;
using DataServices.Models;
using Microsoft.EntityFrameworkCore;
using ApiService.DTOs;

namespace DataServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FeedbackController(AppDbContext context)
        {
            _context = context;
        }

        //POST api/feedback
        [HttpPost]
        public async Task<IActionResult> CreateFeedback([FromBody] FeedbackDto feedbackDto)
        {
            if (feedbackDto == null)
            {
                return BadRequest("Invalid data.");
            }

            //Creating new feedback
            var feedback = new Feedback
            {
                UserId = feedbackDto.UserId,
                Rating = feedbackDto.Rating,
                Comment = feedbackDto.Comment,
                FeedbackDate = DateTime.UtcNow
            };

            //Post feedback on db
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateFeedback), new { id = feedback.Id }, feedback);
        }
    }
}