using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Helpers.Mapping
{
    public class PlayerSessionProfile : Profile
    {
        public PlayerSessionProfile()
        {
            CreateMap<PlayerSessionDto, PlayerSession>();
            CreateMap<PlayerSession, PlayerSessionDto>();
        }
    }
}
