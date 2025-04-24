import { Difficulty, Role, SessionState } from "../models/dbModels";

export const getArray = (input: any): any[] => {
    if (Array.isArray(input)) return input;
    if (input?.$values) return input.$values;
    return [];
};

export const getStateColor = (state: string) => {
    switch (state) {
        case SessionState.Public:
            return "bg-green-500 text-black";
        case SessionState.Private:
            return "bg-red-500 text-black";
        default:
            return "bg-gray-500 text-black";
    }
};

export const getRoleColor = (role: string) => {
    switch (role) {
        case Role.Admin:
            return "bg-yellow-500 text-dark";
        case Role.Manager:
            return "bg-blue-500 text-dark";
        case Role.Banned:
            return "bg-red-500 text-dark";
        case Role.User:
        default:
            return "bg-green-500 text-dark";
    }
};

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case Difficulty.Easy:
            return "bg-green-500 text-black";
        case Difficulty.Medium:
            return "bg-yellow-500 text-black";
        case Difficulty.Hard:
            return "bg-red-500 text-black";
        default:
            return "bg-gray-500 text-black";
    }
};