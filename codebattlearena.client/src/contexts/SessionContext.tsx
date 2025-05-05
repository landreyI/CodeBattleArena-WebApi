import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session } from "@/models/dbModels";
import { fetchGetActiveSession, fetchLeaveSession } from "@/services/session";
import { useMemo } from "react";

type SessionContextType = {
    activeSession: Session | null;
    setActiveSession: (session: Session) => void;
    leaveSession: () => void;
    refreshSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [activeSession, setActiveSession] = useState<Session | null>(null);

    const loadActiveSession = async () => {
        let data = await fetchGetActiveSession();
        setActiveSession(data);
    }

    useEffect(() => {
        loadActiveSession();
    }, []);

    const leaveSession = async () => {
        await fetchLeaveSession();
        setActiveSession(null);
    }
    const refreshSession = async () => {
        loadActiveSession();
    }

    const value = useMemo(
        () => ({ activeSession, leaveSession, setActiveSession, refreshSession }),
        [activeSession]
    );
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export const useActiveSession = () => {
    const context = useContext(SessionContext);
    if (!context) throw new Error("useActiveSession  Auth must be used within AuthProvider");
    return context;
};