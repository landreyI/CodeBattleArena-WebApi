import { useNavigate, useParams } from "react-router-dom";
import { useItem } from "@/hooks/item/useItem";
import { useDeleteItem } from "@/hooks/item/useDeleteItem";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Item, PlayerItem } from "@/models/dbModels";
import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingScreen from "@/components/common/LoadingScreen";
import InlineNotification from "@/components/common/InlineErrorNotification";
import { isEditRole } from "@/untils/businessRules";
import ItemCard from "@/components/cards/ItemCard";
import SettingMenu from "@/components/menu/SettingMenu";
import { usePlayerItems } from "@/hooks/item/usePlayerItems";
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EditItemModal from "@/components/modals/EditItemModal";
import { Button } from "@/components/ui/button";
import { useCreatePlayerItem } from "@/hooks/item/useCreatePlayerItem";
import { useChangeActiveItem } from "@/hooks/player/useChangeActiveItem";

export function ItemInfo() {
    const { itemId } = useParams<{ itemId: string }>();
    const { item, setItem, loading: itemLoad, error: itemError, reloadItem } = useItem(Number(itemId));
    const { deleteItem, error: itemDeleteError } = useDeleteItem();
    const { createPlayerItem, error: playerItemCreateError } = useCreatePlayerItem();
    const { changeActiveItem, error: changeError } = useChangeActiveItem();
    const { user } = useAuth();
    const { playerItems } = usePlayerItems(user?.id);
    const navigate = useNavigate();

    const [notification, setNotification] = useState<string | null>(null);
    const [showEditItem, setShowEditItem] = useState(false);
    const [isOwned, setIsOwned] = useState(false);

    useEffect(() => {
        setIsOwned(playerItems?.some(p => p.idItem === item?.idItem) ?? false);
    }, [playerItems, item]);


    const handleUpdateItem = (updatedItem: Item) => {
        setItem(updatedItem);
    };

    const handleDeletItem = async () => {
        const isSuccess = await deleteItem(Number(itemId));
        if (isSuccess)
            navigate(`/item/list-items`);
    };

    const handleAddInventory = async () => {
        setNotification(null);
        const isEdit = isEditRole(user?.roles ?? []);
        if (isEdit) {
            const playerItem: PlayerItem = {
                idPlayer: user?.id ?? "",
                player: null,
                idItem: item?.idItem ?? 0,
                item: null
            };
            const isSuccess = await createPlayerItem(playerItem);
            if (isSuccess) {
                setNotification("Successfully added");
                setIsOwned(true);
            }
        }
    }

    const handleMakeActive = async () => {
        setNotification(null);
        const isSuccess = await changeActiveItem(user?.id, Number(itemId));
        if(isSuccess) setNotification("Successfully change");
    }

    if (itemLoad) return <LoadingScreen />
    if (itemError) return <ErrorMessage error={itemError} />;
    if (!item) return <EmptyState message="Item not found" />;

    const error = itemDeleteError || playerItemCreateError || changeError;
    return (
        <>
            {error && <InlineNotification message={error.message} position="top" className="bg-red" />}

            {notification && (
                <InlineNotification message={notification} position="top" className="bg-blue" />
            )}

            <div className="glow-box py-8 px-4">
                <div className="md:w-[60vw] sm:w-[100vw] mx-auto space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
                        {/* Левая зона: бейдж + кнопка */}
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {isOwned && (
                                <Badge className="inline-flex items-center gap-2 bg-green text-white px-3 py-1.5 rounded-md text-sm font-semibold">
                                    <CircleCheck size={16} />
                                    In Inventory
                                </Badge>
                            )}

                            {(isOwned || isEditRole(user?.roles ?? [])) && (
                                <Button
                                    onClick={isOwned ? handleMakeActive : handleAddInventory}
                                    className="btn-animation w-auto"
                                >
                                    {isOwned ? 'Set as Active' : 'Add to Inventory'}
                                </Button>
                            )}
                        </div>

                        {/* Правая зона: меню */}
                        {user && isEditRole(user.roles) && (
                            <SettingMenu
                                setShowEdit={setShowEditItem}
                                handleDelet={handleDeletItem}
                            />
                        )}
                    </div>

                    <ItemCard item={item} />
                </div>
            </div>

            {item && (
                <EditItemModal open={showEditItem} item={item} onClose={() => setShowEditItem(false)} onUpdate={handleUpdateItem} />
            )}
        </>
    )
}

export default ItemInfo;