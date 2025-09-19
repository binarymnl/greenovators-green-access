using System.Security.Claims;
using greenovators_service.Models.Data;
using greenovators_service.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("access")]
    public class CheckinController : ControllerBase
    {
        private readonly OccupancyService _occupancy;

        public CheckinController(OccupancyService occupancy) => _occupancy = occupancy;

        [Authorize]
        [HttpPost("checkin")]
        public IActionResult Checkin([FromBody] ZoneRequest req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (userId == null) return Unauthorized();

            _occupancy.RecordEvent(new CheckinEvent { UserId = userId, Zone = req.Zone, Action = EventType.Checkin });
            return Ok(new { message = "Checkin recorded" });
        }

        [Authorize]
        [HttpPost("checkout")]
        public IActionResult Checkout([FromBody] ZoneRequest req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            _occupancy.RecordEvent(new CheckinEvent { UserId = userId, Zone = req.Zone, Action = EventType.Checkout });
            return Ok(new { message = "Checkout recorded" });
        }

        public record ZoneRequest(string Zone);
    }
}