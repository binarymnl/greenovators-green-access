using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("admin/carbon")]
    public class CarbonController : ControllerBase
    {
        private readonly AppDbContext _db;
        public CarbonController(AppDbContext db) { _db = db; }

        [HttpGet("current")]
        public async Task<IActionResult> Current()
        {
            var today = DateTime.UtcNow.Date;
            var yesterday = today.AddDays(-1);

            var t = await _db.FacilityEvents.Where(e => e.Timestamp >= today).ToListAsync();
            var todayCO2 = t.Sum(e => e.Co2Ppm) * 0.001; // rough conversion
            var y = await _db.FacilityEvents.Where(e => e.Timestamp >= yesterday && e.Timestamp < today).ToListAsync();
            var yesterdayCO2 = y.Sum(e => e.Co2Ppm) * 0.001;
            var diffPct = yesterdayCO2 > 0 ? Math.Round(((todayCO2 - yesterdayCO2) / yesterdayCO2) * 100, 2) : 0;

            return Ok(new {
                current = Math.Round(todayCO2, 2),
                unit = "kg CO2e",
                comparison_pct = diffPct,
                progress_pct = 0 // compute vs a target if you have one
            });
        }
        
        [HttpGet("annual-goal")]
        public async Task<IActionResult> AnnualGoal()
        {
            var yearStart = new DateTime(DateTime.UtcNow.Year, 1, 1);
            var now = DateTime.UtcNow;

            var emissionsYTD = await _db.FacilityEvents
                .Where(e => e.Timestamp >= yearStart)
                .SumAsync(e => e.Co2Ppm * 0.001);

            // Example: Target = 10% less than last year's emissions
            var lastYearStart = yearStart.AddYears(-1);
            var lastYearEnd = yearStart.AddDays(-1);

            var emissionsLastYear = await _db.FacilityEvents
                .Where(e => e.Timestamp >= lastYearStart && e.Timestamp <= lastYearEnd)
                .SumAsync(e => e.Co2Ppm * 0.001);

            var target = emissionsLastYear * 0.90;
            var progressPct = target > 0 ? (emissionsYTD / target) * 100 : 0;

            return Ok(new {
                current = Math.Round(emissionsYTD, 2),
                target = Math.Round(target, 2),
                progress_pct = Math.Round(progressPct, 2),
                unit = "kg CO2e"
            });
        }
        
        [HttpGet("impact")]
        public async Task<IActionResult> Impact()
        {
            var last30d = DateTime.UtcNow.AddDays(-30);
            var last30 = await _db.FacilityEvents
                .Where(e => e.Timestamp >= last30d)
                .SumAsync(e => e.Co2Ppm * 0.001);

            var prev30 = await _db.FacilityEvents
                .Where(e => e.Timestamp < last30d && e.Timestamp >= last30d.AddDays(-30))
                .SumAsync(e => e.Co2Ppm * 0.001);

            var reductionPct = prev30 > 0 ? ((prev30 - last30) / prev30) * 100 : 0;

            return Ok(new {
                last_30d = Math.Round(last30, 2),
                prev_30d = Math.Round(prev30, 2),
                reduction_pct = Math.Round(reductionPct, 2),
                message = reductionPct > 0 ? "On track to reduce emissions" : "Increase in CO₂, action required"
            });
        }

    }
}
