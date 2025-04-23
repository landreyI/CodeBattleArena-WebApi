﻿using CodeBattleArena.Server.Enums;
using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.Models
{
    public class TaskProgramming
    {
        [Key]
        public int IdTaskProgramming { get; set; }
        [StringLength(40)]
        public string Name { get; set; }

        public int LangProgrammingId { get; set; }
        public LangProgramming LangProgramming { get; set; }

        public Difficulty Difficulty { get; set; }
        public string TextTask { get; set; }
        public string Preparation { get; set; }
        public string VerificationCode { get; set; }
        public virtual ICollection<TaskInputData>? TaskInputData { get; set; }
        public virtual ICollection<Session>? Sessions { get; set; }
    }
}
