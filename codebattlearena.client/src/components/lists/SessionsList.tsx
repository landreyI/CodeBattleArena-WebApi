import { Session } from "@/models/dbModels";
import { SessionMiniCard } from "@/components/cards/SessionMiniCard";

interface Props {
    sessions: Session[],
    cardWrapperClassName?: string;
    columns?: number;
}

export function SessionList({ sessions, cardWrapperClassName, columns=3 }: Props) {
    const columnClasses: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
    };

    const gridCols = columnClasses[columns] || "grid-cols-1";

    return (
        <div className={`grid ${gridCols} gap-3`}>
            {sessions.map((session) => (
                <SessionMiniCard key={session.idSession} session={session} className={cardWrapperClassName} />
            ))}
        </div>
    );
}
export default SessionList;