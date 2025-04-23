import { Card, CardContent } from "@/components/ui/card";
import { Session, SessionState } from "@/models/dbModels";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

interface SessionCardProps {
    session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
    return (
        <Link to={`/session/info-session/${session?.idSession}`} title="View session">
            <Card className="bg-zinc-700 border-zinc-600 mt-4">
                <CardContent className="">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        {/* Левая часть: инфо о сессии */}
                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="text-zinc-400 font-mono">Name:</span>{" "}
                                <span className="text-white">{session.name || "Unnamed"}</span>
                            </div>
                            <div>
                                <span className="text-zinc-400 font-mono">State:</span>{" "}
                                <span className="text-white">{session.state}</span>
                            </div>
                            <div>
                                <span className="text-zinc-400 font-mono">Lang:</span>{" "}
                                <span className="text-white">{session.langProgramming?.nameLang}</span>
                            </div>
                        </div>

                        {/* Правая часть: количество людей */}
                        <div className="text-sm self-end md:self-center md:ml-auto">
                            <span className="text-zinc-400 font-mono">Amount people:</span>{" "}
                            <span className="text-white">{session.amountPeople}/{session.maxPeople}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

