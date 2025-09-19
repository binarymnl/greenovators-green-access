using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/forecast")]
public class ForecastController : ControllerBase
{
    [HttpGet("occupancy")]
    public IActionResult Occupancy()
    {
        return Ok(new {
            forecast = new[] {
                new { hour = "09:00", occupancy = 25 },
                new { hour = "18:00", occupancy = 80 }
            }
        });
    }

    [HttpGet("energy")]
    public IActionResult Energy()
    {
        return Ok(new {
            forecast = new[] {
                new { hour = "09:00", kWh = 15 },
                new { hour = "18:00", kWh = 40 }
            }
        });
    }
}
