import { TaskProgramming } from "@/models/dbModels";
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
                <TaskProgrammingMiniCard
                    key={task.idTaskProgramming}
                    task={task}
                    onDelete={onDelete}
                    className={cardWrapperClassName}
                >
                </TaskProgrammingMiniCard>
            ))}
        </div>
    );
}

export default TasksList;