import { Session } from "@/models/dbModels";
import { SessionCard } from "@/components/cards/SessionCard";

interface Props {
    sessions: Session[],
    cardWrapperClassName?: string;
}

export function SessionList({ sessions, cardWrapperClassName }: Props) {
    return (
        <>
            {sessions.map((session) => (
                <div key={session.idSession} className={cardWrapperClassName}>
                    <SessionCard session={session} />
                </div>
            ))}
        </>
    );
}
export default SessionList;