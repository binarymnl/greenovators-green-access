using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("admin/energy")]
    public class EnergyController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly Dictionary<string,double> _limits = new() {
            {"GymHall", 50 }, {"LockerRoom", 30 }, {"PoolArea", 40 }
        };

        public EnergyController(AppDbContext db) { _db = db; }

        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var lastHour = DateTime.UtcNow.AddHours(-1);
            var usage = await _db.FacilityEvents
                .Where(e => e.Timestamp >= lastHour)
                .GroupBy(e => e.Zone)
                .Select(g => new { zone = g.Key, usage = g.Sum(x => x.EnergyKWh) })
                .ToListAsync();

            var result = usage.Select(u => new {
                zone = u.zone,
                usage = Math.Round(u.usage,2),
                limit = _limits.ContainsKey(u.zone) ? _limits[u.zone] : 50,
                status = (_limits.ContainsKey(u.zone) && u.usage > _limits[u.zone]) ? "High" : "Optimal"
            });

            return Ok(result);
        }
    }
}