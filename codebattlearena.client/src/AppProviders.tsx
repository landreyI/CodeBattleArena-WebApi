import { ReactNode } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SignalRTaskHubProvider } from "./contexts/SignalRTaskHubContext";
import { SignalRSessionHubProvider } from "./contexts/SignalRSessionHubContext";
import { SignalRPlayerHubProvider } from "./contexts/SignalRPlayerHubContext";
import { ActiveSessionProvider } from "./contexts/ActiveSessionContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return (
        <SignalRPlayerHubProvider>
            <SignalRSessionHubProvider>
                <SignalRTaskHubProvider>
                    <ThemeProvider>
                        <ActiveSessionProvider>
                            {children}
                        </ActiveSessionProvider>
                    </ThemeProvider>
                </SignalRTaskHubProvider>
            </SignalRSessionHubProvider>
        </SignalRPlayerHubProvider>
    );
};
