import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import * as signalR from "@microsoft/signalr";
import { SIGNALR_SESSION_HUB_URL } from "@/config";

type EventHandlers = Map<string, Set<(...args: any[]) => void>>;

const SignalRContext = createContext<signalR.HubConnection | null>(null);

export const SignalRSessionHubProvider = ({ children }: { children: React.ReactNode }) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const handlersRef = useRef<EventHandlers>(new Map());

    useEffect(() => {
        const conn = new signalR.HubConnectionBuilder()
            .withUrl(SIGNALR_SESSION_HUB_URL)
            .withAutomaticReconnect()
            .build();

        conn
            .start()
            .then(() => console.log("✅ SignalR connected"))
            .catch((err) => console.error("❌ SignalR error:", err));

        setConnection(conn);

        return () => {
            conn.stop();
        };
    }, []);

    // Подписка на кастомное событие
    const registerHandler = useCallback(
        (event: string, handler: (...args: any[]) => void) => {
            if (!connection) return;

            if (!handlersRef.current.has(event)) {
                handlersRef.current.set(event, new Set());
                connection.on(event, (...args) => {
                    handlersRef.current.get(event)?.forEach((h) => h(...args));
                });
            }

            handlersRef.current.get(event)?.add(handler);
        },
        [connection]
    );

    // Отписка
    const unregisterHandler = useCallback(
        (event: string, handler: (...args: any[]) => void) => {
            handlersRef.current.get(event)?.delete(handler);
        },
        []
    );

    return (
        <SignalRContext.Provider value={ connection }>
            {children}
        </SignalRContext.Provider>
  );
};

// Хук для доступа к соединению
export function useSessionHubConnection() {
    return useContext(SignalRContext);
}

// Хук для подписки на событие
export function useSessionHubEvent<TArgs extends any[] = any[]>(
    event: string,
    handler: (...args: TArgs) => void
) {
    const connection = useSessionHubConnection();

    useEffect(() => {
        if (!connection) return;
        connection.on(event, handler);

        return () => {
            connection.off(event, handler);
        };
    }, [connection, event, handler]);
}
