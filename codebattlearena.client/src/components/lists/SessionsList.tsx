import { Session } from "@/models/dbModels";
import { SessionMiniCard } from "@/components/cards/SessionMiniCard";

interface Props {
    sessions: Session[],
    cardWrapperClassName?: string;
}

export function SessionList({ sessions, cardWrapperClassName }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {sessions.map((session) => (
                <SessionMiniCard key={session.idSession} session={session} className={cardWrapperClassName} />
            ))}
        </div>
    );
}
export default SessionList;