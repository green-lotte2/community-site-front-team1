import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

// 문서 내용 저장
export const saveDoc = async (formData) =>{

    const response = await axios.post(`${rootURL}/doc/save`, formData, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    });

    return response.data;
}
