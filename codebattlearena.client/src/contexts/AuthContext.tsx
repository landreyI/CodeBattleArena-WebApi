import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios, { api } from "../api/axios";

export type UserAuth = {
    id: string;
    roles: string[];
    userName: string;
    photoUrl: string;
    coin?: number | null;
    experience?: number | null;
};

type AuthContextType = {
    user: UserAuth | null;
    logout: () => Promise<void>;
    reload: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAuth | null>(null);

    useEffect(() => {
        load();
    }, []);

    const logout = async () => {
        await api.post("/account/logout", {}, { withCredentials: true });
        setUser(null);
    };

    const load = async () => {
        await api.get<UserAuth>("/account/user", { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(() => setUser(null));
    };

    return (
        <AuthContext.Provider value={{ user, logout, reload: load }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};