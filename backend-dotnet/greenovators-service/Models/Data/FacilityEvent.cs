using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data
{
    public class FacilityEvent
    {
        [Key]
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string Zone { get; set; }
        public double EnergyKWh { get; set; }
        public double TempC { get; set; }
        public double Co2Ppm { get; set; }
        public double PvOutputKW { get; set; }
        public string? UserId { get; set; }
        public string? DoorId { get; set; }
        public string? DoorAction { get; set; }
        public string? AuthMethod { get; set; }
        public string? LockerId { get; set; }
        public string? LockerAction { get; set; }
        public int? LockerDurationMin { get; set; }
        public string? EventId { get; set; }
        public string? EventName { get; set; }
        public int? TicketsSold { get; set; }
        public int? ExpectedAttendance { get; set; }
    }
}