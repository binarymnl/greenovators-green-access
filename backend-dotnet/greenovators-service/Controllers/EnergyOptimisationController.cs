using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers;

[ApiController]
[Route("admin/energy-optimisation")]
public class EnergyOptimisationController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string period = "30d")
    {
        DateTime start = period switch
        {
            "7d" => DateTime.UtcNow.AddDays(-7),
            "30d" => DateTime.UtcNow.AddDays(-30),
            "90d" => DateTime.UtcNow.AddDays(-90),
            _ => DateTime.UtcNow.AddDays(-30)
        };

        var usage = await _db.FacilityEvents
            .Where(e => e.Timestamp >= start)
            .GroupBy(e => e.Zone)
            .Select(g => new {
                zone = g.Key,
                energy = g.Sum(x => x.EnergyKWh),
                avgTemp = g.Average(x => x.TempC),
                avgCo2 = g.Average(x => x.Co2Ppm)
            })
            .ToListAsync();

        var result = usage.Select(u => new {
            zone = u.zone,
            energy_kwh = Math.Round(u.energy, 2),
            optimisation_suggestion =
                u.avgTemp > 26 ? "Lower HVAC load" :
                u.avgCo2 > 650 ? "Increase ventilation" :
                "Maintain current settings"
        });

        return Ok(result);
    }
}