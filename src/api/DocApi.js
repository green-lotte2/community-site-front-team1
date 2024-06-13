import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

// 문서 내용 저장
export const saveDoc = async (formData) =>{
    const response = await axios.post(`${rootURL}/doc/save`, formData);
    return response.data;
}

// 문서 내용 불러오기
export const getDocContent = async (page) =>{
    const response = await axios.post(`${rootURL}/doc/view`, page, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    });
    return response.data;
}
