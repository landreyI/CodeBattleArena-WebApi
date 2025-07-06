import { api } from "../api/axios";
import { Friend } from "../models/dbModels";

export const fetchGetListFriends = async (): Promise<Friend[]> => {
    try {
        let response = await api.get(`Friend/list-friends`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchGetFriendshipFriends = async (): Promise<Friend[]> => {
    try {
        let response = await api.get(`Friend/friendship-friends`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetcAddFriend = async (addresseeId?: string): Promise<boolean> => {
    try {
        const response = await api.post(`Friend/add-friend`, addresseeId);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchApproveFriendship = async (idFriend?: number): Promise<boolean> => {
    try {
        const response = await api.put(`/Friend/approve-friendship`, idFriend);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchDeleteFriend = async (idFriend?: number): Promise<boolean> => {
    try {
        let response = await api.delete(`Friend/delete-friend`, {
            params: { idFriend: idFriend }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}