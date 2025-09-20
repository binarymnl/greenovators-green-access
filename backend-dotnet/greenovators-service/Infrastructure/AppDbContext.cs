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
        public DbSet<FacilityEvent> FacilityEvents { get; set; }
        public DbSet<ActionItem> ActionItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed demo user
            // var demoUser = new User
            // {
            //     Id = Guid.NewGuid().ToString(),
            //     Username = "user1",
            //     PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
            //     EcoPoints = 0
            // };
            // modelBuilder.Entity<User>().HasData(demoUser);
            //
            // modelBuilder.Entity<ActionItem>().HasData(
            //     new ActionItem { Id = 1, Key = "auto-lighting", Title = "Auto-adjust Lighting", Description = "Enable smart lighting", SavingsKwhPerDay = 50, Enabled = false },
            //     new ActionItem { Id = 2, Key = "pool-temp", Title = "Optimize Pool Temperature", Description = "Optimize pool temp off-peak", SavingsKwhPerDay = 25, Enabled = false },
            //     new ActionItem { Id = 3, Key = "smart-vent", Title = "Smart Ventilation", Description = "Vent based on CO2", SavingsKwhPerDay = 40, Enabled = false }
            // );
        }
    }
}