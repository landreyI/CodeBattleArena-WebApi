import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import { Player } from "@/models/dbModels";
import { EditPlayerForm } from "../forms/EditPlayerForm";


interface Props {
    open: boolean;
    player: Player
    onUpdate: (updatedPlayer: Player) => void;
    onClose: () => void;
}
export function EditPlayerModal({ open, player, onUpdate, onClose }: Props) {

  return (
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
          <DialogContent className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto border">
              <DialogHeader>
                  <DialogTitle className="text-center">Edit Player</DialogTitle>
              </DialogHeader>

              <EditPlayerForm player={player} onClose={onClose} onUpdate={onUpdate}></EditPlayerForm>

              <DialogFooter>
                  <DialogDescription className="font-mono">
                  </DialogDescription>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
}

export default EditPlayerModal;