import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Item } from "@/models/dbModels";
import ItemForm from "../forms/ItemForm";


interface Props {
    open: boolean;
    item?: Item
    onUpdate?: (updatedItem: Item) => void;
    onClose: () => void;
}
export function EditItemModal({ open, item, onUpdate, onClose }: Props) {

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="md:w-[40vw] sm:w-[100vw] mx-auto border">
                <DialogHeader>
                    <DialogTitle className="text-center">{!item && "Add Item" || "Edit Item"}</DialogTitle>
                </DialogHeader>

                <ItemForm item={item} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></ItemForm>
            </DialogContent>
            <DialogDescription className="font-mono"></DialogDescription>
        </Dialog>
    );
}

export default EditItemModal;