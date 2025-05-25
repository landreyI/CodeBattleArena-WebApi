import { Difficulty, SessionState } from "./dbModels";

export interface TaskProgrammingFilters {
    idLang?: number;
    difficulty?: Difficulty;
}

export interface SessionFilters {
    idLang?: number;
    maxPeople?: number;
    sessionState?: SessionState;
    isStart?: boolean;
    isFinish?: boolean;
}