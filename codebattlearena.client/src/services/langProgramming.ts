import { api } from "../api/axios";
import { LangProgramming } from "@/models/dbModels";

export const fetchGetListLangsProgramming = async (
    _: void,
    config?: { signal?: AbortSignal }
): Promise<LangProgramming[]> => {
    const response = await api.get(`LangProgramming/list-langs-programming`, {
        signal: config?.signal,
    });
    return response.data;
};