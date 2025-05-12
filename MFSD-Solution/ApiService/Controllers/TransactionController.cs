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
    }
}
