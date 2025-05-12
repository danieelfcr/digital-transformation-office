using Microsoft.EntityFrameworkCore;
using DataServices.Models;
using BCrypt.Net;

namespace DataServices;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Transaction>()
            .HasOne(t => t.User)
            .WithMany(u => u.Transactions)
            .HasForeignKey(t => t.UserId);

        modelBuilder.Entity<Feedback>()
            .HasOne(f => f.User)
            .WithMany(u => u.Feedbacks)
            .HasForeignKey(f => f.UserId);

        //Precise ExchangeRateUsed
        modelBuilder.Entity<Transaction>()
            .Property(t => t.ExchangeRateUsed)
            .HasColumnType("decimal(18, 2)");

        //Hashed paswords
        var adminPassword = BCrypt.Net.BCrypt.HashPassword("admin");
        var user1Password = BCrypt.Net.BCrypt.HashPassword("1234");
        var user2Password = BCrypt.Net.BCrypt.HashPassword("5678");

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Admin",
                Email = "admin@dto.com",
                Password = adminPassword,
                IsAdmin = true
            },
            new User
            {
                Id = 2,
                Name = "Daniel",
                Email = "daniel@dto.com",
                Password = user1Password,
                IsAdmin = false
            },
            new User
            {
                Id = 3,
                Name = "Hector",
                Email = "hector@dto.com",
                Password = user2Password,
                IsAdmin = false
            }
        );
    }
}
