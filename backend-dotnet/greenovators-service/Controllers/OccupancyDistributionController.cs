using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers;

[ApiController]
[Route("admin/occupancy")]
public class OccupancyDistributionController(AppDbContext db) : ControllerBase
{
    [HttpGet("distribution")]
    public async Task<IActionResult> Distribution([FromQuery] string period = "day")
    {
        DateTime start = period switch
        {
            "day" => DateTime.UtcNow.Date,
            "week" => DateTime.UtcNow.AddDays(-7),
            "month" => DateTime.UtcNow.AddMonths(-1),
            _ => DateTime.UtcNow.Date
        };

        var data = await db.FacilityEvents
            .Where(e => e.Timestamp >= start && e.DoorAction == "entry")
            .GroupBy(e => new { e.Zone, e.Timestamp.Hour })
            .Select(g => new {
                g.Key.Zone,
                g.Key.Hour,
                visitors = g.Count()
            })
            .ToListAsync();

        var result = data
            .GroupBy(d => d.Zone)
            .Select(z => new {
                zone = z.Key,
                distribution = z.OrderBy(d => d.Hour)
                    .Select(d => new { hour = d.Hour, visitors = d.visitors })
            });

        return Ok(result);
    }
}