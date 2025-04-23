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

        public PlayerSessionService(IUnitOfWork unitOfWork, ILogger<SessionService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<Result<PlayerSession, ErrorResponse>> CreatPlayerSession
            (string idUser, Session session, CancellationToken ct)
        {
            var checkResult = ValidationHelper.CheckUserId<PlayerSession>(idUser);
            if (!checkResult.IsSuccess)
                return checkResult;

            PlayerSession playerSession = new PlayerSession
            {
                IdPlayer = idUser,
                IdSession = session.IdSession,
            };

            try
            {
                var addResult = await AddPlayerSessionAsync(playerSession, ct);
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
        public async Task<Result<Unit, ErrorResponse>> AddPlayerSessionAsync
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
        public async Task<bool> UpdatePlayerSession(PlayerSession playerSession, CancellationToken ct)
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
        public async Task FinishTaskAsync(int idSession, string idPlayer, CancellationToken ct)
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
        public async Task DelPlayerSessionAsync(int idSession, string idPlayer, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.PlayerSessionRepository.DelPlayerSessionAsync(idSession, idPlayer, ct);
                await _unitOfWork.CommitAsync(ct);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting PlayerSession");
            }
        }
    }
}
