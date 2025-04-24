using AutoMapper;
using CodeBattleArena.Server.DTO;
using CodeBattleArena.Server.Models;

namespace CodeBattleArena.Server.Helpers.Mapping
{
    public class TaskMappingProfile : Profile
    {
        public TaskMappingProfile()
        {
            CreateMap<InputDataDto, InputData>();
            CreateMap<InputData, InputDataDto>();

            CreateMap<TaskInputDataDto, TaskInputData>();
            CreateMap<TaskInputData, TaskInputDataDto>();

            CreateMap<TaskProgrammingDto, TaskProgramming>()
                .ForMember(dest => dest.LangProgramming, opt => opt.Ignore());

            CreateMap<TaskProgramming, TaskProgrammingDto>();
        }
    }
}
