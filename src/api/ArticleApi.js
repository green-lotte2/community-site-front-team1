import axios from 'axios';

const URL = 'http://localhost:8080/onepie/article';

export const getList = async (data) => {
    console.log(data)
    const response = await axios.post(`${URL}/list`, data);

    return response.data;
};


