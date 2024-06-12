import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFaceSmile, faGear, faImage, faMessage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import ChatListComponent from '../../components/private/chat/ChatListComponent'
import ChatRoomComponent from '../../components/private/chat/ChatRoomComponent'
import {Stomp} from "@stomp/stompjs";
import axios from 'axios';

const ChatPage = () => {

 const stompClient = useRef(null);

 
  // 채팅 내용들을 저장할 변수
  const [socket, setSocket] = new useState(null);


  // 선택된 방 ID를 저장할 상태 변수
  const [selectedRoomId, setSelectedRoomId] = useState(null);

    // 선택된 방 Name를 저장할 상태 변수
    const [selectedRoomName, setSelectedRoomName] = useState(null);

    const[userId,setUserId] = useState('');

  //연결 확인 boolean

  const [a , setA] = useState(false);
   // 웹소켓 연결 설정
  const connect = async () => {

      const socket = await new WebSocket("ws://localhost:8080/onepie/ws");
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

  const handleRoomSelect = (roomId,name,id) => {

    setSelectedRoomId(roomId);
    setSelectedRoomName(name);
    setUserId(id);

  };


   useEffect(() => {

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
              <ChatRoomComponent socket = {socket} roomId={selectedRoomId} roomname={selectedRoomName} id={userId}></ChatRoomComponent>
              
          </div>
          
      </MainLayout>
  
    )
  }

}

export default ChatPage