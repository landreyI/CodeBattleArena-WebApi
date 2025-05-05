import { Difficulty } from "./dbModels";

export interface TaskProgrammingFilters {
    lang?: string;
    difficulty?: Difficulty;
}