import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import CreateChatRoomModal from '../../modal/CreateChatRoomModal';
import { getRoomList, postCreateRoom } from '../../../api/ChatApi';
import { getCookie } from "../../../util/cookieUtil";
import { getUserInfo } from '../../../api/MemberApi';
import { RootUrl } from '../../../api/RootUrl';

const ChatListComponent = ({ onRoomSelect }) => {
    const auth = getCookie("auth");
    const id = auth?.userId;
    const name = auth?.username;

    const [openCreateChatRoom, setOpenCreateChatRoom] = useState(false);
    const [roomList, setRoomList] = useState([]);
    const [email, setEmail] = useState('');

    const handleOpenModal = () => {
        setOpenCreateChatRoom(true);
    };

    const handleCloseModal = () => {
        setOpenCreateChatRoom(false);
    };

    const fetchRoomList = async () => {
        try {
            const response = await getRoomList(auth?.userId);

            setRoomList(response); 

            console.log(response);
        } catch (error) {
            console.error('방 목록 가져오기 오류:', error);
        }
    };

    const getUser = async () => {
        const response = await getUserInfo(id);
        setEmail(response.stfEmail);
        console.log("사용자 정보:", response.stfEmail);
    };

    useEffect(() => {
        fetchRoomList();
        getUser();
    }, []);

    const createChatRoom = async (name) => {
        try {
            await postCreateRoom(name);
            fetchRoomList();
            handleCloseModal();
        } catch (error) {
            console.error('채팅 방 생성 오류:', error);
        }
    };

    return (
        <div className="contentBox boxStyle9">
            <div className="chatInfo">
                <img src={`${RootUrl()}/images/${auth?.userImg}`} alt='이미지'/> 
                <div>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
            </div>

            <div className='chatRoomList' onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <div>
                    <p>대화방 생성</p>
                </div>
            </div>

            {roomList.map(room => (
                <div key={room.roomId} className='chatRoomList' onClick={() => onRoomSelect(room.roomId, room.name, id,room.stfNo)}>
                    <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae"}} />
                    <div>
                        <p>{room.name}</p>
                    </div>
                    {/*<span className='ballCount'>1</span>*/}
                </div>
            ))}
            
            {openCreateChatRoom && <CreateChatRoomModal handleCreateRoom={createChatRoom} handleCloseModal={handleCloseModal}/>}
        </div>
    );
};

export default ChatListComponent;
