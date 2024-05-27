import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/admin/user';

export const getUserList = async (data) => {
    const response = await axios.get(`${rootURL}/list`);

    return response.data;
};

export const getDptList = async (data) => {
    const response = await axios.get(`${rootURL}/dptList`);
    console.log('dpt' + response);
    return response.data;
};

export const getRnkList = async (data) => {
    const response = await axios.get(`${rootURL}/rnkList`);
    console.log('getRnkList' + response);
    return response.data;
};
