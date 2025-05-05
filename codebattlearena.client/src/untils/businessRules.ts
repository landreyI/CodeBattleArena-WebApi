import { Role } from "@/models/dbModels";

export const isModerationRole = (roles: string[]): boolean => {
    return roles.some(role => role === Role.Moderator || role === Role.Admin);
};

export const isEditRole = (roles: string[]): boolean => {
    return roles.some(role => role === Role.Manager || role === Role.Admin);
};