using CodeBattleArena.Server.Enums;
using CodeBattleArena.Server.Models;
using System.Collections.Generic;

namespace CodeBattleArena.Server.Helpers
{
    public static class BusinessRules
    {
        public static bool IsModerationRole(IList<string>? roles)
        {
            return roles != null && roles
                .Any(r => Enum.TryParse<Role>(r, true, out var parsedRole) &&
                          (parsedRole == Role.Admin || parsedRole == Role.Moderator));
        }

        public static bool IsEditRole(IList<string>? roles)
        {
            return roles != null && roles
                .Any(r => Enum.TryParse<Role>(r, true, out var parsedRole) &&
                          (parsedRole == Role.Admin || parsedRole == Role.Manager));
        }
        public static bool IsBannedRole(IList<string>? roles)
        {
            return roles != null && roles
                .Any(r => Enum.TryParse<Role>(r, true, out var parsedRole) &&
                          (parsedRole == Role.Banned));
        }

        public static bool IsOwner(string userId, Session session)
        {
            return session.CreatorId == userId;
        }
    }
}
