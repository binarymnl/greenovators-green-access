using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data
{
    public class SuggestedSlot
    {
        [Key] public int Id { get; set; }
        [Required] public string UserId { get; set; }
        [Required] public TimeSpan SuggestedStart { get; set; }
        [Required] public TimeSpan SuggestedEnd { get; set; }
        public string Reason { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}