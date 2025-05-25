import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { TaskProgramming } from "@/models/dbModels";
import TaskForm from "../forms/TaskForm";


interface Props {
    open: boolean;
    task?: TaskProgramming
    onUpdate?: (updatedTask: TaskProgramming) => void;
    onClose: () => void;
}
export function EditTaskModal({ open, task, onUpdate, onClose }: Props) {

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="w-full sm:max-w-[70vw] max-h-[90vh] overflow-y-auto border">
                <DialogHeader>
                    <DialogTitle className="text-center">{!task && "Add Task" || "Edit Task"}</DialogTitle>
                </DialogHeader>

                <TaskForm task={task} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></TaskForm>
            </DialogContent>
            <DialogDescription className="font-mono"></DialogDescription>
        </Dialog>
    );
}

export default EditTaskModal;