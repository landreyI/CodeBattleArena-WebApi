import { api } from "../api/axios";
import { Player, Session, PlayerSession } from "@/models/dbModels";
import { SessionFilters } from "../models/filters";
import qs from "qs";

export const fetchGetSession = async (
    id: number,
    config?: { signal?: AbortSignal }
): Promise<{ session: Session; isEdit: boolean }> => {
    const response = await api.get(`Session/info-session`, {
        params: { id },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchGetActiveSession = async (
    config?: { signal?: AbortSignal }
): Promise<Session | null> => {
    const response = await api.get(`Session/active-session`, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchStartGame = async (
    idSession: number,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.put(
        `Session/start-game`,
        null, // тело пустое
        {
            params: { idSession },
            signal: config?.signal,
        }
    );
    return response.data;
};

export const fetchFinishGame = async (
    idSession: number,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.put(
        `Session/finish-game`,
        null, // тело пустое
        {
            params: { idSession },
            signal: config?.signal,
        }
    );
    return response.data;
};

export const fetchBestResult = async (
    idSession: number,
    config?: { signal?: AbortSignal }
): Promise<PlayerSession> => {
    const response = await api.get(`Session/best-result-session`, {
        params: { idSession },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchInviteSession = async (
    idPlayersInvite: string[] | undefined,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.get(`Session/invite-session`, {
        params: { idPlayersInvite },
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        signal: config?.signal,
    });
    return response.data;
};

export const fetchGetCountCompletedTask = async (
    idSession: number,
    config?: { signal?: AbortSignal }
): Promise<number> => {
    const response = await api.get(`Session/count-completed-task`, {
        params: { idSession },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchGetSessionsList = async (
    filter?: SessionFilters,
    config?: { signal?: AbortSignal }
): Promise<Session[]> => {
    const response = await api.get(`Session/list-sessions`, {
        params: filter,
        signal: config?.signal,
    });
    return response.data;
};

export const fetchGetSessionPlayers = async (
    id: number,
    config?: { signal?: AbortSignal }
): Promise<Player[]> => {
    const response = await api.get(`Session/session-players`, {
        params: { id },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchSelectTaskForSession = async (
    sessionId: number,
    taskId: number,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.get(`Session/select-task-for-session`, {
        params: { sessionId, taskId },
        signal: config?.signal,
    });
    return response.data;
};

export const fetchCreateSession = async (
    session: Session,
    config?: { signal?: AbortSignal }
): Promise<{ idSession: number }> => {
    const response = await api.post(`Session/create-session`, session, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchUpdateSession = async (
    session: Session,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.put(`Session/edit-session`, session, {
        signal: config?.signal,
    });
    return response.data;
};

export const fetchDeleteSession = async (
    id: number,
    config?: { signal?: AbortSignal }
): Promise<boolean> => {
    const response = await api.delete(`Session/delete-session`, {
        params: { id },
        signal: config?.signal,
    });
    return response.data;
};
