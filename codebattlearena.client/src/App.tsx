import "./App.css";
import "./items.css"
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
import TasksList from '@/pages/task/TasksListPage';
import TaskInfo from '@/pages/task/TaskInfo';
import PlayersListPage from '@/pages/player/PlayersListPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { ActiveSessionProvider } from './contexts/ActiveSessionContext';
import { SignalRSessionHubProvider } from './contexts/SignalRSessionHubContext';
import { SignalRTaskHubProvider } from './contexts/SignalRTaskHubContext';
import PlayerCodePage from './pages/session/PlayerCodePage';
import Bubbles from './components/layout/Bubbles';
import LeaguesPage from './pages/league/LeaguesPage';
import CreateLeague from './pages/league/CreateLeague';
import QuestsListPage from "./pages/quest/QuestsListPage";
import { ItemsListPage } from "./pages/item/ItemsListPage";
import CreateItem from "./pages/item/CreateItem";
import ItemInfo from "./pages/item/ItemInfo";
import PlayerItemsPage from "./pages/item/PlayerItemsPage";
import CreateQuest from "./pages/quest/CreateQuest";
import QuestPage from "./pages/quest/QuestPage";
import RewardsListPage from "./pages/quest/RewardsListPage";
import PanelSidebar from "./components/adminPanel/PanelSidebar";
import CreateTask from "./pages/task/CreateTask";
import CreateReward from "./pages/quest/CreateReward";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

const App = () => {
    return (
        <div className="app-container">
            <BrowserRouter>
                <SignalRSessionHubProvider>
                    <SignalRTaskHubProvider>
                        <ThemeProvider>
                            <Bubbles />
                            <ActiveSessionProvider>
                                <SidebarProvider className="flex min-h-screen flex-row" defaultOpen={false}>
                                    <PanelSidebar />
                                    <div className="flex flex-col flex-1">
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
                                                <Route path="/session/player-code" element={<PlayerCodePage />} />

                                                <Route path="/task/list-task" element={<TasksList />} />
                                                <Route path="/task/info-task/:taskId" element={<TaskInfo />} />
                                                <Route path="/task/create-task" element={<CreateTask />} />

                                                <Route path="/league/list-leagues/" element={<LeaguesPage />} />
                                                <Route path="/league/create-league" element={<CreateLeague />} />

                                                <Route path="/item/info-item/:itemId" element={<ItemInfo />} />
                                                <Route path="/item/player-items/:playerId" element={<PlayerItemsPage />} />
                                                <Route path="/item/list-items" element={<ItemsListPage />} />
                                                <Route path="/item/create-item" element={<CreateItem />} />

                                                <Route path="/quest/info-quest/:taskPlayId" element={<QuestPage />} />
                                                <Route path="/quest/list-quests" element={<QuestsListPage />} />
                                                <Route path="/quest/create-quest" element={<CreateQuest />} />
                                                <Route path="/quest/list-rewards" element={<RewardsListPage />} />
                                                <Route path="/quest/create-reward" element={<CreateReward />} />
                                            </Routes>
                                        </main>
                                        <Footer />
                                    </div>
                                </SidebarProvider>
                            </ActiveSessionProvider>
                        </ThemeProvider>
                    </SignalRTaskHubProvider>
                </SignalRSessionHubProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
