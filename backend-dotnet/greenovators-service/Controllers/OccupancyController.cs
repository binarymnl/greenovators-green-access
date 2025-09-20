using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("admin/occupancy")]
    public class OccupancyController : ControllerBase
    {
        private readonly AppDbContext _db;
        public OccupancyController(AppDbContext db) { _db = db; }

        [HttpGet("status")]
        public async Task<IActionResult> Status()
        {
            var lastHour = DateTime.UtcNow.AddHours(-1);
            var zoneEntries = await _db.FacilityEvents
                .Where(e => e.Timestamp >= lastHour && e.DoorAction == "entry")
                .GroupBy(e => e.Zone)
                .Select(g => new { name = g.Key, occupancy_pct = g.Count() })
                .ToListAsync();

            var totalEnergy = await _db.FacilityEvents.Where(e => e.Timestamp >= lastHour).SumAsync(e => e.EnergyKWh);
            var efficiency = totalEnergy > 0 ? Math.Max(0, 100 - (totalEnergy / 2)) : 100; // tune formula
            return Ok(new {
                timestamp = DateTime.UtcNow,
                zones = zoneEntries,
                energy_efficiency_pct = Math.Round(efficiency, 2),
                delta_pct = 0.0
            });
        }
    }
}