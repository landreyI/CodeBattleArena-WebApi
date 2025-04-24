using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CodeBattleArena.Server.Helpers;

namespace CodeBattleArena.Server.Infrastructure.Attributes
{
    public class RequireEditRoleAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new ForbidResult();
                return;
            }

            var role = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            if (!BusinessRules.IsEditRole(role))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
