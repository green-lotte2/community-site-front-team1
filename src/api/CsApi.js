import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl() + '/cs';


// 게시글 목록 출력 (전체) - list
export const postCsList = async (data) => {
    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/list`,data);

    return response.data;
};

//검색을 위한것
export const postSearch = async (data) =>{

    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/search`,data);

    return response.data;
};

