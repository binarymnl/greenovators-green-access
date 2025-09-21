using greenovators_service.Infrastructure;
using greenovators_service.Models.Data;

namespace greenovators_service.Service
{
    public class SlotSuggestionService
    {
        private readonly AppDbContext _db;
        private readonly ForecastService _forecast;

        public SlotSuggestionService(AppDbContext db, ForecastService forecast)
        {
            _db = db;
            _forecast = forecast;
        }

        public SuggestedSlot GetOrGenerateSuggestion(string userId)
        {
            var today = DateTime.UtcNow.Date;
            var slot = _db.SuggestedSlots
                .FirstOrDefault(s => s.UserId == userId && s.CreatedAt.Date == today);

            if (slot != null) return slot;

            var history = _db.CheckinEvents
                .Where(c => c.UserId == userId && c.CheckInTime >= DateTime.UtcNow.AddDays(-30))
                .ToList();

            var suggestion = _forecast.GenerateSuggestion(userId, history);
            _db.SuggestedSlots.Add(suggestion);
            _db.SaveChanges();
            return suggestion;
        }
    }
}