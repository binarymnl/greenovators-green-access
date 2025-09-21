using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("admin/consumption")]
    public class ConsumptionController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ConsumptionController(AppDbContext db) { _db = db; }

        [HttpGet("pattern")]
        public async Task<IActionResult> Pattern([FromQuery] string period = "week")
        {
            var start = period == "week" ? DateTime.UtcNow.AddDays(-7) : DateTime.UtcNow.AddMonths(-1);

            var grouped = await _db.FacilityEvents
                .Where(e => e.Timestamp >= start)
                .GroupBy(e => new { Day = e.Timestamp.DayOfWeek, Hour = e.Timestamp.Hour })
                .Select(g => new { g.Key.Day, g.Key.Hour, energy = g.Sum(x => x.EnergyKWh) })
                .ToListAsync();

            // Get all unique days in the dataset
            var availableDays = grouped.Select(d => d.Day).Distinct().ToList();
            
            
            // Pick a random day to treat as a holiday
            var random = new Random();
            var holidayDay = availableDays[random.Next(availableDays.Count)];

            
            var weekday = grouped.Where(d => d.Day != DayOfWeek.Saturday && d.Day != DayOfWeek.Sunday)
                .GroupBy(d => d.Hour)
                .OrderBy(g => g.Key)
                .Select(g => Math.Round(g.Sum(x => x.energy), 2))
                .ToArray();

            var weekend = grouped.Where(d => d.Day == DayOfWeek.Saturday || d.Day == DayOfWeek.Sunday)
                .GroupBy(d => d.Hour)
                .OrderBy(g => g.Key)
                .Select(g => Math.Round(g.Sum(x => x.energy), 2))
                .ToArray();

            // Extract energy consumption pattern for the randomly selected holiday
            var holiday = grouped.Where(d => d.Day == holidayDay)
                .GroupBy(d => d.Hour)
                .OrderBy(g => g.Key)
                .Select(g => Math.Round(g.Sum(x => x.energy), 2))
                .ToArray();
        
            // If we don't have data for all hours (0-23), fill with zeros
            if (holiday.Length < 24)
            {
                var fullHolidayData = new double[24];
                var hourGroups = grouped.Where(d => d.Day == holidayDay)
                    .GroupBy(d => d.Hour)
                    .ToDictionary(g => g.Key, g => Math.Round(g.Sum(x => x.energy), 2));
            
                for (int hour = 0; hour < 24; hour++)
                {
                    fullHolidayData[hour] = hourGroups.ContainsKey(hour) ? hourGroups[hour] : 0;
                }
                holiday = fullHolidayData;
            }

            return Ok(new { weekday, weekend, holiday });
        }
    }
}