using AutoMapper;
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
        private readonly IMapper _mapper;
        public PlayerService(IUnitOfWork unitOfWork, ILogger<SessionService> logger, 
            UserManager<Player> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<Result<(PlayerDto Player, bool IsEdit), ErrorResponse>> GetPlayerInfoAsync
            (string targetId, string requesterId)
        {
            var player = await _userManager.FindByIdAsync(targetId);
            if (player == null)
            {
                return Result.Failure<(PlayerDto, bool), ErrorResponse>(new ErrorResponse
                {
                    Error = "Player not found."
                });
            }

            var playerDto = _mapper.Map<PlayerDto>(player);

            bool isEdit = false;

            bool isAuth = requesterId == playerDto.Id;

            if (isAuth)
                isEdit = true;

            else if (!isAuth && !string.IsNullOrEmpty(requesterId))
            {
                var requesterRoles = await GetRolesAsync(requesterId);
                isEdit = BusinessRules.IsModerationRole(requesterRoles);
            }

            if (isEdit) 
            {
                var targetRoles = await GetRolesAsync(targetId);
                playerDto.Roles = targetRoles;
                playerDto.Email = player.Email;
            }

            return Result.Success<(PlayerDto, bool), ErrorResponse>((playerDto, isEdit));
        }

        public async Task<Result<Unit, ErrorResponse>> UpdatePlayerAsync
            (string authUserId, PlayerDto dto, CancellationToken ct)
        {
            var user = await _userManager.FindByIdAsync(authUserId);
            if (user == null)
            {
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse 
                {
                    Error = "Player not found." 
                });
            }

            var role = await GetRolesAsync(user);
            bool isEdit = Helpers.BusinessRules.IsModerationRole(role);

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
        public async Task<IList<string>> GetRolesAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var roles = await _userManager.GetRolesAsync(user);
            return roles;
        }
        public async Task<IList<string>> GetRolesAsync(Player user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return roles;
        }



        public async Task<Player> GetPlayerAsync(string id, CancellationToken ct)
        {
            if (string.IsNullOrEmpty(id)) return null;
            return await _unitOfWork.PlayerRepository.GetPlayerAsync(id, ct);
        }

        public async Task<List<Player>> GetPlayersAsync(CancellationToken ct)
        {
            return await _unitOfWork.PlayerRepository.GetPlayersAsync(ct);
        }
        public async Task<Result<Unit, ErrorResponse>> AddVictoryPlayerInDbAsync(string id, CancellationToken ct)
        {
            try
            {
                await _unitOfWork.PlayerRepository.AddVictoryPlayerAsync(id, ct);
                await _unitOfWork.CommitAsync(ct); // Сохранение изменений
                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding AddVictoryPlayer");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Database error when update player." });
            }
        }
        public async Task<List<Session>> MyGamesListAsync(string id, CancellationToken ct)
        {
            if (string.IsNullOrEmpty(id)) return null;
            return await _unitOfWork.PlayerRepository.MyGamesListAsync(id, ct);
        }
    }
}
