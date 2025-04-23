﻿using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Helpers.Mapping
{
    public class LangProgrammingMappingProfile : Profile
    {
        public LangProgrammingMappingProfile()
        {
            CreateMap<LangProgrammingDto, LangProgramming>();
            CreateMap<LangProgramming, LangProgrammingDto>();
        }
    }
}
