﻿using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.Models
{
    public class TaskInputData
    {
        public int IdTaskProgramming { get; set; }
        public TaskProgramming? TaskProgramming { get; set; }

        [StringLength(50)]
        public string? Answer { get; set; }

        public int IdInputDataTask { get; set; }
        public InputData? InputData { get; set; }
    }
}
