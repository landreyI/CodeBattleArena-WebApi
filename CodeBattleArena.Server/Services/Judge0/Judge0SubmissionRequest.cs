﻿namespace CodeBattleArena.Server.Services.Judge0
{
    public class Judge0SubmissionRequest
    {
        public string source_code { get; set; }
        public string language_id { get; set; }
        public string stdin { get; set; }
        public string expected_output { get; set; }
    }
}
