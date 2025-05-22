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
import { isEditRole } from "@/untils/businessRules";
import SessionMenu from "../menu/SessionMenu";
import EditMenu from "../menu/EditMenu";
import { TaskMenu } from "../menu/TaskMenu";
import UserMenu from "../menu/UserMenu";
import { Button } from "../ui/button";
import EditTaskModal from "../modals/EditTaskModal";
import SessionActiveMenu from "./SessionActiveMenu";
import ThemeMenu from "../menu/ThemeMenu";

export function Header() {
    const { user, logout } = useAuth();
    const [showRegistration, setShowRegistration] = useState(false);
    const [showAuthorization, setShowAuthorization] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!user;
    const isEdit = user?.roles ? isEditRole(user.roles) : false;

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        navigate("/home");
    };

    return (
        <>
            <header className="header">
                <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
                    {/* Left section */}
                    <div className="flex items-center gap-4">
                        <NavLink href="/home" label="Code Battle Arena" className="text-2xl font-bold"/>
                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                        <div className="hidden md:flex items-center gap-8 ml-6">
                            <NavLink href="/info" label="Info" />
                            {isAuthenticated && <SessionMenu />}
                            {isAuthenticated && <TaskMenu />}
                            {isEdit && <EditMenu setShowAddTask={setShowAddTask} />}
                            <NavLink href="/league/list-leagues" label="Leagues" />
                        </div>
                    </div>

                    {/* Right section */}
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
                        {isEdit && <EditMenu setShowAddTask={setShowAddTask} />}
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
            {/* Модалки */}
            <RegistrationModal open={showRegistration} onClose={() => setShowRegistration(false)} />
            <AuthorizationModal open={showAuthorization} onClose={() => setShowAuthorization(false)} />
            <EditTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} />
        </>
    );
};

export default React.memo(Header);