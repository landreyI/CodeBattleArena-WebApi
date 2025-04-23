using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Helpers;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class PlayerService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;
        private readonly UserManager<Player> _userManager;
        public PlayerService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, 
            UserManager<Player> userManager)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _userManager = userManager;
        }

        public async Task<Result<Unit, ErrorResponse>> UpdatePlayerAsync
            (string authUserId, PlayerDto dto, CancellationToken cancellationToken)
        {
            var checkResult = ValidationHelper.CheckUserId<Unit>(authUserId);
            if (!checkResult.IsSuccess)
                return checkResult;

            var user = await _userManager.FindByIdAsync(authUserId);
            if (user == null)
            {
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                {
                    Error = "Player not found." 
                });
            }

            var role = await GetRolesAsync(user);
            bool isEdit = Helpers.BusinessRules.isEditRole(role);

            if (authUserId != dto.Id && !isEdit)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                { 
                    Error = "You do not have the right to change other users." 
                });

            var IsUserNameTaken = await IsUserNameTakenAsync(dto.Username, dto.Id);
            if(!IsUserNameTaken)
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Username already taken."
                });

            user.UserName = dto.Username;
            if (!string.IsNullOrEmpty(dto.AdditionalInformation))
                user.AdditionalInformation = dto.AdditionalInformation;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var error = new ErrorResponse
                {
                    Error = "Error saving edited data.",
                    Details = result.Errors
                        .Select((e, i) => new KeyValuePair<string, string>($"db_{i}", e.Description))
                        .ToDictionary(x => x.Key, x => x.Value)
                };
                return Result.Failure<Unit, ErrorResponse>(error);
            }

            return Result.Success<Unit, ErrorResponse> (Unit.Value);
        }

        public async Task<bool> IsUserNameTakenAsync(string username, string id)
        {
            var existingUser = await _userManager.FindByNameAsync(username);
            if (existingUser != null && existingUser.Id != id)
                return false;

            return true;
        }
        public async Task<string> GetRolesAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(user);
            return roles.FirstOrDefault();
        }
        public async Task<string> GetRolesAsync(Player user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return roles.FirstOrDefault();
        }
        public async Task<Player> GetPlayerAsync(string id, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(id)) return null;
            return await _unitOfWork.PlayerRepository.GetPlayerAsync(id, cancellationToken);
        }
        public async Task<bool> AddVictoryPlayerAsync(string id, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(id)) return false;
            try
            {
                await _unitOfWork.PlayerRepository.AddVictoryPlayerAsync(id, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken); // Сохранение изменений
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding AddVictoryPlayer");
                return false;
            }
        }
        public async Task<List<Session>> MyGamesListAsync(string id, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(id)) return null;
            return await _unitOfWork.PlayerRepository.MyGamesListAsync(id, cancellationToken);
        }
    }
}
