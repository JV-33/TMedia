using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TMedia.Models
{
    public class Device
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Model { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        public int ConnectionPercentage { get; set; }

        [Required]
        public int MessagesOverLastDays { get; set; }

        [Required]
        public int TotalPossibleMessages { get; set; }

        [Required]
        public bool IsOnline { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}