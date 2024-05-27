import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl() + '/article';

// 게시글 목록 출력 (전체)
export const getArticleList = async (data) => {
    console.log("글 목록", data);
    const response = await axios.post(`${rootURL}/list`, data);
    //const response = await axios.post(`http://15.165.24.202:8080/onepie/article/list`, data);

    return response.data;
};

// 게시물 카테고리 출력
export const getArticleCate = async (data) => {
    // articleCate 조회하는 (findById) 로직
    const response = await axios.get(`${rootURL}?articleCateNo=${data}`);

    return response.data;
}


// 게시글 출력 (1개)
export const getArticleView = async (data) => {
    console.log("글 보기", data);
    const response = await axios.post(`${rootURL}/view`, data);
    //const response = await axios.post(`http://15.165.24.202:8080/onepie/article/view`, data);

    return response.data;
};
// 게시글 작성
export const writeArticle = async (data) => {
    console.log("글 쓰기", data);
    const response = await axios.post(`${rootURL}/write`, data);
    //const response = await axios.post(`http://15.165.24.202:8080/onepie/article/write`, data);

    return response.data;
};
// 게시글 삭제
export const deleteArticle = async (data) => {
    console.log("글 삭제", data)
    const response = await axios.post(`${rootURL}/delete`, data);
    //const response = await axios.post(`http://15.165.24.202:8080/onepie/article/delete`, data);

    return response.data;
};