import React from 'react'
import MainLayout from '../../layout/MainLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFaceSmile, faGear, faImage, faMessage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import ChatListComponent from '../../components/private/chat/ChatListComponent'
import ChatRoomComponent from '../../components/private/chat/ChatRoomComponent'

const ChatPage = () => {
  return (
    <MainLayout>
        <div className='chatBox'>
            
            {/** 채팅 목록 */}
            <ChatListComponent></ChatListComponent>

            {/** 채팅방 */}
            <ChatRoomComponent></ChatRoomComponent>
            
        </div>
        
    </MainLayout>
  )
}

export default ChatPage