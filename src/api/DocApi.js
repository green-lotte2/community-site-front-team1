import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

// 내 문서 목록 불러오기
export const getDocList = async (userId) =>{
    const response = await axios.post(`${rootURL}/doc/list`, userId, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
}

// 문서 내용 저장
export const saveDoc = async (formData) =>{
    const response = await axios.post(`${rootURL}/doc/save`, formData);
    return response.data;
}

// 문서 내용 불러오기
export const getDocContent = async (page) =>{
    const response = await axios.post(`${rootURL}/doc/view`, page, {
        headers: {
            'Content-Type': 'application/json'
        },  
    });
    return response.data;
}

// 새 문서 생성
export const setNewDoc = async (userId) =>{
    const response = await axios.post(`${rootURL}/doc/create`, userId, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
}

// 문서 파일 저장
export const saveDocFile = async (formData) =>{
    const response = await axios.post(`${rootURL}/doc/file`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
}

// 현재 문서의 공동 작업자 목록 조회
export const selectMember = async (pno) =>{
    const response = await axios.get(`${rootURL}/doc/member/${pno}`);
    return response.data;
}

// 현재 문서의 공동 작업자 초대
export const addDocMember = async (data) => {
    const response = await axios.post(`${rootURL}/doc/addMember`, data);
    return response.data;
};

// 현재 문서 삭제
export const deleteDocApi = async (pno) =>{
    const response = await axios.get(`${rootURL}/doc/delete/${pno}`);
    return response.data;
}

// 현재 문서 나가기
export const exitDocApi = async (data) =>{
    const response = await axios.post(`${rootURL}/doc/exit`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}