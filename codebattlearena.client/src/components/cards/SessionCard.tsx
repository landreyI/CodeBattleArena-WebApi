import { Card, CardContent } from "@/components/ui/card";
import { Session } from "@/models/dbModels";
import { Badge } from "../ui/badge";
import { Users, Code2, Calendar } from "lucide-react";
import { getStateColor } from "@/untils/helpers";

interface SessionCardProps {
    session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
    return (
        <Card className="bg-zinc-800 border-zinc-700 rounded-2xl">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <div className="text-xl font-bold text-white font-mono">{session.name || "Unnamed"}</div>
                    <div className="flex items-center gap-2">
                        <Badge className={getStateColor(session.state)}>{session.state}</Badge>
                        <div className="text-sm text-zinc-400 flex items-center gap-1">
                            <Users size={16} />
                            <span>
                                {session.amountPeople ?? 0}/{session.maxPeople}
                            </span>
                        </div>
                    </div>
                </div>

                <hr className="border-zinc-700 mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col gap-2 text-zinc-400">
                        <div className="flex items-center gap-2">
                            <Code2 size={16} />
                            <span className="font-mono">Lang:</span>
                            <span className="text-white">{session.langProgramming?.nameLang || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span className="font-mono">Created:</span>
                            <span className="text-white">
                                {new Date(session.dateCreating).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SessionCard;
