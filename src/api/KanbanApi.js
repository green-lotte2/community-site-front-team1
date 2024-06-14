import { dark } from '@mui/material/styles/createPalette';
import { RootUrl } from './RootUrl';
import axios from 'axios';

const rootURL = RootUrl() + '/kanban';
export const postKanban = async (data) => {
    try {
        const response = await axios.post(`${rootURL}/creat`, data);
        return response.data;
    } catch (err) {
        console.log('creating Kanban', err);
        throw err;
    }
};

export const postKanbanMember = async (data) => {
    try {
        const response = await axios.post(`${rootURL}/member`, data);
        return response.data;
    } catch (err) {
        console.log('post Kanban Member', err);
        throw err;
    }
};

export const getKanban = async (data) => {
    try {
        const response = await axios.get(`${rootURL}/list?kanbanStf=${data}`);
        return response.data;
    } catch (err) {
        console.log('fail to getKanban', err);
    }
};

export const deleteBoard = async (id) => {
    try {
        const response = await axios.delete(`${rootURL}/${id}`);
        return response.data;
    } catch (err) {
        console.log('fail to remove', err);
    }
};

export const postBoard = async (data) => {
    const response = await axios.post(`${rootURL}/addBoard`, data);
    return response.data;
};

export const getKanbanDataById = async (kanbanId) => {
    // Implement the API call to get kanban details by ID
    const response = await axios.get(`${rootURL}/${kanbanId}`);
    return response.data;
};
