using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Helpers
{
    public class PlayerMappingProfile : Profile
    {
        public PlayerMappingProfile()
        {
            CreateMap<PlayerDto, Player>();
            CreateMap<Player, PlayerDto>();
        }
    }
}
