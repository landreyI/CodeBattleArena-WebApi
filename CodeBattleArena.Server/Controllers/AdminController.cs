using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;
using CodeBattleArena.Server.Services.DBServices;
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
        private readonly SessionService _sessionService;
        private readonly UserManager<Player> _userManager;
        private readonly IMapper _mapper;
        public AdminController(SessionService sessionService, UserManager<Player> userManager, IMapper mapper)
        {
            _sessionService = sessionService;
            _userManager = userManager;
            _mapper = mapper;
        }


    }
}
