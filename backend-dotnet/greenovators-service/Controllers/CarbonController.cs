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
    }
}
