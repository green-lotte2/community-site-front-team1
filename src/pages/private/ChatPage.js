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
import { SoketUrl } from '../../api/RootUrl';



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

    //연결 확인
    const [isLoading, setIsLoading] = useState(true);


   // 웹소켓 연결 설정
  const connectWebSocket =  () => {

      console.log("userId : ",auth?.userId);

      const ws = new WebSocket(`ws://${SoketUrl}/ws?userId=${auth?.userId}`);
     
      ws.onopen = () => {
        console.log("WebSocket connection established");
        setSocket(ws);
        setIsLoading(false); // 연결 완료 시 로딩 상태 변경
      };
  
      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setSocket(null); // 연결 종료 시 WebSocket 객체 초기화
      setIsLoading(true); // 연결 종료 시 로딩 상태 변경
      };
  
      ws.onerror = (error) => {
        console.log("WebSocket error: ", error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');

        //setTimeout(connect(),3000);//3초 뒤에 재연결
      };  
      
      stompClient.current = ws;
      
  };

  const handleRoomSelect = async(roomId,name,id) => {//채팅방을 선택했을 때
    setIsChatting(false);

      setSelectedRoomId(roomId);
      setSelectedRoomName(name);
      setUserId(id);
      setIsChatting(true);  

    
    //const response = await getMessage(roomId);

    //const messages = Array.isArray(response) ? response : [];
    
    //setChat(messages);

    //console.log(response);

   // setChat((prevChat) => [...prevChat, response]);

  };


  useEffect(() => {
    connectWebSocket(); // 컴포넌트가 마운트될 때 WebSocket 연결 설정

    return () => {
      if (stompClient.current) {
        stompClient.current.close(); // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
      }
    };
  }, []); // 처음 한 번만 실행

 
   // 로딩 중일 때 렌더링할 UI
   if (isLoading) {
    return (
      <MainLayout>
        <div>로딩 중...</div>
      </MainLayout>
    );
  }
    return (
    
      <MainLayout>
          <div className='chatBox'>
              
              {/** 채팅 목록 - 내가 들어가 있는 채팅목록을 띄워야 함... */}
              <ChatListComponent onRoomSelect={handleRoomSelect} ></ChatListComponent>
  
              {/** 채팅방 - 제일처음 들어갔을 땐 이 페이지가 없어야함... */}
              {isChatting?(<ChatRoomComponent socket = {socket} roomId={selectedRoomId} roomname={selectedRoomName} id={userId} ></ChatRoomComponent>):(<p>채팅방을 선택해주세요...</p>)}{/*beforeMessage={chat} */}
              
          </div>
          
      </MainLayout>
  
    )
  

}

export default ChatPage