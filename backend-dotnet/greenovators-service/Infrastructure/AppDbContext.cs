using greenovators_service.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<CheckinEvent> CheckinEvents { get; set; }
        public DbSet<ReportEntry> ReportEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed demo user
            var demoUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                Username = "user1",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                EcoPoints = 0
            };
            modelBuilder.Entity<User>().HasData(demoUser);
        }
    }
}