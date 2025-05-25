using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.Models
{
    public class TaskPlay
    {
        [Key]
        public int IdTask { get; set; }

        [StringLength(40)]
        public string Name { get; set; }
        public string Description { get; set; }

        [StringLength(40)]
        public string Type { get; set; }
        public int? Experience { get; set; }
        public int? Reward { get; set; }
        public bool IsRepeatable { get; set; }

        public int? TaskPlayParamId { get; set; }
        public virtual TaskPlayParam? TaskPlayParam { get; set; }
        public virtual ICollection<PlayerTaskPlay>? PlayerTaskPlays { get; set; }
    }
}
