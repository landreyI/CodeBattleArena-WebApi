import { Difficulty, Role, SessionState, LeagueEnum } from "../models/dbModels";
import { StandardError } from "./errorHandler";

export const getArray = (input: any): any[] => {
    if (Array.isArray(input)) return input;
    if (input?.$values) return input.$values;
    return [];
};

export function parseEnumParam<T extends Record<string, string>>(
    value: string | null,
    enumType: T,
    defaultValue: T[keyof T]
): T[keyof T] {
    if (value && Object.values(enumType).includes(value as T[keyof T])) {
        return value as T[keyof T];
    }
    return defaultValue;
}

export const getStateColor = (state: string) => {
    switch (state) {
        case SessionState.Public:
            return "bg-green";
        case SessionState.Private:
            return "bg-red";
        default:
            return "bg-gray";
    }
};

export const getRoleColor = (role: string): string => {
    switch (role) {
        case Role.Admin:
            return "bg-yellow";
        case Role.Manager:
            return "bg-blue";
        case Role.Moderator:
            return "bg-violet";
        case Role.Banned:
            return "bg-red";
        case Role.User:
            return "bg-green";
        default:
            return "bg-gray"; // дефолтный стиль для неизвестных ролей
    }
};

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case Difficulty.Easy:
            return "bg-green";
        case Difficulty.Medium:
            return "bg-yellow";
        case Difficulty.Hard:
            return "bg-red";
        default:
            return "bg-gray";
    }
};

export const getIsStartGameColor = (isStart: boolean) => {
    return isStart ? "bg-red" : "bg-green"
};