import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();


//채팅방 생성
export const postCreateRoom = async (data) => {
    console.log('채팅방 생성 : ', data);
    const response = await fetch(`${rootURL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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


//원래 룸에 있었던 유저인지 확인 
export const findUser = async (data) => {

    console.log('룸에 있었던 유저인가?');
    const response = await fetch(`${rootURL}/findUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const responseData = await response.json(); // JSON 형식으로 변환
    let type=null;

    console.log("룸에 있던 유저 결과값 : ",responseData);

    if(responseData>=1){
        type="TALK"
    }else{
        type="ENTER";
    }

    return type;
};


//원래 룸에 있었던 유저인지 확인 
export const saveUser = async (data) => {

    console.log('룸에 있었던 유저인가?',data);
    const response = await axios.get(`${rootURL}/saveUser?id=${data.id}&roomId=${data.roomId}`);
    console.log(response)
    return response.data;
};








