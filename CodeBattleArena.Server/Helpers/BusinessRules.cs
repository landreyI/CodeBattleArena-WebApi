using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;
using System.Collections.Generic;

namespace CodeBattleArena.Server.Helpers
{
    public static class BusinessRules
    {
        public static bool IsEditRole(string? role)
        {
            if (Enum.TryParse<Role>(role, true, out var parsedRole))
            {
                return parsedRole == Role.Moderator || parsedRole == Role.Admin;
            }
            return false;
        }

        public static bool IsOwner(string userId, Session session)
        {
            return session.CreatorId == userId;
        }
    }
}
