import { api } from "../api/axios";
import { Message, Player, PlayerSession, Session } from "@/models/dbModels";
import { ExecutionResult } from "@/models/executionResult";

export const fetchGetPlayerSessions = async (
    id: string,
    config?: { signal?: AbortSignal }
): Promise<Session[]> => {
    const response = await api.get(`/PlayerSession/player-sessions`, {
        params: { id },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchFinishTaskPlayer = async (
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.put(`PlayerSession/finish-task`, null, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchLeaveSession = async (
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.delete(`PlayerSession/leave-session`, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchKickOutSession = async (
    idDeletePlayer?: string,
    idSession?: number,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.delete(`PlayerSession/kick-out-session`, {
        data: { idDeletePlayer, idSession },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchJoinSession = async (
    idSession: number,
    password?: string,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.put(
        `PlayerSession/join-session`,
        null, // тело пустое
        {
            params: { idSession, password },
            signal: config?.signal,
        }
    );
    return response.data;
};

export const fetchUpdateCodePlayer = async (
    sessionId?: number,
    code?: string,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.get(`PlayerSession/update-code-player`, {
        params: { sessionId, code },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchSendMessageSession = async (
    message?: string,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.get(`PlayerSession/send-message-session`, {
        params: { message },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchCheckCodePlayer = async (
    code: string,
    config?: { signal?: AbortSignal }
): Promise<ExecutionResult> => {
    const response = await api.post(
        `PlayerSession/check-code-player`,
        { code }, // тело запроса
        { signal: config?.signal }
    );
    return response.data;
};

export const fetchPlayerSessionInfo = async (
    idPlayer?: string,
    idSession?: number,
    config?: { signal?: AbortSignal }
): Promise<PlayerSession | null> => {
    const response = await api.get(`PlayerSession/info-player-session`, {
        params: { playerId: idPlayer, sessionId: idSession },
        signal: config?.signal,
    });
    return response.data;
};
