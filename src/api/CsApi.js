import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl() + '/cs';


// 게시글 목록 출력 (전체) - list
export const postCsList = async (data) => {
    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/list`,data);

    return response.data;
};

//게시글 쓰기 
export const postCsWrite = async (data) => {
    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/register`,data);

    return response.data;
};


