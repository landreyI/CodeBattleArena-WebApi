import React, { useEffect, useState } from "react";
import { InputData } from "@/models/dbModels";
import { processError, StandardError } from "@/untils/errorHandler";
import { useCallback } from "react";
import { fetchGetInputDatas } from "@/services/task";

export function useInputDatas() {
    const [inputDatas, setInputDatas] = useState<InputData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StandardError | null>(null);

    const loadInputDatas = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchGetInputDatas();
            setInputDatas(data);
        } catch (err: unknown) {
            const standardError = processError(err);
            setError(standardError);
        } finally {
            setLoading(false);
        }
    }, []);

    return { inputDatas, setInputDatas, loading, error, reloadInputDatas: loadInputDatas };
}