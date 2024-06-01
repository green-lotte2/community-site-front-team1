import { faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import CreateChatRoomModal from '../../modal/CreateChatRoomModal'

const ChatListComponent = () => {

    /** 채팅방 생성 모달 관리 */
    const [openCreateChatRoom, setOpenCreateChatRoom] = useState(false);

    const handelOpenModal = () => {
        setOpenCreateChatRoom(true);
    }

    const handelColseModal = () => {
        setOpenCreateChatRoom(false);
    }

  return (
    <div className="contentBox boxStyle9">
        <div className="chatInfo">
            <img src="../images/iconSample3.png" alt="pro" />
            <div>
                <p>홍길동</p>
                <p>abcd1234@gmail.com</p>
            </div>
        </div>

        <div className='chatRoomList' onClick={handelOpenModal}>
            <FontAwesomeIcon icon={faSquarePlus} />
            <div>
                <p>대화방 생성</p>
            </div>
        </div>

        <div className='chatRoomList'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
            <div>
                <p>회의방</p>
            </div>
            <span className='ballCount'>1</span>
        </div>
            
        <div className='chatRoomList'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
            <div>
                <p>회의방</p>
            </div>
            <span className='ballCount'>1</span>
        </div>

        <div className='chatRoomList'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
            <div>
                <p>회의방</p>
            </div>
            <span className='ballCount'>1</span>
        </div>

        {openCreateChatRoom && <CreateChatRoomModal handelColseModal={handelColseModal}/>}

    </div>
  )
}

export default ChatListComponent