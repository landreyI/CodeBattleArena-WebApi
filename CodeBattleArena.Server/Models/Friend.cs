﻿namespace CodeBattleArena.Server.Models
{
    public class Friend
    {
        public string IdPlayer1 { get; set; }
        public virtual Player? Player1 { get; set; }
        public string IdPlayer2 { get; set; }
        public virtual Player? Player2 { get; set; }

        public DateTime FriendshipDate { get; set; } = DateTime.Now;
    }
}
