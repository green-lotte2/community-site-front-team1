import axios from 'axios';

const URL = 'http://localhost:8080/onepie/article';

export const getList = async (articleCateNo) => {
    const response = await axios.get(`${URL}/list?articleCateNo=${articleCateNo}`);

    return response.data;
};
