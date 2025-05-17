import { Difficulty, SessionState } from "./dbModels";

export interface TaskProgrammingFilters {
    lang?: string;
    difficulty?: Difficulty;
}

export interface SessionFilters {
    lang?: string;
    maxPeople?: number;
    sessionState?: SessionState;
    isStart?: boolean;
    isFinish?: boolean;
}