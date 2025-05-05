import { GenericDropdownMenu } from "./GenericDropdownMenu";


export function SessionMenu() {
    return (
        <GenericDropdownMenu
            triggerContent={<button className="text-green-400 nav-link">Session</button>}
            menuLabel="Actions with sessions"
            actions={[
                { label: "Sessions list", href: "/session/list-sessions", shortcut: "⌘S" },
                { label: "Create session", href: "/session/create-session", shortcut: "+⌘C" },
            ]}
        />
    );
}

export default SessionMenu;
