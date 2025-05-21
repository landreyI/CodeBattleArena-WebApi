namespace CodeBattleArena.Server.DTO
{
    public class FriendDto
    {
        public string IdPlayer1 { get; set; }
        public PlayerDto? Player1 { get; set; }
        public string IdPlayer2 { get; set; }
        public PlayerDto? Player2 { get; set; }

        public DateTime FriendshipDate { get; set; } = DateTime.Now;
    }
}
