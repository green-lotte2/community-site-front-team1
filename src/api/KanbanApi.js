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
    const response = await axios.get(`${rootURL}/${kanbanId}`);
    return response.data;
};

export const getStfList = async (kanbanId) => {
    const response = await axios.get(`${rootURL}/stfList/${kanbanId}`);
    return response.data;
};

export const delKanban = async (kanbanId) => {
    const response = await axios.delete(`${rootURL}/del/${kanbanId}`);
    return response.data;
};

export const deleteStf = async (stfNo, kanbanNo) => {
    console.log('여긴 API : ', stfNo, kanbanNo);
    const response = await axios.delete(`${rootURL}/stf?kanbanNo=${kanbanNo}&stfNo=${stfNo}`);
    return response.data;
};
