using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
using CodeBattleArena.Server.Services.DBServices.IDBServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace CodeBattleArena.Server.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly ISessionService _sessionService;
        private readonly UserManager<Player> _userManager;
        private readonly IMapper _mapper;
        public AdminController(ISessionService sessionService, UserManager<Player> userManager, IMapper mapper)
        {
            _sessionService = sessionService;
            _userManager = userManager;
            _mapper = mapper;
        }


    }
}
