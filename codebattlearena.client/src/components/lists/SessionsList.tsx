import { Session } from "@/models/dbModels";
import { SessionMiniCard } from "@/components/cards/SessionMiniCard";
import { Link } from "react-router-dom";

interface Props {
    sessions: Session[],
    cardWrapperClassName?: string;
}

export function SessionList({ sessions, cardWrapperClassName }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sessions.map((session) => (
                <Link
                    key={session.idSession}
                    to={`/session/info-session/${session?.idSession}`}
                    title="View session"
                >
                    <SessionMiniCard session={session} className={cardWrapperClassName} />
                </Link>
            ))}
        </div>
    );
}
export default SessionList;