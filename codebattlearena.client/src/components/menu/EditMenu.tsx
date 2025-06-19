import { itemsEdit } from "../adminPanel/PanelSheet";
import { Button } from "../ui/button";
import { GenericDropdownMenu } from "./GenericDropdownMenu";

export function EditMenu() {

    return (
        <GenericDropdownMenu
            triggerContent={<Button className="nav-link">Edit</Button>}
            menuLabel="Actions with edits"
            actions={itemsEdit}
        />
    );
}

export default EditMenu;