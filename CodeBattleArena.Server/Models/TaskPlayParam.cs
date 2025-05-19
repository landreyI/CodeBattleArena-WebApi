using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.Models
{
    public class TaskPlayParam
    {
        [Key]
        public int IdParam { get; set; }

        public int? TaskPlayId { get; set; }
        public virtual TaskPlay? TaskPlay { get; set; }

        [StringLength(40)]
        public string ParamKey { get; set; }

        [StringLength(40)]
        public string ParamValue { get; set; }
    }
}
