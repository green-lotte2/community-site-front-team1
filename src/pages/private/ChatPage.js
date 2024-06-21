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

  // 선택된 방 ID를 저장할 상태 변수
  const [selectedRoomId, setSelectedRoomId] = useState(null);

    // 선택된 방 Name를 저장할 상태 변수
    const [selectedRoomName, setSelectedRoomName] = useState(null);

    const[userId,setUserId] = useState('');

    const [isChatting,setIsChatting] = useState(false);

    //방을 생성한 유저 아이디를 담음
    const [createUser,setCreateUser] = useState(null);

   
  const handleRoomSelect = async(roomId,name,id,create) => {//채팅방을 선택했을 때
    setIsChatting(false);

      setSelectedRoomId(roomId);
      setSelectedRoomName(name);
      setUserId(id);
      setCreateUser(create);
      setIsChatting(true);  

  };


 
  
    return (
    
      <MainLayout>
          <div className='chatBox'>
              
              {/** 채팅 목록 - 내가 들어가 있는 채팅목록을 띄워야 함... */}
              <ChatListComponent onRoomSelect={handleRoomSelect} ></ChatListComponent>
  
              {/** 채팅방 - 제일처음 들어갔을 땐 이 페이지가 없어야함... */}
              <div className="contentBox boxStyle8">
              {isChatting?(<ChatRoomComponent roomId={selectedRoomId} roomname={selectedRoomName} id={userId} createUser={createUser} ></ChatRoomComponent>):(<p>채팅방을 선택해주세요...</p>)}{/*beforeMessage={chat} */}      
              </div>

          </div>
          
      </MainLayout>
  
    )
  

}

export default ChatPage