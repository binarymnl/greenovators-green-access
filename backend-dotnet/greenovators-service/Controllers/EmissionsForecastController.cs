using greenovators_service.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace greenovators_service.Controllers;

[ApiController]
[Route("admin/emissions")]
public class EmissionsForecastController(AppDbContext db) : ControllerBase
{
    [HttpGet("forecast")]
    public async Task<IActionResult> Forecast([FromQuery] string period = "daily")
    {
        DateTime start = DateTime.UtcNow.AddDays(-30);

        var dailyEmissions = await db.FacilityEvents
            .Where(e => e.Timestamp >= start)
            .GroupBy(e => e.Timestamp.Date)
            .Select(g => new {
                Date = g.Key,
                Co2Kg = g.Sum(x => x.Co2Ppm * 0.001)
            })
            .OrderBy(x => x.Date)
            .ToListAsync();

        // Simple forecast: moving average of last 7 days
        var avg = dailyEmissions.TakeLast(7).Average(x => x.Co2Kg);
        var forecast = Enumerable.Range(1, period == "weekly" ? 4 : 7)
            .Select(i => new {
                date = DateTime.UtcNow.Date.AddDays(i),
                predicted_co2_kg = Math.Round(avg, 2),
                confidence = 0.85
            });

        return Ok(new {
            historical = dailyEmissions.Select(d => new {
                date = d.Date,
                co2_kg = Math.Round(d.Co2Kg, 2)
            }),
            forecast
        });
    }
}
