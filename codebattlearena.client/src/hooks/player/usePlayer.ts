import React, { useEffect, useState } from "react";
import { fetchGetPlayer } from "@/services/player";
import { Player } from "@/models/dbModels";
import { StandardError, processError } from "@/untils/errorHandler";

export function usePlayer(playerId: string | undefined) {
    const [player, setPlayer] = useState<Player | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<StandardError | null>(null);

    useEffect(() => {
        if (!playerId) {
            setError(new StandardError("Player ID not specified"));
            setLoading(false);
            return;
        }

        const fetchPlayer = async () => {
            try {
                const data = await fetchGetPlayer(playerId);

                setPlayer(data.player);
                setIsEdit(data.isEdit);
            } catch (err: unknown) {
                const standardError = processError(err);
                setError(standardError);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [playerId]);

    return { player, setPlayer, isEdit, loading, error };
}