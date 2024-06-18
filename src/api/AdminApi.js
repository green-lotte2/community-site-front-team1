import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/admin';

export const postUserList = async (data) => {
    try {
        const response = await axios.post(`${rootURL}/user/list`, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getUserList = async () => {
    const response = await axios.get(`${rootURL}/user/list`);

    return response.data;
};

export const getDptList = async () => {
    const response = await axios.get(`${rootURL}/user/dptList`);

    return response.data;
};

export const postDpt = async (data) => {
    const response = await axios.post(`${rootURL}/dpt/insert`, data);
    return response.data;
};

export const getUserInfo = async (data) => {
    const response = await axios.get(`${rootURL}/user/detail?stfNo=${data}`);
    return response.data;
};

export const getDptAndStfList = async () => {
    const response = await axios.get(`${rootURL}/user/dptAndStfList`);

    return response.data;
};

export const getRnkList = async (data) => {
    const response = await axios.get(`${rootURL}/user/rnkList`);

    return response.data;
};

export const modifyUserLank = async (data) => {
    const response = await axios.put(`${rootURL}/user/modify`, data);
    return response.data;
};

export const getArticleCateList = async () => {
    const response = await axios.get(`${rootURL}/articleCateList`);
    return response.data;
};

export const postArticleCate = async (data) => {
    const response = await axios.post(`${rootURL}/insertCate`, data);
    return response.data;
};

export const modifyArticleCate = async (data) => {
    const response = await axios.put(`${rootURL}/modifyCate`, data);
    return response.data;
};

export const delArticleCateList = async (data) => {
    const response = await axios.delete(`${rootURL}/deleteCate?articleCateNo=${data}`);
    return response.data;
};

export const deleteDpt = async (data) => {
    const response = await axios.delete(`${rootURL}/deleteDpt?dptNo=${data}`);
    return response.data;
};

export const updateDpt = async (data) => {
    const response = await axios.put(`${rootURL}/updateDpt`, data);
    return response.data;
};

export const updateRank = async (data) => {
    const response = await axios.post(`${rootURL}/updateRank`, data);
    return response.data;
};

export const insertRank = async (data) => {
    const response = await axios.post(`${rootURL}/insertRank`, data);
    return response.data;
};

export const deleteRank = async (data) => {
    const response = await axios.delete(`${rootURL}/deleteRank?rnkNo=${data}`);
    return response.data;
};
