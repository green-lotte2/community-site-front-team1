import axios from 'axios';
import { RootUrl } from './RootUrl';

const URL = RootUrl.URL + '/article';

export const getList = async (data) => {
    console.log(data);
    const response = await axios.post(`${URL}/list`, data);

    return response.data;
};
