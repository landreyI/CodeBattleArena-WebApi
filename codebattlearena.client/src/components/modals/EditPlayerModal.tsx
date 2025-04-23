import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button"
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
          <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border border-zinc-700">
              <DialogHeader>
                  <DialogTitle className="text-white text-center">Edit Player</DialogTitle>
              </DialogHeader>

              <EditPlayerForm player={player} onClose={onClose} onUpdate={onUpdate}></EditPlayerForm>

              <DialogFooter>
                  <DialogDescription className="text-zinc-400 font-mono">
                  </DialogDescription>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
}

export default EditPlayerModal;