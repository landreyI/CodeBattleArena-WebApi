import { useCallback } from "react";
import { fetchDeleteLeague } from "@/services/league";
import { useAsyncTask } from "../useAsyncTask";

export function useDeleteLeague() {
    const { run, loading, error } = useAsyncTask(fetchDeleteLeague);

    const deleteLeague = useCallback(async (leagueId: number): Promise<boolean> => {
        return (await run(leagueId)) ?? false;
    }, [run]);

    return { deleteLeague, error, loading };
}