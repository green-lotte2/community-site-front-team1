import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl() + '/cs';



// 게시글 목록 출력 (전체) - list
export const postCsList = async (data) => {

    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);

    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/list`,data);

    return response.data;
};




// 게시글 검색 목록 출력  - search////////////////추가////////////////
export const postCsSearch = async (data) => {

    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);

    console.log('검색 글 목록', data);
    const response = await axios.post(`${rootURL}/search`,data);

    return response.data;
};





// Date 객체를 ISO 8601 형식의 문자열로 변환하는 함수
const formatDate = (dateString) => {
    if (!dateString) return ''; // 날짜 값이 없을 경우 빈 문자열 반환

    const date = new Date(dateString); // 문자열을 Date 객체로 변환
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}T00:00:00`;
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


