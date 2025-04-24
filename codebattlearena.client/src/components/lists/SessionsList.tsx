import { Session } from "@/models/dbModels";
import { SessionMiniCard } from "@/components/cards/SessionMiniCard";
import { Link } from "react-router-dom";

interface Props {
    sessions: Session[],
    cardWrapperClassName?: string;
}

export function SessionList({ sessions, cardWrapperClassName }: Props) {
    return (
        <div className="grid gap-4">
            {sessions.map((session) => (
                <Link
                    key={session.idSession}
                    to={`/session/info-session/${session?.idSession}`}
                    title="View session"
                >
                    <div className={cardWrapperClassName}>
                        <SessionMiniCard session={session} />
                    </div>
                </Link>
            ))}
        </div>
    );
}
export default SessionList;