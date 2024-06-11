import axios from 'axios';
import { RootUrl } from './RootUrl';
import { dark } from '@mui/material/styles/createPalette';
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

// 파일 다운로드
export const FileDownload = async (data) => {
    const response = await axios.get(`${rootURL}/file/download?fileNo=${data}`, {
        responseType: 'blob',
    });

    return response;
};

// 이미지 업로드 API
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('이미지 업로드 호출');
    const response = await axios.post(`${rootURL}/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// 게시글 작성 API
export const ArticleWrite = async (formData) => {
    console.log('글 쓰기');

    const response = await axios.post(`${rootURL}/write`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// 파일 등록 API
export const fileUploads = async (formData) => {
    console.log('파일 등록');
    const response = await axios.post(`${rootURL}/file/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/** 파일 삭제 */
export const fileDelete = async (formData) => {
    const response = await axios.delete(`${rootURL}/file/delete?fileNo=${formData}`);
    return response.data;
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

export const postComment = async (data) => {
    const response = await axios.post(`${rootURL}/comment`, data);
    return response.data;
};

export const getArticleComment = async (data) => {
    const response = await axios.get(`${rootURL}/comment?articleNo=${data}`);
    return response.data;
};
