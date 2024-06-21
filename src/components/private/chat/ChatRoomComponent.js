import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faGear, faImage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import EmojiBoxComponent from './EmojiBoxComponent';
import { getCookie } from "../../../util/cookieUtil";
import { RootUrl, SoketUrl } from '../../../api/RootUrl'; // SoketUrl 오타 수정
import { findUser, saveUser, chatSave, getMessage, postLeaveRoom , getDeleteRoom,findUserList} from '../../../api/ChatApi';
import AddChatMemberModal from '../../modal/AddChatMemberModal';

const ChatRoomComponent = ({ roomId, roomname, id, createUser }) => {
    const [chat, setChat] = useState([]);
    const [beforeChat, setBeforeChat] = useState([]); // 이전 채팅 불러오기
    const [socket, setSocket] = useState(null); // WebSocket 객체 상태 추가
    const auth = getCookie("auth");
    const chatEndRef = useRef(null); // 메세지 추적
    const textareaRef = useRef(null);
    const [emojiBoxOpen, setEmojiBoxOpen] = useState(false);
    const [chatMsg, setChatMsg] = useState("");
    const [settingsOpen, setSettingsOpen] = useState(false); // 설정 메뉴 상태 추가
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태 추가


    useEffect(() => {
        if (!roomId || !id) return;

        setChat([]);

        // 저장했던 내용 가져오기
        const getBeforeChat = async () => {
            const response = await getMessage(roomId);
            setBeforeChat(response);
        };

        const connectWebSocket = () => {
            const newSocket = new WebSocket(`ws://${SoketUrl}/ws?userId=${auth?.userId}`);

            newSocket.onopen = () => {
                console.log("WebSocket 연결 성공");
                setSocket(newSocket); // WebSocket 객체 설정
                fetch(newSocket); // 연결 후 추가 작업 수행
            };

            newSocket.onclose = () => {
                console.log("WebSocket 연결 종료");
                setSocket(null); // 연결 종료 시 상태 업데이트
            };

            newSocket.onerror = (error) => {
                console.log("WebSocket 오류: ", error);
            };

            newSocket.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);
                console.log("받은 메시지", receivedMessage);
                
                setChat(prevChat => [...prevChat, receivedMessage]);
            };
        };

        getBeforeChat();
        connectWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [roomId, id, auth?.userId]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat]);

    const fetch = async (socket) => {
        const data = {
            roomId: roomId,
            stfNo: id
        };

        const result = await findUser(data);

        if (result === "ENTER") {
            const enterMessage = `${auth?.username}님이 입장하셨습니다.`;
            sendMessage(socket, "ENTER",enterMessage);
            await saveUser(data);
        } else if (result === "NOMAL") {
            sendMessage(socket, "NOMAL");
        }
    }; 

    const sendMessage = async (socket, msgType, message = chatMsg) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket 연결 없음');
            return;
        }

        const chatMessage = {
            roomId: roomId,
            sender: auth?.username,
            message: message,
            type: msgType,
        };

        const saveMessage = {
            roomId: roomId,
            stfNo: auth?.userId,
            stfName:auth?.username,
            message: message,
            img: auth?.userImg
        };

        try {
            await chatSave(saveMessage);
            socket.send(JSON.stringify(chatMessage));
            setChatMsg('');
        } catch (error) {
            console.error("메시지 전송 오류:", error);
        }
    };

    const emojiBoxChange = () => {
        setEmojiBoxOpen(prev => !prev);
    };

    const choseEmoji = (event) => {
        const emoji = event.target.innerText;
        emojiBoxChange();
        setChatMsg(prevChatMsg => prevChatMsg + emoji);
    };

    const updateMsg = (event) => {
        setChatMsg(event.target.value);
    };

    const toggleSettings = () => {
        setSettingsOpen(prev => !prev);
    };

    const leaveRoom = async () => {
        console.log("방 나가기");

        const data = {
            roomId: roomId,
            stfNo: id
        };

        const enterMessage1 = `${auth?.username}님이 퇴장하셨습니다.`;

        sendMessage(socket, "QUIT",enterMessage1);

        await postLeaveRoom(data);
        
        window.location.reload();

        alert("방에서 퇴장하셨습니다.");
        
    };

    const deleteRoom = async () => {
        // 방 삭제 로직 구현
        console.log("방 삭제");

        

        const data={
            roomId:roomId,
            stfNo:id
        }

        const result = await getDeleteRoom(data);

        if(result>=1){

            window.location.reload();
            alert("삭제 되었습니다.");            


        }else{
            alert("삭제에 실패하였습니다.");
        }
        
    };

    const handleAddMembers = (newMembers) => {

        console.log('새 멤버:', newMembers);//내가 추가 했던 멤버들이 여기로 들어오네

        {newMembers.map((name)=>{

            const Listname =`${name.stfName}`;
            const ListId = `${name.stfNo}`;
            const enterMessage = `${Listname}님이 입장하셨습니다.`;
            const enterImg = `${name.stfImg}`;
            
            console.log("어떤 메시지를 보낼것인가",enterMessage);
            console.log("어떤 이미지를 보낼것인가",enterImg);

            const send = async(socket)=>{

                const chatMessage = {
                    roomId: roomId,
                    sender: Listname,
                    message: enterMessage,
                    type: "ENTER",
                    img:enterImg
                };
        
                const saveMessage = {
                    roomId: roomId,
                    stfNo: ListId,
                    stfName:Listname,
                    message: enterMessage,
                    img: enterImg
                };


                try {
                    await chatSave(saveMessage);
                    socket.send(JSON.stringify(chatMessage));
                    setChatMsg('');
                } catch (error) {
                    console.error("메시지 전송 오류:", error);
                }

            }     
            
            send(socket);

        })}   
        
    };

    return (
        <>
            <div className="chatInfo" style={{ justifyContent: "space-between", padding: "20px 0", position: "relative" }}>
                <div>{roomname} 대화방</div>
                <label htmlFor="" style={{ display: "flex", cursor: "pointer" }}>
                    <span onClick={()=>setModalOpen(true)}>
                        <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                    </span>
                    <span onClick={toggleSettings}>
                        <FontAwesomeIcon icon={faGear} /> &nbsp;설정
                    </span>
                    {settingsOpen && (
                        <div className="settingsMenu" style={{ position: "absolute", top: "60px", right: 0, background: "#fff", border: "2px solid #ccc", zIndex: 1 }}>
                            {createUser===auth?.userId?(<div onClick={deleteRoom} style={{ padding: "10px 20px", cursor: "pointer" }}>방 삭제</div>):(<div onClick={leaveRoom} style={{ padding: "10px 20px", cursor: "pointer" }}>방 나가기</div>)}
                        </div>
                    )}
                </label>
            </div>

            <div className='chatRoom'>

                {beforeChat.map((msg, index) => (
                    msg.roomId === roomId && (
                        <div className='chat' key={index}>
                            {msg.img ? (
                                <img src={`${RootUrl()}/images/${msg.img}`} alt='이미지' />
                            ) : (
                                <img src="../images/iconSample3.png" alt="" />
                            )}
                            <div>
                                <p>{msg.stfName} <span>{msg.dateTime}</span></p>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    )
                ))}

                {chat.map((msg, index) => (
                    msg.roomId === roomId && msg.message!==''&& (
                        <div className='chat' key={index}>
                            {msg.img ? (
                                <img src={`${RootUrl()}/images/${msg.img}`} alt='이미지' />
                            ) : (
                                <img src="../images/iconSample3.png" alt="" />
                            )}
                            <div>
                                <p>{msg.sender} <span>{msg.rdate}</span></p>
                                <p>{msg.message}</p>
                            </div>
                        </div>
                    )
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className='inputChatBox'>
                <div className='inputChat'>
                    <span>
                        <FontAwesomeIcon icon={faFaceSmile}
                            className="chatIcon"
                            style={{ color: "#ff9100" }}
                            onClick={emojiBoxChange} />
                        {emojiBoxOpen && <EmojiBoxComponent choseEmoji={choseEmoji} />}
                    </span>

                    <textarea name="" id="" value={chatMsg}
                        ref={textareaRef}
                        onChange={updateMsg}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage(socket, 'TALK', chatMsg);
                            }
                        }}
                        ></textarea>

                    <span style={{ alignSelf: "center" }}>
                        <FontAwesomeIcon icon={faPaperPlane}
                            style={{ color: "rgb(19, 168, 174)", padding: "20px", cursor: "pointer" }}
                            onClick={() => sendMessage(socket, 'TALK',chatMsg)} />
                    </span>
                </div>
            </div>
            {modalOpen && (
                <AddChatMemberModal
                    roomId={roomId}
                    handelColseModal={() => setModalOpen(false)}
                    onAddMembers={handleAddMembers}
                />
            )}
            </>
           
    );
};

export default ChatRoomComponent;
