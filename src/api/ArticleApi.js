import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl() + '/article';

// 게시글 목록 출력 (전체) - list
export const ArticleList = async (data) => {
    console.log('글 목록', data);
    const response = await axios.post(`${rootURL}/list`, data);

    return response.data;
};

// 게시글 카테고리 출력
export const getArticleCate = async (data) => {
    // articleCate 조회하는 (findById) 로직
    const response = await axios.get(`${rootURL}?articleCateNo=${data}`);

    return response.data;
};

// 게시글 출력 (1개) - view
export const ArticleView = async (data) => {
    console.log('글 보기', data);
    const response = await axios.get(`${rootURL}/view?articleNo=${data}`);
    console.log(response);
    return response.data;
};

// 게시글 작성
export const ArticleWrite = async (data) => {
    console.log('글 쓰기', data);
    try {
        const response = await axios.post(`${rootURL}/write`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to write article:', error);
        throw error;
    }
};

// 게시글 modify 폼
export const ArticleModifyForm = async (data) => {
    console.log('글 수정(폼)', data);
    const response = await axios.get(`${rootURL}/modify?articleNo=${data}`);

    return response.data;
};

// 게시글 수정
export const ArticleModify = async (data) => {
    console.log('글 수정(기능)', data);
    try {
        const response = await axios.post(`${rootURL}/modify`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to modify article:', error);
        throw error;
    }
};

// 게시글 삭제
export const ArticleDelete = async (data) => {
    console.log('글 삭제', data);
    try {
        const response = await axios.post(`${rootURL}/delete`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to delete article:', error);
        throw error;
    }
};
