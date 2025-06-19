import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Reward } from "@/models/dbModels";
import RewardForm from "../forms/RewardForm";


interface Props {
    open: boolean;
    reward?: Reward
    onUpdate?: (updatedReward: Reward) => void;
    onClose: () => void;
}
export function EditRewardModal({ open, reward, onUpdate, onClose }: Props) {

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="w-full sm:max-w-[40vw] max-h-[90vh] overflow-y-auto border">
                <DialogHeader>
                    <DialogTitle className="text-center">{!reward && "Add Reward" || "Edit Reward"}</DialogTitle>
                </DialogHeader>

                <RewardForm reward={reward} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></RewardForm>
            </DialogContent>
            <DialogDescription className="font-mono"></DialogDescription>
        </Dialog>
    );
}

export default EditRewardModal;