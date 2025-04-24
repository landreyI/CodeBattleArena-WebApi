import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button"
import { Session } from "@/models/dbModels";
import SessionForm from "../forms/SessionForm";


interface Props {
    open: boolean;
    session: Session
    onUpdate: (updatedSession: Session) => void;
    onClose: () => void;
}
export function EditSessionModal({ open, session, onUpdate, onClose }: Props) {

  return (
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
          <DialogContent className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 text-white border border-zinc-700">
              <DialogHeader>
                  <DialogTitle className="text-white text-center">Edit Session</DialogTitle>
              </DialogHeader>

              <SessionForm session={session} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></SessionForm>

              <DialogFooter>
                  <DialogDescription className="text-zinc-400 font-mono">
                  </DialogDescription>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
}

export default EditSessionModal;