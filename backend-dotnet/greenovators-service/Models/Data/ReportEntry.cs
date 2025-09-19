using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data;

public class ReportEntry
{
    [Key]
    public int Id { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow.Date;

    [Required]
    public string Zone { get; set; }

    public double EnergySavedKWh { get; set; }
    public double CO2AvoidedKg { get; set; }
}