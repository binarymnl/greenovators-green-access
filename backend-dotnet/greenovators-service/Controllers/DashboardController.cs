using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    [HttpGet("summary")]
    public IActionResult Summary()
    {
        var summary = new
        {
            kWhSaved = 125.5,
            co2Avoided = 92.3,
            ecoPointsIssued = 540
        };
        return Ok(summary);
    }
}
