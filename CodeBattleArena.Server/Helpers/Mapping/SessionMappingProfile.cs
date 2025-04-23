using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Helpers.Mapping
{
    public class SessionMappingProfile : Profile
    {
        public SessionMappingProfile()
        {
            CreateMap<SessionDto, Session>();

            CreateMap<Session, SessionDto>()
                .ForMember(dest => dest.IdSession, opt => opt.MapFrom(src => src.IdSession))
                .ForMember(dest => dest.AmountPeople, opt => opt.MapFrom(src => src.PlayerSessions.Count));
        }
    }
}
