import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import GoogleOauthSuccess from './pages/GoogleOauthSuccess';
import PlayerPage from './pages/PlayerPage';
import SessionInfo from './pages/SessionInfo';
import LoginError from './pages/LoginError';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CreateSession from './pages/CreateSession';

const App = () => {
    return (
        <div className="app-container">
            <BrowserRouter>
                <Header />
                <main className="app-main">
                    <Routes>
                        {/* Используем index для корневого маршрута */}
                        <Route index element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/info" element={<InfoPage />} />
                        <Route path="/login-error" element={<LoginError />} />
                        <Route path="/google-oauth-success" element={<GoogleOauthSuccess />} />
                        <Route path="/player/info-player/:playerId" element={<PlayerPage />} />
                        <Route path="/session/info-session/:sessionId" element={<SessionInfo />} />
                        <Route path="/session/create-session" element={<CreateSession />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
