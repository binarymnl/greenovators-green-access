using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data;

public class Customer
{
    [Key] public int Id { get; set; }
    public string CustomerId { get; set; }
    public int RewardPoints { get; set; } = 0;
}