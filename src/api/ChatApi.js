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
        body: JSON.stringify(data)
    });

    return response.json();
};


//리스트 목록 
export const getRoomList = async (data) => {

    console.log('리스트 목록 띄우기');
    const response = await axios.get(`${rootURL}/chat?stfNo=${data}`);

    console.log("룸 리스트 : ",response.data);

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
        type="NOMAL"
    }else{
        type="ENTER";
    }

    console.log("타입 출력해봅니다.",type);

    return type;
};


//유저 저장
export const saveUser = async (data) => {

    console.log('유저 세이브?',data);
    console.log("유저 아이디",data.stfNo);
    const response = await axios.get(`${rootURL}/saveUser?id=${data.stfNo}&roomId=${data.roomId}`);
    console.log(response)

    return response.data;
};

//메시지 내용 저장
export const chatSave = async (data) => {

    console.log('메시지 세이브',data);

    if (data.message != null && data.message !== '') {

        console.log("메시지 내용이 있으면 들어오는 곳");

        await axios.post(`${rootURL}/chatSave`, data);
    }
};



//룸에서 했던 대화 들고오기
export const getMessage = async (data) => {

    console.log('메시지 가져오기',data);
    
    const response = await axios.get(`${rootURL}/getMessage?roomId=${data}`);

    console.log(response.data);
    
    return response.data;
};


//룸에서 나오기
export const postLeaveRoom = async (data) => {

    console.log('룸에서 나가기',data);
    
    const response = await axios.post(`${rootURL}/leaveRoom`,data);

    console.log(response.data);
    
    return response.data;
};


//룸 삭제하기
export const getDeleteRoom = async (data) => {

    console.log('룸 삭제',data);
    
    const response = await axios.get(`${rootURL}/deleteRoom?roomId=${data.roomId}&stfNo=${data.stfNo}`);

    console.log(response.data);
    
    return response.data;
};


//룸에 있는 멤버가 몇명인지 확인
export const getCount = async (data) => {

    console.log('멤버 수 확인 : ',data);
    
    const response = await axios.get(`${rootURL}/getCount?roomId=${data}`);

    console.log("지금 룸에 몇명이 있찌? : ",response.data);
    
    return response.data;
};










