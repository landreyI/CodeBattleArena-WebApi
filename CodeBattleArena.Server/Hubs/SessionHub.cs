using Microsoft.AspNetCore.SignalR;

namespace CodeBattleArena.Server.Hubs
{
    public class SessionHub : Hub
    {
        public async Task JoinSessionGroup(string sessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Session-{sessionId}");
        }

        public async Task LeaveSessionGroup(string sessionId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Session-{sessionId}");
        }
    }
}
