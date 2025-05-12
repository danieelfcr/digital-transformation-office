using Microsoft.AspNetCore.Mvc;
using DataServices.Models;
using Microsoft.EntityFrameworkCore;
using ApiService.DTOs;

namespace DataServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionController(AppDbContext context)
        {
            _context = context;
        }

        //POST api/transaction
        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionDto transactionDto)
        {
            if (transactionDto == null)
            {
                return BadRequest("Invalid data.");
            }

            //Creating new transaction
            var transaction = new Transaction
            {
                UserId = transactionDto.UserId,
                SourceCurrency = transactionDto.SourceCurrency,
                DestinationCurrency = transactionDto.DestinationCurrency,
                ExchangeRateUsed = transactionDto.ExchangeRateUsed,
                Timestamp = DateTime.UtcNow
            };

            //Post transaction on db
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateTransaction), new { id = transaction.Id }, transaction);
        }

        // GET api/transaction/recent/{userId}
        [HttpGet("recent/{userId}")]
        public async Task<IActionResult> GetRecentTransactions(int userId)
        {
            var transactions = await _context.Transactions
                .Include(t => t.User)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Timestamp)
                .Take(20)
                .Select(t => new
                {
                    Username = t.User.Name,
                    SourceCurrency = t.SourceCurrency,
                    DestinationCurrency = t.DestinationCurrency,
                    ExchangeRate = t.ExchangeRateUsed,
                    DateTime = t.Timestamp
                })
                .ToListAsync();

            if (!transactions.Any())
            {
                return Ok("No recent transactions.");
            }

            return Ok(transactions);
        }


        // GET api/transaction/count-today/{userId}
        [HttpGet("count-today/{userId}")]
        public async Task<IActionResult> GetTodayTransactionCount(int userId)
        {
            var today = DateTime.UtcNow.Date;

            var count = await _context.Transactions
                .Where(t => t.UserId == userId && t.Timestamp.Date == today)
                .CountAsync();

            return Ok(new { message = $"Total Transactions Today: {count}" });
        }


    }
}
