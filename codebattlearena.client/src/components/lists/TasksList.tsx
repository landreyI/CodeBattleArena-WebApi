import { TaskProgramming } from "@/models/dbModels";
import { Link } from "react-router-dom";
import { TaskProgrammingMiniCard } from "../cards/TaskProgrammingMiniCard";
interface Props {
    tasks: TaskProgramming[],
    cardWrapperClassName?: string;
    onDelete?: (taskId: number) => void;
}
export function TasksList({ tasks, cardWrapperClassName, onDelete }: Props) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tasks.map((task) => (
                <Link to={`/task/info-task/${task.idTaskProgramming}`} title="View Task" key={task.idTaskProgramming}>
                    <TaskProgrammingMiniCard
                        task={task}
                        onDelete={onDelete}
                        className={cardWrapperClassName}
                    >
                    </TaskProgrammingMiniCard>
                </Link>
            ))}
        </div>
    );
}

export default TasksList;