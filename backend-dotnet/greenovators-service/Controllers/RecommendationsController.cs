using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RecommendationsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetRecommendations()
    {
        var recommendations = new[] {
            new { action = "Pre-cool GymHall A", time = "18:00", benefit = "Save 12 kWh" },
            new { action = "Shut down Zone B ventilation", time = "21:00", benefit = "Save 8 kWh" }
        };
        return Ok(new { recommendations });
    }
}
