import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/admin';

export const getUserList = async (data) => {
    try {
        console.log('검색감지');
        const response = await axios.post(`${rootURL}/user/list`, data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getDptList = async (data) => {
    const response = await axios.get(`${rootURL}/user/dptList`);

    return response.data;
};

export const getRnkList = async (data) => {
    const response = await axios.get(`${rootURL}/user/rnkList`);

    return response.data;
};

export const getArticleCateList = async () => {
    const response = await axios.get(`${rootURL}/articleCateList`);
    return response.data;
};

export const modifyArticleCate = async (data) => {
    const response = await axios.put(`${rootURL}/modifyCate`, data);
    return response.data;
};
