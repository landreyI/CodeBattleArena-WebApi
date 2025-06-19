import { PlayerTaskPlay, TaskPlay } from "@/models/dbModels";
import { motion } from "framer-motion";
import { QuestMiniCard } from "../cards/QuestMiniCard";
import ProgressQuest from "../common/ProgressQuest";
import { getTaskParamPrimary } from "@/untils/businessRules";
interface Props {
    tasksPlays: TaskPlay[],
    playerTasksPlays?: PlayerTaskPlay[],
    cardWrapperClassName?: string;
    className?: string;
}

export function QuestsList({ tasksPlays, playerTasksPlays, cardWrapperClassName, className }: Props) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ${className}`}
        >
            {tasksPlays.map((taskPlay) => {
                const playerProgress = playerTasksPlays && playerTasksPlays.find(q => q.taskPlayId === taskPlay.idTask);

                return (
                    <div key={taskPlay.idTask} className={`${cardWrapperClassName}`}>
                        <QuestMiniCard
                            taskPlay={taskPlay}
                        />
                        <ProgressQuest
                            playerProgress={playerProgress}
                            taskPlayParamValue={getTaskParamPrimary(taskPlay)}
                        />
                    </div>
                );
            })}

        </motion.div>
    );
}
export default QuestsList;