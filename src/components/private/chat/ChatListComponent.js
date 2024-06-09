import { faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CreateChatRoomModal from '../../modal/CreateChatRoomModal'
import { getRoomList,postCreateRoom } from '../../../api/ChatApi'

const ChatListComponent = () => {

    /** 채팅방 생성 모달 관리 */
    const [openCreateChatRoom, setOpenCreateChatRoom] = useState(false);
    const [roomList, setRoomList] = useState([]);

    const handelOpenModal = () => {
        setOpenCreateChatRoom(true);
    }

    const handelColseModal = () => {
        setOpenCreateChatRoom(false);
    }

   
    const fetchRoomList = async () => {
            try {
                const response = await getRoomList();
                setRoomList(response); 
                console.log(response);
            } catch (error) {
                console.error('Error fetching room list:', error);
            }
    };
    useEffect(() => {

        fetchRoomList();

    }, []);

    const createChatRoom = async (name) => {
        try {
            await postCreateRoom(name);
            // 생성 후 방 목록 갱신
            fetchRoomList();
            // 모달 닫기
            handelColseModal();
        } catch (error) {
            console.error('Error creating chat room:', error);
        }
    };

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

{/*여기에 디비에 저장해둔 방 리스트들 출력 */}

        {roomList.map(room => (
                <div key={room.roomId} className='chatRoomList'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
            <div>
                <p>{room.name}</p>
            </div>
            <span className='ballCount'>1</span>
        </div>
        ))}
            
        {openCreateChatRoom && <CreateChatRoomModal handleCreateRoom={createChatRoom} handelColseModal={handelColseModal}/>}

    </div>
  )
}

export default ChatListComponent