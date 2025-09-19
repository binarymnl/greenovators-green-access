using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TapController : ControllerBase
{
    [HttpPost]
    public IActionResult Tap([FromBody] TapEvent tap)
    {
        // Mock eco-points allocation
        var response = new
        {
            userId = tap.UserId,
            ecoPoints = 10,
            eventType = tap.EventType,
            zone = tap.Zone
        };
        return Ok(response);
    }
}

public class TapEvent
{
    public string UserId { get; set; }
    public string EventType { get; set; }
    public string Zone { get; set; }
}
