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

            return Ok(new { weekday, weekend, holiday = new double[24] });
        }
    }
}