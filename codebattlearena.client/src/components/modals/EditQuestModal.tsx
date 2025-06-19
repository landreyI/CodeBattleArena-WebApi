import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Reward, TaskPlay } from "@/models/dbModels";
import QuestForm from "../forms/QuestForm";


interface Props {
    open: boolean;
    taskPlay?: TaskPlay;
    onUpdate?: (updatedTaskPlay: TaskPlay) => void;
    onClose: () => void;
}
export function EditQuestModal({ open, taskPlay, onUpdate, onClose }: Props) {

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="w-full sm:max-w-[65vw] max-h-[90vh] overflow-y-auto border">
                <DialogHeader>
                    <DialogTitle className="text-center">{!taskPlay && "Add Quest" || "Edit Quest"}</DialogTitle>
                </DialogHeader>

                <QuestForm taskPlay={taskPlay} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></QuestForm>
            </DialogContent>
            <DialogDescription className="font-mono"></DialogDescription>
        </Dialog>
    );
}

export default EditQuestModal;