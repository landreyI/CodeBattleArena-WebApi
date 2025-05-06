import { useState } from "react";
import { InputData } from "@/models/dbModels";
import { useCallback } from "react";
import { fetchGetInputDatas } from "@/services/task";
import { useAsyncTask } from "../useAsyncTask";

export function useInputDatas() {
    const [inputDatas, setInputDatas] = useState<InputData[]>([]);
    const { run: load, loading, error } = useAsyncTask(fetchGetInputDatas);

    const loadInputDatas = useCallback(async () => {
        const data = await load();
        if (data) {
            setInputDatas(data);
        }
    }, [load]);

    return { inputDatas, setInputDatas, loading, error, reloadInputDatas: loadInputDatas };
}