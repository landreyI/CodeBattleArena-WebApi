using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class LangProgrammingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;
        public LangProgrammingService(IUnitOfWork unitOfWork, ILogger<SessionService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<LangProgramming> GetLangProgrammingAsync(int id, CancellationToken ct)
        {
            return await _unitOfWork.LangProgrammingRepository.GetLangProgrammingAsync(id, ct);
        }
        public async Task<List<LangProgramming>> GetLangProgrammingListAsync(CancellationToken ct)
        {
            return await _unitOfWork.LangProgrammingRepository.GetLangProgrammingListAsync(ct);
        }
        public async Task<bool> AddLangProgrammingAsync
            (LangProgramming langProgramming, CancellationToken ct, bool commit = true)
        {
            try
            {
                await _unitOfWork.LangProgrammingRepository.AddLangProgrammingAsync(langProgramming, ct);
                if (commit)
                    await _unitOfWork.CommitAsync(ct);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding AddLangProgramming");
                return false;
            }
        }
        public async Task<bool> DeleteLangProgrammingAsync(int id, CancellationToken ct, bool commit = true)
        {
            try
            {
                await _unitOfWork.LangProgrammingRepository.DeleteLangProgrammingAsync(id, ct);
                if (commit)
                    await _unitOfWork.CommitAsync(ct);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting AddLangProgramming");
                return false;
            }
        }
    }
}
