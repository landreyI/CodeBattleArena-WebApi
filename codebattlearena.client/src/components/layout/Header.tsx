import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import NavLink from "../common/NavLink";
import { RegistrationModal } from "../modals/RegistrationModal";
import AuthorizationModal from "../modals/AuthorizationModal";
import { DropdownItem, DropdownItemData } from "../common/DropdownItem";
import { Menu, X } from "lucide-react";

const dropdownItemsSession: DropdownItemData[] = [
    { label: "Public", href: "/session/list?state=Public" },
    { label: "Private", href: "/session/list?state=Private" },
    { label: "Create", href: "/session/create-session" },
];

const dropdownItemsAdmin: DropdownItemData[] = [
    { label: "Add Avatar", href: "/admin/add-photo-avatar" },
    { label: "Add Task", href: "/admin/add-task" },
    { label: "Task List", href: "/session/list-task" },
];

const SessionMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="text-green-400 nav-link">Session</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg flex flex-col p-1">
            {dropdownItemsSession.map((dropdown, index) => (
                <DropdownMenuItem key={index} asChild>
                    <DropdownItem dropdownItem={dropdown} />
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

const AdminMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="text-green-400 nav-link">Admin</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg flex flex-col p-1">
            {dropdownItemsAdmin.map((dropdown, index) => (
                <DropdownMenuItem key={index} asChild>
                    <DropdownItem dropdownItem={dropdown} />
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [showRegistration, setShowRegistration] = useState(false);
    const [showAuthorization, setShowAuthorization] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "Admin";

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        navigate("/home");
    };

    const dropdownItemsUser: DropdownItemData[] = [
        { label: "My Page", link: `/player/info-player/${user?.id}` },
        { label: "Log Out", action: handleLogout },
    ];

    return (
        <>
            <header className="header">
                <nav className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
                    {/* Left section */}
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-green-400">Code Battle Arena</span>
                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
                        </button>
                        <div className="hidden md:flex items-center gap-8 ml-6">
                            <NavLink href="/home" label="Home" />
                            <NavLink href="/info" label="Info" />
                            {isAuthenticated && <SessionMenu />}
                            {isAdmin && <AdminMenu />}
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <button onClick={() => setShowAuthorization(true)} className="text-green-400 nav-link">Sign In</button>
                                <button onClick={() => setShowRegistration(true)} className="text-green-400 nav-link">Sign Up</button>
                            </>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 nav-link">
                                        <img src={user.photoUrl} alt="avatar" className="w-8 h-8 rounded-full" />
                                        <span className="text-white">{user.userName}</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg flex flex-col p-1">
                                    {dropdownItemsUser.map((dropdown, index) => (
                                        <DropdownMenuItem key={index} asChild>
                                            <DropdownItem dropdownItem={dropdown} />
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-zinc-900 border-t border-zinc-700 py-4 px-6 flex flex-col gap-3">
                        <NavLink href="/home" label="Home" />
                        <NavLink href="/info" label="Info" />
                        {isAuthenticated && <SessionMenu />}
                        {isAdmin && <AdminMenu />}
                        {!isAuthenticated ? (
                            <>
                                <button onClick={() => { setShowAuthorization(true); setIsMobileMenuOpen(false); }} className="text-green-400 nav-link">Sign In</button>
                                <button onClick={() => { setShowRegistration(true); setIsMobileMenuOpen(false); }} className="text-green-400 nav-link">Sign Up</button>
                            </>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 nav-link">
                                        <img src={user.photoUrl} alt="avatar" className="w-8 h-8 rounded-full" />
                                        <span className="text-white">{user.userName}</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg flex flex-col p-1">
                                    {dropdownItemsUser.map((dropdown, index) => (
                                        <DropdownMenuItem key={index} asChild>
                                            <DropdownItem dropdownItem={dropdown} />
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                )}
            </header>

            {/* Модалки */}
            {showRegistration && (
                <RegistrationModal open={showRegistration} onClose={() => setShowRegistration(false)} />
            )}
            {showAuthorization && (
                <AuthorizationModal open={showAuthorization} onClose={() => setShowAuthorization(false)} />
            )}
        </>
    );
};

export default React.memo(Header);