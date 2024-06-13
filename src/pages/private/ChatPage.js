import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFaceSmile, faGear, faImage, faMessage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import ChatListComponent from '../../components/private/chat/ChatListComponent'
import ChatRoomComponent from '../../components/private/chat/ChatRoomComponent'
import {Stomp} from "@stomp/stompjs";
import axios from 'axios';
import { getCookie} from "../../util/cookieUtil";
import {getMessage} from '../../api/ChatApi'



const ChatPage = () => {

 const stompClient = useRef(null);

 const auth = getCookie("auth");

 const [chat, setChat] = useState([]);
 
  // 채팅 내용들을 저장할 변수
  const [socket, setSocket] = new useState(null);

  // 선택된 방 ID를 저장할 상태 변수
  const [selectedRoomId, setSelectedRoomId] = useState(null);

    // 선택된 방 Name를 저장할 상태 변수
    const [selectedRoomName, setSelectedRoomName] = useState(null);

    const[userId,setUserId] = useState('');

    const [isChatting,setIsChatting] = useState(false);

  //연결 확인 boolean

  const [a , setA] = useState(false);
   // 웹소켓 연결 설정
  const connect =  () => {

      console.log("userId : ",auth?.userId);

      const socket = new WebSocket(`ws://localhost:8080/onepie/ws?userId=${auth?.userId}`);
      stompClient.current = socket;
      setSocket(socket);
      setA(true);
      socket.onopen = () => {
        console.log("WebSocket connection established");
      };
  
      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
  
      socket.onerror = (error) => {
        console.log("WebSocket error: ", error);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');

        //setTimeout(connect(),3000);//3초 뒤에 재연결
      };     
      
  };

  const handleRoomSelect = async(roomId,name,id) => {//채팅방을 선택했을 때

    setSelectedRoomId(roomId);
    setSelectedRoomName(name);
    setUserId(id);
    setIsChatting(true);
    const response = await getMessage(roomId);

    console.log(response);

    setChat((prevChat) => [...prevChat, response]);

  };


   useEffect(() => {

    console.log("userId : ",auth?.userId);

      connect();

  }, []);

 
  if(!a){
    return (
      <><p>로딩~</p></>
    )
  }else{
    return (
    
      <MainLayout>
          <div className='chatBox'>
              
              {/** 채팅 목록 - 내가 들어가 있는 채팅목록을 띄워야 함... */}
              <ChatListComponent onRoomSelect={handleRoomSelect} ></ChatListComponent>
  
              {/** 채팅방 - 제일처음 들어갔을 땐 이 페이지가 없어야함... */}
              {isChatting?(<ChatRoomComponent socket = {socket} roomId={selectedRoomId} roomname={selectedRoomName} id={userId} beforeMessage={chat}></ChatRoomComponent>):(<p>채팅방을 선택해주세요...</p>)}
              
          </div>
          
      </MainLayout>
  
    )
  }

}

export default ChatPage