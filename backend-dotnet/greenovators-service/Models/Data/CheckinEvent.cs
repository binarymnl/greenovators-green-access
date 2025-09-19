using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data;

public class CheckinEvent
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; }

    [Required]
    public string Zone { get; set; }

    [Required]
    public EventType Action { get; set; } 

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

public enum EventType
{
    Checkin,
    Checkout
}