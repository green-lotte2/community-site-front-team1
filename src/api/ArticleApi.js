import axios from 'axios';
import { RootUrl } from './RootUrl';

const URL = RootUrl.URL + '/article';

export const getList = async (data) => {
    console.log(data);
    const response = await axios.post(`http://15.165.24.202:8080/zeropie/article/list`, data);

    return response.data;
};
