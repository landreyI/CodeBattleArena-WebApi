import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Friend } from "@/models/dbModels";
import { useState } from "react";
import { Button } from "../ui/button";
import FriendsList from "../lists/FriendsList";
import { Checkbox } from "../ui/checkbox";

interface Props {
    open: boolean;
    friends?: Friend[];
    isMultipleSelect?: boolean;
    onSaveSelect?: (selectFriend?: Friend) => void;
    onSaveSelected?: (selectedFriend?: Friend[]) => void;
    onClose: () => void;
}

export function FriendsSelectModal({
    open,
    friends = [],
    isMultipleSelect,
    onSaveSelect,
    onSaveSelected,
    onClose,
}: Props) {
    const [friendSelect, setFriendSelect] = useState<Friend>();
    const [friendSelected, setFriendSelected] = useState<Friend[]>([]);

    const handleSelect = (idFriend?: number) => {
        const selectedFriend = friends.find((s) => s.idFriend === idFriend);
        if (selectedFriend) {
            setFriendSelect(selectedFriend);
        }
    };

    const handleSelected = (idFriend?: number) => {
        const selectedFriend = friends.find((s) => s.idFriend === idFriend);
        if (!selectedFriend) return;

        setFriendSelected((prev) => {
            const alreadySelected = prev.some(f => f.idFriend === selectedFriend.idFriend);

            // Если уже выбран — убираем из массива
            if (alreadySelected) {
                return prev.filter(f => f.idFriend !== selectedFriend.idFriend);
            }

            // Если не выбран — добавляем
            return [...prev, selectedFriend];
        });
    };

    const onSave = () => {
        if (onSaveSelect) {
            onSaveSelect(friendSelect);
        } else {
            onSaveSelected?.(friendSelected);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="w-full overflow-y-auto pb-0">
                <DialogHeader>
                    <DialogTitle>Select friends</DialogTitle>
                </DialogHeader>

                <FriendsList
                    friends={friends}
                    className="max-h-[65vh] overflow-y-auto"
                    renderItemAddon={(friend) => {
                        if (!isMultipleSelect) {
                            const isSelected = friendSelect?.idFriend === friend.idFriend;
                            return (
                                <input
                                    type="radio"
                                    name="friendSelect"
                                    checked={isSelected}
                                    onChange={() => handleSelect?.(friend?.idFriend ?? undefined)}
                                    className="mr-3"
                                />
                            );
                        }
                        else {
                            const isSelected = friendSelected.some(f => f.idFriend === friend.idFriend);
                            return (
                                <Checkbox
                                    className="h-5 w-5 mr-3"
                                    checked={isSelected}
                                    onCheckedChange={() => handleSelected?.(friend?.idFriend ?? undefined)}
                                />
                            );
                        }
                    }}
                />

                <div className="flex flex-col md:flex-row justify-between my-3 gap-3">
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose} className="btn-animation">
                            Cancel
                        </Button>
                        <Button onClick={onSave} className="btn-animation btn-primary">
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FriendsSelectModal;
