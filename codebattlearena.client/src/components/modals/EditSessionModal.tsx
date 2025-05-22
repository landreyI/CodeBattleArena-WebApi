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
          <DialogContent className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto border">
              <DialogHeader>
                  <DialogTitle className="text-center">Edit Session</DialogTitle>
              </DialogHeader>

              <SessionForm session={session} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></SessionForm>

              <DialogFooter>
                  <DialogDescription className="font-mono">
                  </DialogDescription>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
}

export default EditSessionModal;