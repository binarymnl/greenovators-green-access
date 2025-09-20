using greenovators_service.Infrastructure;
using greenovators_service.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("admin/forecast")]
    public class ForecastController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly AiService _ai;
        public ForecastController(AppDbContext db, AiService ai) { _db = db; _ai = ai; }

        [HttpGet("today")]
        public async Task<IActionResult> Today([FromQuery] string zone = "GymHall")
        {
            // try AI first
            var aiResult = await _ai.AnalyzeLast7DaysAsync(zone);
            if (aiResult != null)
                return Ok(new { from_ai = true, result = aiResult });

            // fallback: aggregate today's entries
            var today = DateTime.UtcNow.Date;
            var data = await _db.FacilityEvents
                .Where(e => e.Timestamp >= today && e.Zone == zone)
                .GroupBy(e => e.Timestamp.Hour)
                .Select(g => new { Hour = g.Key, Visitors = g.Count(x => x.DoorAction == "entry") })
                .ToListAsync();

            var hourly = data.OrderBy(d => d.Hour).Select(d => new {
                time = $"{d.Hour}:00",
                predicted_visitors = d.Visitors,
                confidence = 0.7
            });

            var peak = data.OrderByDescending(d => d.Visitors).FirstOrDefault();

            return Ok(new {
                hourly,
                peak_hour = peak == null ? null : new { time = $"{peak.Hour}:00", visitors = peak.Visitors, delta_pct = 0 },
                avg_dwell_time_min = await _db.FacilityEvents.Where(e => e.LockerDurationMin != null).AverageAsync(e => (double?)e.LockerDurationMin) ?? 0
            });
        }

        [HttpGet("weekly")]
        public async Task<IActionResult> Weekly([FromQuery] string zone = "GymHall")
        {
            var start = DateTime.UtcNow.AddDays(-7);
            var data = await _db.FacilityEvents.Where(e => e.Timestamp >= start && e.Zone == zone)
                .GroupBy(e => e.Timestamp.DayOfWeek)
                .Select(g => new { Day = g.Key, Visitors = g.Count(x => x.DoorAction == "entry") })
                .ToListAsync();

            var weekly = data.Select(d => new {
                day = d.Day.ToString(),
                visitors = d.Visitors,
                capacity_pct = Math.Round((d.Visitors / 400.0) * 100, 2),
                confidence = 0.8
            });

            return Ok(weekly);
        }

        [HttpGet("insights")]
        public async Task<IActionResult> Insights([FromQuery] string zone = "GymHall")
        {
            var lastWeek = DateTime.UtcNow.AddDays(-7);
            var hourly = await _db.FacilityEvents.Where(e => e.Timestamp >= lastWeek && e.Zone == zone && e.DoorAction == "entry")
                .GroupBy(e => e.Timestamp.Hour)
                .Select(g => new { Hour = g.Key, Visitors = g.Count() })
                .ToListAsync();

            var peak = hourly.OrderByDescending(h => h.Visitors).FirstOrDefault();
            var offpeak = hourly.OrderBy(h => h.Visitors).FirstOrDefault();
            var tempCorrelation = await _db.FacilityEvents.Where(e => e.Zone == zone && e.Timestamp >= lastWeek)
                .GroupBy(e => Math.Round(e.TempC))
                .Select(g => new { Temp = g.Key, AvgEnergy = g.Average(x => x.EnergyKWh) })
                .OrderByDescending(x => x.AvgEnergy).FirstOrDefaultAsync();

            return Ok(new {
                peak_hour = peak == null ? null : $"{peak.Hour}:00",
                off_peak_hour = offpeak == null ? null : $"{offpeak.Hour}:00",
                weather_impact = tempCorrelation == null ? "N/A" : $"Higher energy around {tempCorrelation.Temp}°C"
            });
        }
    }
}
