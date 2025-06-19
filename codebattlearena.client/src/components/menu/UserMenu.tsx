import { UserAuth } from "@/contexts/AuthContext";
import { GenericDropdownMenu } from "./GenericDropdownMenu";

interface Props {
    user: UserAuth;
    handleLogout: (e: any) => void;
    className?: string;
}

export function UserMenu({ user, handleLogout, className = "nav-link" }: Props) {
    return (
        <GenericDropdownMenu
            triggerContent={
                <div className="flex gap-2" >
                    <img src={user.photoUrl} alt="avatar" className="w-8 h-8 rounded-xl" />
                    <button className={`flex items-center gap-2 ${className}`}>
                        <span>{user.userName}</span>
                    </button>
                </div>

            }
            menuLabel="My Account"
            actions={[
                { label: "Profile", href: `/player/info-player/${user.id}`, shortcut: "⇧⌘P", isSeparator: true },
                { label: "Players", href: `/player/list-players`, shortcut: "⌘P" },
                { label: "Friends", href: `/friend/list-friends/${user.id}`, shortcut: "⌘F" },
                { label: "Log out", onClick: handleLogout, shortcut: "⇩⌘L" },
            ]}
        />
    );
}

export default UserMenu;
