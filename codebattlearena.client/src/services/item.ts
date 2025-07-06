import { api } from "../api/axios";
import { Item, PlayerItem, TypeItem  } from "../models/dbModels";
import { ItemFilters } from "../models/filters";

export const fetchGetItem = async (id: number): Promise<Item> => {
    try {
        let response = await api.get(`Item/info-item`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetItemsList = async (filter?: ItemFilters): Promise<Item[]> => {
    try {
        let response = await api.get(`Item/list-items`, {
            params: filter
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetPlayerItems = async (idPlayer?: string, typeItem?: TypeItem): Promise<Item[]> => {
    try {
        let response = await api.get(`Item/list-player-items`, {
            params: {
                idPlayer: idPlayer,
                typeItem: typeItem
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchCreateItem = async (item: Item): Promise<{ idItem: number }> => {
    try {
        const response = await api.post(`Item/create-item`, item);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchBuyItem = async (playerItem: PlayerItem): Promise<boolean> => {
    try {
        const response = await api.post(`Item/buy-item`, playerItem);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchUpdateItem = async (item: Item): Promise<boolean> => {
    try {
        const response = await api.put(`/Item/edit-item`, item);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchDeleteItem = async (id: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Item/delete-item`, {
            params: { id: id }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}