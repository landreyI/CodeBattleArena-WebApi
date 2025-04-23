﻿using CodeBattleArena.Server.IRepositories;
using CodeBattleArena.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeBattleArena.Server.Services.DBServices
{
    public class ChatService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SessionService> _logger;

        public ChatService(IUnitOfWork unitOfWork, ILogger<SessionService> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<bool> AddChatAsync(string playerId1, string playerId2, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(playerId1) || string.IsNullOrEmpty(playerId2)) return false;
            try
            {
                await _unitOfWork.ChatRepository.AddChatAsync(playerId1, playerId2, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken); // Сохранение изменений
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding Chat");
                return false;
            }
        }
        public async Task<bool> AddMessageAsync(int chatId, string senderId, string messageText, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(senderId) || string.IsNullOrEmpty(messageText)) return false;
            try
            {
                await _unitOfWork.ChatRepository.AddMessageAsync(chatId, senderId, messageText, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding Message");
                return false;
            }
        }
        public async Task<List<Message>> GetMessagesByChatIdAsync(int chatId, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ChatRepository.GetMessagesByChatIdAsync(chatId, cancellationToken);
        }
        public async Task<Chat> GetChatAsync(int idChat, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ChatRepository.GetChatAsync(idChat, cancellationToken);
        }
        public async Task<Chat> GetChatByIdPlayerAsync(string playerId1, string playerId2, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(playerId1) || string.IsNullOrEmpty(playerId2)) return null;
            return await _unitOfWork.ChatRepository.GetChatByIdPlayerAsync(playerId1, playerId2, cancellationToken);
        }
        public async Task<List<Chat>> GetChatsByPlayerIdAsync(string playerId, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(playerId)) return null;
            return await _unitOfWork.ChatRepository.GetChatsByPlayerIdAsync(playerId, cancellationToken);
        }
        public async Task<bool> DeleteChatAsync(int idChat, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.ChatRepository.DeleteChatAsync(idChat, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting Chat");
                return false;
            }
        }
        public async Task<bool> DeleteMessageAsync(int idMessage, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.ChatRepository.DeleteMessageAsync(idMessage, cancellationToken);
                await _unitOfWork.CommitAsync(cancellationToken);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting Message");
                return false;
            }
        }
    }
}
