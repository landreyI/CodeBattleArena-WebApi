﻿using CodeBattleArena.Server.DTO;

namespace CodeBattleArena.Server.Services.Notifications.INotifications
{
    public interface ISessionNotificationService
    {
        Task NotifySessionAddAsync(SessionDto sessionDto);
        Task NotifySessionDeletedGroupAsync(int id);
        Task NotifySessionDeletedAllAsync(int id);
        Task NotifySessionUpdatedGroupAsync(SessionDto sessionDto);
        Task NotifySessionUpdatedAllAsync(SessionDto sessionDto);
        Task NotifySessionJoinAsync(int idSession, PlayerDto player);
        Task NotifySessionUnjoinAsync(int idSession, PlayerDto player);
        Task NotifyStartGameAsync(int idSession);
        Task NotifyFinishGameAsync(int idSession);
        Task NotifyUpdateCodePlayerAsync(int idSession, string code);
        Task NotifyUpdatePlayerSessionAsync(PlayerSessionDto playerSession);
    }
}
