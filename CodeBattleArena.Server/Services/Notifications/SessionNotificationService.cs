using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Hubs;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.Notifications.INotifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System.Numerics;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace CodeBattleArena.Server.Services.Notifications
{
    public class SessionNotificationService : ISessionNotificationService
    {
        private readonly IHubContext<SessionHub> _hubContext;

        public SessionNotificationService(IHubContext<SessionHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifySessionAddAsync(SessionDto sessionDto)
        {
            await _hubContext.Clients.All.SendAsync("SessionAdding", sessionDto);
        }
        public async Task NotifySessionDeletedGroupAsync(int id)
        {
            await _hubContext.Clients.Group($"Session-{id}")
                .SendAsync("SessionDeleting", id);
        }
        public async Task NotifySessionDeletedAllAsync(int id)
        {
            await _hubContext.Clients.All.SendAsync("SessionsListDeleting", id);
        }
        public async Task NotifySessionUpdatedGroupAsync(SessionDto sessionDto)
        {
            await _hubContext.Clients.Group($"Session-{sessionDto.IdSession}")
                .SendAsync("SessionUpdated", sessionDto);
        }

        public async Task NotifySessionUpdatedAllAsync(SessionDto sessionDto)
        {
            await _hubContext.Clients.All.SendAsync("SessionsListUpdated", sessionDto);
        }

        public async Task NotifySessionJoinAsync(int idSession, PlayerDto player)
        {
            await _hubContext.Clients.Group($"Session-{idSession}")
                .SendAsync("SessionJoin", player);
        }
        public async Task NotifySessionUnjoinAsync(int idSession, PlayerDto player)
        {
            await _hubContext.Clients.Group($"Session-{idSession}")
                .SendAsync("SessionLeave", player);
        }

        public async Task NotifyStartGameAsync(int idSession)
        {
            await _hubContext.Clients.Group($"Session-{idSession}")
                .SendAsync("StartGame");
        }

        public async Task NotifyFinishGameAsync(int idSession)
        {
            await _hubContext.Clients.Group($"Session-{idSession}")
                .SendAsync("FinishGame");
        }

        public async Task NotifyUpdateCompletedCount(int idSession, int count)
        {
            await _hubContext.Clients.Group($"Session-{idSession}")
               .SendAsync("UpdateCountCompleted", count);
        }

        public async Task NotifyUpdateCodePlayerAsync(int idSession, string code)
        {
            await _hubContext.Clients.Group($"Session-{idSession}")
                .SendAsync("UpdateCodePlayer", code);
        }
        public async Task NotifyUpdatePlayerSessionAsync(PlayerSessionDto playerSession)
        {
            await _hubContext.Clients.Group($"Session-{playerSession.IdSession}")
                .SendAsync("UpdatePlayerSession", playerSession);
        }
    }
}
