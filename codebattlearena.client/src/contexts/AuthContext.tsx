import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { api } from "../api/axios";

type UserAuth = {
    id: string;
    role: string;
    userName: string;
    photoUrl: string;
};

type AuthContextType = {
    user: UserAuth | null;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserAuth | null>(null);

    useEffect(() => {
        api.get("/account/user", { withCredentials: true })
            .then(response => {
                setUser({
                    id: response.data.id,
                    role: response.data.role,
                    userName: response.data.userName,
                    photoUrl: response.data.photoUrl
                });
            })
            .catch(() => setUser(null));
    }, []);

    const logout = async () => {
        await api.post("/account/logout", {}, { withCredentials: true });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};