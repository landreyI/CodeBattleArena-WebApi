﻿using System.ComponentModel.DataAnnotations;

namespace CodeBattleArena.Server.DTO
{
    public class MessageDto
    {
        public int? IdMessage { get; set; }

        public int? IdChat { get; set; }
        public ChatDto? Chat { get; set; }
        public string? IdSender { get; set; }
        public PlayerDto? Sender { get; set; }

        public string MessageText { get; set; }
        public DateTime SentDateTime { get; set; }

    }
}
