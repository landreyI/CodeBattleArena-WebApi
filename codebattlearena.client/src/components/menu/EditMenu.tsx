import { GenericDropdownMenu } from "./GenericDropdownMenu";

interface Props {
    setShowAddTask: (e: any) => void;
}
export function EditMenu({ setShowAddTask }: Props) {

    return (
        <GenericDropdownMenu
            triggerContent={<button className="text-green-400 nav-link">Edit</button>}
            menuLabel="Actions with edits"
            actions={[
                { label: "Add Task", onClick: setShowAddTask, shortcut: "+⌘T" },
                { label: "Add League", href: "/league/create-league", shortcut: "+⌘L" },
            ]}
        />
    );
}

export default EditMenu;