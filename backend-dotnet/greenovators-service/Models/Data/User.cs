using System.ComponentModel.DataAnnotations;

namespace greenovators_service.Models.Data;

public class User
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string Username { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    public int EcoPoints { get; set; } = 0;
}