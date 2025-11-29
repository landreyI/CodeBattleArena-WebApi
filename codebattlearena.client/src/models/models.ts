import { Difficulty, LangProgramming, TaskProgramming } from "./dbModels";

export interface GenerateAITaskProgramming {
    idTaskProgramming?: number;

    langProgrammingId: number;
    langProgramming: LangProgramming | null;

    difficulty: Difficulty;
    promt?: string | null;
}