import { faFaceSmile, faGear, faImage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import EmojiBoxComponent from './EmojiBoxComponent';
import { getCookie } from "../../../util/cookieUtil";
import { RootUrl } from '../../../api/RootUrl';
import { findUser, saveUser, chatSave } from '../../../api/ChatApi';

const ChatRoomComponent = ({ socket, roomId, roomname, id }) => {
    const [chat, setChat] = useState([]);
    const [ws, setWs] = useState(null);
    const auth = getCookie("auth");
    const textareaRef = useRef(null);
    const [emojiBoxOpne, setEmojiBoxOpen] = useState(false);
    const [chatMsg, setChatMsg] = useState("");

    const emojiBoxChange = () => {
        setEmojiBoxOpen(prev => !prev);
    };

    const choseEmoji = (event) => {
        const emoji = event.target.innerText;
        emojiBoxChange();
        setChatMsg(prevChatMsg => prevChatMsg + emoji);
    };

    const updateMsg = (event) => {
        if (chatMsg !== "") {
            setChatMsg(prevChatMsg => event.target.value);
        } else {
            setChatMsg(event.target.value);
        }
    };

    const selectUserList = async (roomId, id) => {
        console.log("방번호", roomId);
        console.log("사용자 아이디", id);

        const data = {
            "roomId": roomId,
            "stfNo": id
        };

        try {
            const userType = await findUser(data);
            console.log('findeUser 결과값 : ' + userType);

            if (userType === "TALK") {
                // 특정 로직 수행
            } else {
                console.log("제일 처음 여기로 들어와야해. ENTER값")
                sendMessage("ENTER");
                await saveUser({ id: id, roomId: roomId });
            }
        } catch (error) {
            console.error("findUser 호출 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        if (socket) {
            setWs(socket);
            console.log("1번 입니다.");
        }
    }, [socket]);


    useEffect(() => {
        const fetchData = async () => {
            if (roomId && id) {
                console.log("2번 입니다.");
                await selectUserList(roomId, id);            
            }
        };

        fetchData();
    }, [roomId, id]);



    useEffect(() => {
        console.log("3번 입니다.");
        if (ws) {
            console.log("4번 입니다.");
            ws.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);
                setChat(prevChat => [...prevChat, receivedMessage]);
            };
        }
        console.log("5번 입니다.");
    }, [ws]);

    const sendMessage = async (msgType) => {
        console.log("roomId - ", roomId);
        console.log("sender - ", auth?.username);
        console.log("message - ", chatMsg);
        console.log("type - ", msgType);

        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection not established');
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
            ws.send(JSON.stringify(chatMessage));
            setChatMsg('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
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
                            <img src={`${RootUrl()}/images/${auth?.userImg}`} alt='image from spring' />
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
                        {emojiBoxOpne && <EmojiBoxComponent choseEmoji={choseEmoji} />}
                    </span>

                    <textarea name="" id="" value={chatMsg}
                        ref={textareaRef}
                        onChange={updateMsg}></textarea>

                    <span style={{ alignSelf: "center" }}>
                        <FontAwesomeIcon icon={faPaperPlane}
                            style={{ color: "rgb(19, 168, 174)", padding: "20px", cursor: "pointer" }}
                            onClick={() => sendMessage('TALK')} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomComponent;
