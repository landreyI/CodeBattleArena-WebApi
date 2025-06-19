using AutoMapper;
using CodeBattleArena.Server.Filters;
using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Specifications;
using CodeBattleArena.Server.Specifications.ItemSpec;
using CodeBattleArena.Server.Untils;
using Microsoft.AspNetCore.Http;
using static Azure.Core.HttpHeader;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class ItemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ItemService> _logger;
        private readonly IMapper _mapper;
        public ItemService(IUnitOfWork unitOfWork, ILogger<ItemService> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<Item> GetItemAsync(int id, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ItemRepository.GetItemAsync(id, cancellationToken);
        }
        public async Task<List<Item>> GetItemsAsync(IFilter<Item>? filter, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ItemRepository.GetItemsAsync(filter, cancellationToken);
        }
        public async Task<PlayerItem> GetPlayerItemAsync(int idItem, string idPlayer, CancellationToken cancellationToken)
        {
            return await _unitOfWork.PlayerItemRepository.GetPlayerItemAsync
                (new PlayerItemSpec(idItem, idPlayer), cancellationToken);
        }

        public async Task<List<PlayerItem>> GetListPlayerItemByIdItemAsync
            (ISpecification<PlayerItem> spec, CancellationToken cancellationToken)
        {
            return await _unitOfWork.PlayerItemRepository.GetListPlayerItemAsync(spec, cancellationToken);
        }

        public async Task<Result<Unit, ErrorResponse>> DeleteItemAsync
            (int id, CancellationToken cancellationToken, bool commit = true)
        {
            var resultDeletePlayerItems = await DeletePlayerItemsAsync(id, cancellationToken, commit: false);
            if (!resultDeletePlayerItems.IsSuccess)
                return resultDeletePlayerItems;

            var resultDelete = await DeleteItemInDbAsync(id, cancellationToken, commit);
            if(!resultDelete.IsSuccess)
                return resultDelete;

            return Result.Success<Unit, ErrorResponse>(Unit.Value);
        }



        public async Task<Result<Unit, ErrorResponse>> AddItemAsync
            (Item item, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                await _unitOfWork.ItemRepository.AddItemAsync(item, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when adding Item");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when adding item."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> DeleteItemInDbAsync
            (int id, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                await _unitOfWork.ItemRepository.DeleteItemAsync(id, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when deleting Item");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when deleting item."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> UpdateItem
            (Item item, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                _unitOfWork.ItemRepository.UpdateItem(item);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when updating Item");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when updating item."
                });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> AddPlayerItemAsync
            (PlayerItem playerItem, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                await _unitOfWork.PlayerItemRepository.AddPlayerItemAsync(playerItem, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding PlayerItem");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Database error when adding playerItem." });
            }
        }
        public async Task<Result<Unit, ErrorResponse>> AddPlayersItemsAsync
            (List<PlayerItem> playersItems, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                await _unitOfWork.PlayerItemRepository.AddPlayersItemsAsync(playersItems, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding PlayerItem");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse { Error = "Database error when adding playerItem." });
            }
        }

        public async Task<Result<Unit, ErrorResponse>> DeletePlayerItemAsync
            (int idItem, string idPlayer, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                await _unitOfWork.PlayerItemRepository.DeletePlayerItemAsync(idItem, idPlayer, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting PlayerItem");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when delete playerItem."
                });
            }
        }

        public async Task<Result<Unit, ErrorResponse>> DeletePlayerItemsAsync
            (int idItem, CancellationToken cancellationToken, bool commit = true)
        {
            try
            {
                _unitOfWork.PlayerItemRepository.DeletePlayerItems(idItem, cancellationToken);
                if (commit)
                    await _unitOfWork.CommitAsync(cancellationToken);

                return Result.Success<Unit, ErrorResponse>(Unit.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting PlayerItem");
                return Result.Failure<Unit, ErrorResponse>(new ErrorResponse
                {
                    Error = "Database error when delete playerItem."
                });
            }
        }
    }
}
