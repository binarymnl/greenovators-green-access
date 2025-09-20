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

        [HttpPost("checkin")]
        public IActionResult Checkin([FromBody] ZoneRequest req)
        {
            _occupancy.RecordEvent(new CheckinEvent { UserId = req.userId.ToString(), Zone = "Gym", Action = EventType.Checkin, CheckInTime = req.CheckInTime});
            return Ok(new { message = "Checkin recorded" });
        }

        [HttpPost("checkout")]
        public IActionResult Checkout([FromBody] ZoneRequest req)
        {
            _occupancy.RecordEvent(new CheckinEvent { UserId = req.userId.ToString(), Zone = "Gym", Action = EventType.Checkout, CheckInTime = req.CheckInTime ,CheckOutTime = req.CheckOutTime});
            return Ok(new { message = "Checkout recorded" });
        }

        public record ZoneRequest(Guid userId ,string Zone, DateTime CheckInTime, DateTime CheckOutTime);
    }
}