import React, { useEffect, useState } from "react";
import { LangProgramming } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { fetchGetListLangsProgramming } from "@/services/langProgramming";
export function useLangsProgramming() {
    const [langsProgramming, setLangsProgramming] = useState<LangProgramming[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<StandardError | null>(null);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const data = await fetchGetListLangsProgramming();

                setLangsProgramming(data);
            }
            catch (err: unknown) {
                const standardError = processError(err);
                setError(standardError);
            }
            finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    return { langsProgramming, setLangsProgramming, loading, error };
}