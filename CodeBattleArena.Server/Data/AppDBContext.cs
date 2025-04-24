using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace CodeBattleArena.Server.Data
{
    public class AppDBContext : IdentityDbContext<Player>
    {
        public AppDBContext(DbContextOptions<AppDBContext> option) : base(option) { }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<PlayerSession> PlayersSession { get; set; }
        public DbSet<TaskProgramming> TasksProgramming { get; set; }
        public DbSet<InputData> InputData { get; set; }
        public DbSet<TaskInputData> TaskInputData { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<LangProgramming> LangProgrammings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Session>()
                .Property(g => g.State)
                .HasConversion<string>(); // enum => string

            modelBuilder.Entity<TaskProgramming>()
                .Property(g => g.Difficulty)
                .HasConversion<string>(); // enum => string


            modelBuilder.Entity<PlayerSession>()
                .HasKey(b => new { b.IdPlayer, b.IdSession });

            modelBuilder.Entity<PlayerSession>()
                .HasOne(b => b.Player)
                .WithMany(u => u.PlayerSessions)
                .HasForeignKey(b => b.IdPlayer);

            modelBuilder.Entity<PlayerSession>()
                .HasOne(b => b.Session)
                .WithMany(p => p.PlayerSessions)
                .HasForeignKey(b => b.IdSession);


            modelBuilder.Entity<Session>()
                .HasOne(s => s.TaskProgramming)
                .WithMany(t => t.Sessions)
                .HasForeignKey(s => s.TaskId);

            modelBuilder.Entity<Session>()
                .HasOne(s => s.LangProgramming)
                .WithMany(u => u.Sessions)
                .HasForeignKey(s => s.LangProgrammingId);


            modelBuilder.Entity<TaskProgramming>()
                .HasOne(s => s.LangProgramming)
                .WithMany(u => u.TasksProgramming)
                .HasForeignKey(s => s.LangProgrammingId);


            modelBuilder.Entity<TaskInputData>()
                .HasKey(ti => new { ti.IdTaskProgramming, ti.IdInputDataTask });

            modelBuilder.Entity<TaskInputData>()
                .HasOne(ti => ti.TaskProgramming)
                .WithMany(t => t.TaskInputData)
                .HasForeignKey(ti => ti.IdTaskProgramming);

            modelBuilder.Entity<TaskInputData>()
                .HasOne(ti => ti.InputData)
                .WithMany(i => i.TaskInputData)
                .HasForeignKey(ti => ti.IdInputDataTask);


            modelBuilder.Entity<Friend>()
            .HasKey(f => new { f.IdPlayer1, f.IdPlayer2 });

            modelBuilder.Entity<Friend>()
                .HasOne(f => f.Player1)
                .WithMany(p => p.Friends1)
                .HasForeignKey(f => f.IdPlayer1)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friend>()
                .HasOne(f => f.Player2)
                .WithMany(p => p.Friends2)
                .HasForeignKey(f => f.IdPlayer2)
                .OnDelete(DeleteBehavior.Restrict);



            modelBuilder.Entity<Chat>()
                .HasOne(c => c.Player1)
                .WithMany(p => p.ChatsAsUser1)
                .HasForeignKey(c => c.IdPlayer1)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chat>()
                .HasOne(c => c.Player2)
                .WithMany(p => p.ChatsAsUser2)
                .HasForeignKey(c => c.IdPlayer2)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Chat)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.IdChat)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(p => p.Messages)
                .HasForeignKey(m => m.IdSender)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chat>()
                .HasIndex(c => new { c.IdPlayer1, c.IdPlayer2 })
                .IsUnique();
        }
    }
}
