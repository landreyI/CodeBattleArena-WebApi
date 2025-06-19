import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavLink from "../common/NavLink";
import { RegistrationModal } from "../modals/RegistrationModal";
import AuthorizationModal from "../modals/AuthorizationModal";
import { Menu, X } from "lucide-react";
import SessionMenu from "../menu/SessionMenu";
import { TaskMenu } from "../menu/TaskMenu";
import UserMenu from "../menu/UserMenu";
import EditTaskModal from "../modals/EditTaskModal";
import SessionActiveMenu from "./SessionActiveMenu";
import ThemeMenu from "../menu/ThemeMenu";
import React from "react";
import { Link } from "react-router-dom";

export function Header() {
    const { user, logout } = useAuth();
    const [showRegistration, setShowRegistration] = useState(false);
    const [showAuthorization, setShowAuthorization] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!user;

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        navigate("/home");
    };

    return (
        <>
            <header className="header z-1">
                <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/home" title="home" className="text-2xl font-bold rounded-sm">
                            <img src="/public/images/logo.png" alt="avatar" className="h-10 bg-contain bg-no-repeat bg-center" />
                        </Link>
                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                        <div className="hidden md:flex items-center gap-8 ml-6">
                            <NavLink href="/info" label="Info" />
                            {isAuthenticated && <SessionMenu />}
                            {isAuthenticated && <TaskMenu />}
                            <NavLink href="/league/list-leagues" label="Leagues" />
                            <NavLink href="/item/list-items" label="Items" />
                            <NavLink href="/quest/list-quests" label="Quests" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthenticated ? (
                            <>
                                <button onClick={() => setShowAuthorization(true)} className="text-primary nav-link">Sign In</button>
                                <button onClick={() => setShowRegistration(true)} className="text-primary nav-link">Sign Up</button>
                            </>
                        ) : (
                                <UserMenu user={user} handleLogout={handleLogout}></UserMenu>
                        )}
                        <ThemeMenu />
                    </div>
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t py-4 px-6 flex flex-col items-center gap-3">
                        <NavLink href="/home" label="Home" />
                        <NavLink href="/info" label="Info" />
                        {isAuthenticated && <SessionMenu />}
                        {isAuthenticated && <TaskMenu />}
                        <NavLink href="/league/list-leagues" label="Leagues" />
                        <NavLink href="/item/list-items" label="Items" />
                        <NavLink href="/quest/list-quests" label="Quests" />
                        {!isAuthenticated ? (
                            <>
                                <button onClick={() => { setShowAuthorization(true); setIsMobileMenuOpen(false); }} className="text-primary nav-link">Sign In</button>
                                <button onClick={() => { setShowRegistration(true); setIsMobileMenuOpen(false); }} className="text-primary nav-link">Sign Up</button>
                            </>
                        ) : (
                                <UserMenu user={user} handleLogout={handleLogout}></UserMenu>
                        )}
                        <ThemeMenu />
                    </div>
                )}
            </header>
            <SessionActiveMenu></SessionActiveMenu>

            <RegistrationModal open={showRegistration} onClose={() => setShowRegistration(false)} />
            <AuthorizationModal open={showAuthorization} onClose={() => setShowAuthorization(false)} />
            <EditTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} />
        </>
    );
};

export default React.memo(Header);