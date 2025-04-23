import { Role } from "@/models/dbModels";

export const isEditRole = (role: string): boolean => {
    return role == Role.Moderator || role == Role.Admin
};