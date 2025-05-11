import { Role, PlayerSession } from "@/models/dbModels";

export const isModerationRole = (roles: string[]): boolean => {
    return roles.some(role => role === Role.Moderator || role === Role.Admin);
};

export const isEditRole = (roles: string[]): boolean => {
    return roles.some(role => role === Role.Manager || role === Role.Admin);
};

export const isPlayerInSession = (playerId: string, playerSessions: [PlayerSession]): boolean => {
    return playerSessions.some(player => player.idPlayer === playerId);
}