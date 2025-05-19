using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Helpers.Mapping
{
    public class LeagueMappingProfile : Profile
    {
        public LeagueMappingProfile()
        {
            CreateMap<LeagueDto, League>();
            CreateMap<League, LeagueDto>();
        }
    }
}
