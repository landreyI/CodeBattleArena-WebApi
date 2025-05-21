import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button"
import { League } from "@/models/dbModels";
import LeagueForm from "../forms/LeagueForm";


interface Props {
    open: boolean;
    league: League
    onUpdate?: (updatedLeague: League) => void;
    onClose: () => void;
}
export function EditLeagueModal({ open, league, onUpdate, onClose }: Props) {

  return (
      <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
          <DialogContent className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto border">
              <DialogHeader>
                  <DialogTitle className="text-white text-center">Edit League</DialogTitle>
              </DialogHeader>

              <LeagueForm league={league} onClose={onClose} onUpdate={onUpdate} submitLabel="Save"></LeagueForm>

              <DialogFooter>
                  <DialogDescription className="font-mono">
                  </DialogDescription>
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
}

export default EditLeagueModal;