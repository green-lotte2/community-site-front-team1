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
  const [messages, setMessages] = new useState([]);


   // 사용자 입력을 저장할 변수
  const [inputValue, setInputValue] = useState('');


   // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

   // 웹소켓 연결 설정
  const connect = () => {
    /*
    const socket = new WebSocket("ws://localhost:8080/onepie/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
    stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
    const newMessage = JSON.parse(message.body);

    });
    });*/
      const socket = new WebSocket("ws://localhost:8080/onepie/ws");
      stompClient.current = socket;
  
      socket.onopen = () => {
        console.log("WebSocket connection established");
      };
  
      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
  
      socket.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };

  };

  
  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  /*
  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = () => {
    return axios.get("http://localhost:8080/chat/1" )
           .then(response => {setMessages(response.data)});
    
  };
  */
   useEffect(() => {
    connect();

  }, []);

  //메세지 전송
  const sendMessage = () => {
    if (stompClient.current && inputValue) {
      const body = {
        id : 1,
        name : "테스트1",
        message : inputValue
      };
      stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
      setInputValue('');
    }
  };

  
  return (
    
    <MainLayout>
        <div className='chatBox'>
            
            {/** 채팅 목록 - 내가 들어가 있는 채팅목록을 띄워야 함... */}
            <ChatListComponent></ChatListComponent>

            {/** 채팅방 - 제일처음 들어갔을 땐 이 페이지가 없어야함... */}
            <ChatRoomComponent></ChatRoomComponent>
            
        </div>
        
    </MainLayout>

  )
}

export default ChatPage