import { Role } from "../models/dbModels";

export const getArray = (input: any): any[] => {
    if (Array.isArray(input)) return input;
    if (input?.$values) return input.$values;
    return [];
};