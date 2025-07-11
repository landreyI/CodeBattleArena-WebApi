import { fetchInviteSession } from "@/services/session";
import { useAsyncTask } from "../useAsyncTask";
import { useCallback } from "react";
import { StandardError } from "@/untils/errorHandler";

export function useInviteSession() {

    const { run, loading, error, setError } = useAsyncTask(fetchInviteSession);


    const inviteSession = useCallback(async (idPlayersInvite?: string[]): Promise<boolean> => {
        if (!idPlayersInvite) {
            setError(new StandardError("Player ID not specified"));
            return false;
        }
        return (await run(idPlayersInvite)) ?? false;
    }, [run]);

    return { inviteSession, error, loading };
}