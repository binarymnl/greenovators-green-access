using greenovators_service.Models.Data;
using greenovators_service.Service;
using Microsoft.AspNetCore.Mvc;
using greenovators_service.Infrastructure;

namespace greenovators_service.Controllers
{
    [ApiController]
    [Route("access")]
    public class CheckinController(OccupancyService occupancy, SlotSuggestionService slotService, AppDbContext db)
        : ControllerBase
    {
        [HttpPost("checkin")]
        public IActionResult Checkin([FromBody] ZoneRequest req)
        {
            occupancy.RecordEvent(new CheckinEvent
            {
                UserId = req.userId.ToString(),
                Zone = "Gym",
                Action = EventType.Checkin,
                CheckInTime = req.CheckInTime
            });
            return Ok(new { message = "Checkin recorded" });
        }

        [HttpPost("checkout")]
        public IActionResult Checkout([FromBody] ZoneRequest req)
        {
            occupancy.RecordEvent(new CheckinEvent
            {
                UserId = req.userId.ToString(),
                Zone = "Gym",
                Action = EventType.Checkout,
                CheckInTime = req.CheckInTime,
                CheckOutTime = req.CheckOutTime
            });

            var user = db.Customers.FirstOrDefault(u => u.CustomerId.ToString() == req.userId.ToString());
            return Ok(new { message = "Checkout recorded", RewardPoints = user?.RewardPoints ?? 0 });
        }

        [HttpGet("{userId}/suggested-slot")]
        public IActionResult SuggestedSlot(Guid userId)
        {
            var slot = slotService.GetOrGenerateSuggestion(userId.ToString());
            
            return Ok(new {
                slot.UserId,
                Start = slot.SuggestedStart.ToString(@"hh\:mm"),
                End = slot.SuggestedEnd.ToString(@"hh\:mm"),
                slot.Reason
            });
            
        }

        [HttpGet("{userId}/rewards")]
        public IActionResult Rewards(Guid userId)
        {
            var user = db.Customers.FirstOrDefault(u => u.CustomerId.ToString() == userId.ToString());
            if (user == null) return NotFound();

            return Ok(new { user.Id, user.RewardPoints });
        }

        public record ZoneRequest(Guid userId, string Zone, DateTime CheckInTime, DateTime? CheckOutTime);
    }
}
