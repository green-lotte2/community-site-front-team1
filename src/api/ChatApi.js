import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

//채팅방 생성
export const postCreateRoom = async (data) => {
    console.log('채팅방 생성 : ', data);
    const response = await fetch(`${rootURL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: data
    });

    return response.json();
};



//리스트 목록 
export const getRoomList = async () => {

    console.log('리스트 목록 띄우기');
    const response = await axios.get(`${rootURL}/chat`);

    return response.data;
};


//리스트 목록 
export const getUserInfo = async () => {

    console.log('리스트 목록 띄우기');
    const response = await axios.get(`${rootURL}/chat`);

    return response.data;
};

