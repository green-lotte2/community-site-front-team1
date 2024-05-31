import axios from 'axios';
import { RootUrl } from './RootUrl';

export const uploadImage = async (formData) => {

    try {
        
        const response = await axios.post(`${RootUrl}/write`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
};