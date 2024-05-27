import axios from 'axios';
import { RootUrl } from './RootUrl';

const rootURL = RootUrl() + '/article';
console.log(RootUrl());
export const getList = async (data) => {
    console.log(data);
    const response = await axios.post(`${rootURL}/list`, data);


    return response.data;
};
