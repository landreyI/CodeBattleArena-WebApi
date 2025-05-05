import { UserAuth } from "@/contexts/AuthContext";
import { GenericDropdownMenu } from "./GenericDropdownMenu";

interface Props {
    user: UserAuth;
    handleLogout: (e: any) => void;
}

export function UserMenu({ user, handleLogout }: Props) {
    return (
        <GenericDropdownMenu
            triggerContent={
                <button className="flex items-center gap-2 nav-link">
                    <img src={user.photoUrl} alt="avatar" className="w-8 h-8 rounded-full" />
                    <span>{user.userName}</span>
                </button>
            }
            menuLabel="My Account"
            actions={[
                { label: "Profile", href: `/player/info-player/${user.id}`, shortcut: "⇧⌘P", isSeparator: true },
                { label: "Players", href: `/player/list-players`, shortcut: "⌘P" },
                { label: "Friends", href: `/friend/info-player/${user.id}`, shortcut: "⌘F" },
                { label: "Chats", href: `/chat/info-player/${user.id}`, shortcut: "⌘C", isSeparator: true },
                { label: "Log out", onClick: handleLogout, shortcut: "⇩⌘L" },
            ]}
        />
    );
}

export default UserMenu;
