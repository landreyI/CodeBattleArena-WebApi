using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Untils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class PlayerSessionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;
        private readonly SessionService _sessionService;

        public PlayerSessionService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, SessionService sessionService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _sessionService = sessionService;
        }

        public async Task<Result<PlayerSession, ErrorResponse>> CreatPlayerSession
            (string idPlayer, int idSession, CancellationToken ct)
        {
            PlayerSession playerSession = new PlayerSession
            {
                IdPlayer = idPlayer,
                IdSession = idSession,
            };

            try
            {
                var sessions = await GetPlayerSessionByIdPlayer(idPlayer, ct);
                bool isActive = sessions.Any(s => s.IsCompleted == false);
                if (isActive)
                    return Result.Failure<PlayerSession, ErrorResponse>(new ErrorResponse 
                    { 
                        Error= "You already have an active session." 
                    });

                var session = await _sessionService.GetSessionAsync(idSession, ct);
                if(session == null)
                    return Result.Failure<PlayerSession, ErrorResponse>(new ErrorResponse 
                    { 
                        Error="Session not found." 
                    });

                if(session.MaxPeople == session.PlayerSessions.Count)
                    return Result.Failure<PlayerSession, ErrorResponse>(new ErrorResponse
                    {
                        Error = "This session has the maximum number of participants."
                    });

                var addResult = await AddPlayerSessionInDbAsync(playerSession, ct);
                if(!addResult.IsSuccess)
                    return Result.Failure<PlayerSession, ErrorResponse>(addResult.Failure);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in CreatePlayerSession");
                return Result.Failure<PlayerSession, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "Unexpected server error." 
                });
            }

            return Result.Success<PlayerSession, ErrorResponse>(playerSession);
        }

        public async Task<Session> GetActiveSession(string idPlayer, CancellationToken ct)
        {
            var checkResult = ValidationHelper.CheckUserId<bool>(idPlayer);
            if (!checkResult.IsSuccess)
                return null;

            var sessions = await GetPlayerSessionByIdPlayer(idPlayer, ct);
            var activeSessionId = sessions
                .FirstOrDefault(s => s.IsCompleted == false)?.IdSession;

            if (activeSessionId == null)
                return null;
            var session = await _sessionService.GetSessionAsync(activeSessionId.Value, ct);
            return session;
        }

        public async Task<Result<Unit, ErrorResponse>> AddPlayerSessionInDbAsync
            (PlayerSession playerSession, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.PlayerSessionRepository.AddPlayerSessionAsync(playerSession, ct);
                await _unitOfWork.CommitAsync(ct); // Сохранение изменений
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding PlayerSession");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Database error when adding playerSession." });
            }
        }
        public async Task<PlayerSession> GetPlayerSessionAsync(int idSession, string idPlayer, CancellationToken ct)
        {
            return await _unitOfWork.PlayerSessionRepository.GetPlayerSessionAsync(idSession, idPlayer, ct);
        }

        public async Task<List<PlayerSession>> GetPlayerSessionByIdPlayer(string idPlayer, CancellationToken ct)
        {
            return await _unitOfWork.PlayerSessionRepository.GetPlayerSessionByIdPlayer(idPlayer, ct);
        }
        public async Task<List<PlayerSession>> GetPlayerSessionByIdSession(int idSession, CancellationToken ct)
        {
            return await _unitOfWork.PlayerSessionRepository.GetPlayerSessionByIdSession(idSession, ct);
        }
        public async Task<bool> UpdatePlayerSessionInDbAsync(PlayerSession playerSession, CancellationToken ct)
        {
            try
            {
                _unitOfWork.PlayerSessionRepository.UpdatePlayerSession(playerSession);
                await _unitOfWork.CommitAsync(ct);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when updating PlayerSession");
                return false;
            }
        }
        public async Task FinishTaskInDbAsync(int idSession, string idPlayer, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.PlayerSessionRepository.FinishTaskAsync(idSession, idPlayer, ct);
                await _unitOfWork.CommitAsync(ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error FinishTask");
            }
        }
        public async Task<Result<Unit, ErrorResponse>> DelPlayerSessionInDbAsync(int idSession, string idPlayer, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.PlayerSessionRepository.DelPlayerSessionAsync(idSession, idPlayer, ct);
                await _unitOfWork.CommitAsync(ct);
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting PlayerSession");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when delete playerSession."
                });
            }
        }
    }
}
