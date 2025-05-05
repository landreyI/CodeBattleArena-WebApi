import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import GoogleOauthSuccess from './pages/GoogleOauthSuccess';
import PlayerPage from '@/pages/player/PlayerPage';
import SessionInfo from '@/pages/session/SessionInfo';
import LoginError from './pages/LoginError';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CreateSession from '@/pages/session/CreateSession';
import SessionsList from '@/pages/session/SessionsList';
import TasksList from '@/pages/task/TasksList';
import TaskInfo from '@/pages/task/TaskInfo';
import PlayersListPage from '@/pages/player/PlayersListPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { SessionProvider } from './contexts/SessionContext';
import { SignalRSessionHubProvider } from './contexts/SignalRSessionHubContext';
import { SignalRTaskHubProvider } from './contexts/SignalRTaskHubContext';

const App = () => {
    return (
        <div className="app-container">
            <div className="background-bubbles">
                <div className="bubble float-slow" style={{ width: "8vw", height: "8vw", top: "15%", left: "8%" }}></div>
                <div className="bubble float-fast" style={{ width: "12vw", height: "12vw", top: "55%", left: "75%" }}></div>
                <div className="bubble float-medium" style={{ width: "4vw", height: "4vw", top: "25%", left: "65%" }}></div>
                <div className="bubble float-slow" style={{ width: "6vw", height: "6vw", top: "10%", left: "85%" }}></div>
                <div className="bubble float-medium" style={{ width: "10vw", height: "10vw", top: "35%", left: "45%" }}></div>
                <div className="bubble float-fast" style={{ width: "5vw", height: "5vw", top: "65%", left: "25%" }}></div>
                <div className="bubble float-slow" style={{ width: "9vw", height: "9vw", top: "85%", left: "12%" }}></div>
                <div className="bubble float-medium" style={{ width: "5vw", height: "5vw", top: "45%", left: "15%" }}></div>
                <div className="bubble float-fast" style={{ width: "7vw", height: "7vw", top: "75%", left: "60%" }}></div>
                <div className="bubble float-slow" style={{ width: "4vw", height: "4vw", top: "20%", left: "30%" }}></div>
                <div className="bubble float-medium" style={{ width: "4vw", height: "4vw", top: "60%", left: "90%" }}></div>
                <div className="bubble float-fast" style={{ width: "6vw", height: "6vw", top: "30%", left: "80%" }}></div>
            </div>

            <BrowserRouter>
                <SignalRSessionHubProvider>
                    <SignalRTaskHubProvider>
                        <ThemeProvider>
                            <SessionProvider>
                                <Header />
                                <main className="app-main" style={{ zIndex: 1 }}>
                                    <Routes>
                                        <Route index element={<HomePage />} />
                                        <Route path="/home" element={<HomePage />} />
                                        <Route path="/info" element={<InfoPage />} />
                                        <Route path="/login-error" element={<LoginError />} />
                                        <Route path="/google-oauth-success" element={<GoogleOauthSuccess />} />
                                        <Route path="/player/info-player/:playerId" element={<PlayerPage />} />
                                        <Route path="/player/list-players/" element={<PlayersListPage />} />
                                        <Route path="/session/info-session/:sessionId" element={<SessionInfo />} />
                                        <Route path="/session/list-sessions" element={<SessionsList />} />
                                        <Route path="/session/create-session" element={<CreateSession />} />
                                        <Route path="/task/list-task" element={<TasksList />} />
                                        <Route path="/task/info-task/:taskId" element={<TaskInfo />} />
                                    </Routes>
                                </main>
                                <Footer />
                            </SessionProvider>
                        </ThemeProvider>
                    </SignalRTaskHubProvider>
                </SignalRSessionHubProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
