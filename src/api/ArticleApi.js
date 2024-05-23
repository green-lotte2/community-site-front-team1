import axios from 'axios';

const URL = 'http://localhost:8080/zeropie/article';

export const getList = async (articleCateNo) => {
    
    const response = await axios.get(`${URL}/list?articleCateNo=${articleCateNo}`);
  
    return response.data;
};
