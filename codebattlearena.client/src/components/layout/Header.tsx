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
import { useTheme } from "@/contexts/ThemeContext";
import SessionActiveMenu from "./SessionActiveMenu";

export function Header() {
    const { user, logout } = useAuth();
    const [showRegistration, setShowRegistration] = useState(false);
    const [showAuthorization, setShowAuthorization] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
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
                        <NavLink href="/home" label="Code Battle Arena" className="text-2xl font-bold text-green-400"/>
                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
                        </button>
                        <div className="hidden md:flex items-center gap-8 ml-6">
                            <NavLink href="/info" label="Info" />
                            {isAuthenticated && <SessionMenu />}
                            {isAuthenticated && <TaskMenu />}
                            {isEdit && <EditMenu setShowAddTask={ setShowAddTask } />}
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
                                <UserMenu user={user} handleLogout={handleLogout}></UserMenu>
                        )}
                        {toggleTheme && (
                            <Button onClick={toggleTheme} variant="outline">
                                {isDarkMode ? (
                                    // “Ємна€ тема активна Ч показать солнце
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                    </svg>
                                ) : (
                                    // —ветла€ тема активна Ч показать луну
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                    </svg>
                                )}
                            </Button>
                        )}
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
                                <button onClick={() => { setShowAuthorization(true); setIsMobileMenuOpen(false); }} className="text-green-400 nav-link">Sign In</button>
                                <button onClick={() => { setShowRegistration(true); setIsMobileMenuOpen(false); }} className="text-green-400 nav-link">Sign Up</button>
                            </>
                        ) : (
                                <UserMenu user={user} handleLogout={handleLogout}></UserMenu>
                        )}
                        {toggleTheme && (
                            <Button onClick={toggleTheme} variant="outline">
                                {isDarkMode ? (
                                    // “Ємна€ тема активна Ч показать солнце
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                    </svg>
                                ) : (
                                    // —ветла€ тема активна Ч показать луну
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                                    </svg>
                                )}
                            </Button>
                        )}
                    </div>
                )}
            </header>
            <SessionActiveMenu></SessionActiveMenu>
            {/* ћодалки */}
            {showRegistration && (
                <RegistrationModal open={showRegistration} onClose={() => setShowRegistration(false)} />
            )}
            {showAuthorization && (
                <AuthorizationModal open={showAuthorization} onClose={() => setShowAuthorization(false)} />
            )}
            {showAddTask && (
                <EditTaskModal open={showAddTask} onClose={() => setShowAddTask(false)} />
            )}
        </>
    );
};

export default React.memo(Header);