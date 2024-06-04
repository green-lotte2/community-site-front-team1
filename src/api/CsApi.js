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


//게시글 보기
export const getCsView = async (data) => {
    console.log('글 목록', data);
    const response = await axios.get(`${rootURL}/view?csNo=${data}`);

    return response.data;
};


//댓글달기
export const postCsComment = async (data) => {
    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/answer`,data);

    return response.data;
};


//댓글불러오기
export const getcsComment = async (data) => {
    console.log('글 목록', data);
    const response = await axios.get(`${rootURL}/answerList?csNo=${data}`);

    return response.data;
};



//댓글삭제
export const getCommentDelete = async (data) => {
    console.log('글 목록', data);
    const response = await axios.get(`${rootURL}/answerDelete?csComNo=${data}`);

    return response.data;
};


//게시글 삭제
export const getDeleteCsView = async (data) => {
    console.log('글 목록', data);

    const response = await axios.get(`${rootURL}/delete?csNo=${data}`);

    return response.data;
};


