import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faGear, faImage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import EmojiBoxComponent from './EmojiBoxComponent';
import { getCookie } from "../../../util/cookieUtil";
import { RootUrl } from '../../../api/RootUrl';
import { SoketUrl } from '../../../api/RootUrl';
import { findUser, saveUser, chatSave } from '../../../api/ChatApi';

const ChatRoomComponent = ({ roomId, roomname, id }) => {
    const [chat, setChat] = useState([]);
    const [socket, setSocket] = useState(null); // WebSocket 객체 상태 추가
    const auth = getCookie("auth");

    const textareaRef = useRef(null);
    const [emojiBoxOpen, setEmojiBoxOpen] = useState(false);
    const [chatMsg, setChatMsg] = useState("");

    useEffect(() => {
        if (!roomId || !id) return;

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

        connectWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [roomId, id, auth?.userId]);

    const fetch = async (socket) => {
        const data = {
            roomId: roomId,
            stfNo: id
        };

        const result = await findUser(data);

        if (result === "ENTER") {
            sendMessage(socket, "ENTER");
            await saveUser(data);
        }
    };

    const sendMessage = async (socket, msgType) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket 연결 없음');
            return;
        }

        const chatMessage = {
            roomId: roomId,
            sender: auth?.username,
            message: chatMsg,
            type: msgType,
        };

        const saveMessage = {
            roomId: roomId,
            stfNo: auth?.userId,
            message: chatMsg
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

    return (
        <div className="contentBox boxStyle8">
            <div className="chatInfo" style={{ justifyContent: "space-between", padding: "20px 0" }}>
                <div>{roomname} 대화방</div>
                <label htmlFor="" style={{ display: "flex" }}>
                    <span>
                        <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faGear} /> &nbsp;설정
                    </span>
                </label>
            </div>

            <div className='chatRoom'>
                {chat.map((msg, index) => (
                    <div className='chat' key={index}>
                        {auth?.userImg ? (
                            <img src={`${RootUrl()}/images/${auth?.userImg}`} alt='이미지' />
                        ) : (
                            <img src="../images/iconSample3.png" alt="" />
                        )}
                        <div>
                            <p>{msg.sender} <span>{msg.rdate}</span></p>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='inputChatBox'>
                <div className='inputChat'>
                    <span>
                        <FontAwesomeIcon icon={faImage}
                            className="chatIcon"
                            style={{ color: "rgb(19, 168, 174)" }} />

                        <FontAwesomeIcon icon={faFaceSmile}
                            className="chatIcon"
                            style={{ color: "#ff9100" }}
                            onClick={emojiBoxChange} />
                        {emojiBoxOpen && <EmojiBoxComponent choseEmoji={choseEmoji} />}
                    </span>

                    <textarea name="" id="" value={chatMsg}
                        ref={textareaRef}
                        onChange={updateMsg}></textarea>

                    <span style={{ alignSelf: "center" }}>
                        <FontAwesomeIcon icon={faPaperPlane}
                            style={{ color: "rgb(19, 168, 174)", padding: "20px", cursor: "pointer" }}
                            onClick={() => sendMessage(socket, 'TALK')} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomComponent;
