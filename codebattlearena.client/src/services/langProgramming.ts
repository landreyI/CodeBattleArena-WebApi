import { api } from "../api/axios";
import { LangProgramming } from "@/models/dbModels";

export const fetchGetListLangsProgramming = async (): Promise<LangProgramming[]> => {
    try {
        let response = await api.get(`LangProgramming/list-langs-programming`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}