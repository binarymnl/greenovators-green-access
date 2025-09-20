using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data
{
    public class ActionItem
    {
        [Key]
        public int Id { get; set; }
        public string Key { get; set; }    // e.g., "auto-lighting"
        public string Title { get; set; }
        public string Description { get; set; }
        public double SavingsKwhPerDay { get; set; }
        public bool Enabled { get; set; }
    }
}