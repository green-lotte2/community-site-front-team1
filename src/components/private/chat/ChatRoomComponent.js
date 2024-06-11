import { faFaceSmile, faGear, faImage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import EmojiBoxComponent from './EmojiBoxComponent';
import { getCookie} from "../../../util/cookieUtil";
import { RootUrl } from '../../../api/RootUrl';


const ChatRoomComponent = ({socket}) => {

    const [chat, setChat] = useState([]);
    const [ws, setWs] = useState(null);

    const auth = getCookie("auth");


    //로그인한 사용자의 아이디
    const id = auth?.userId;
    const name = auth?.username;
    const img = auth?.userImg;

    /** 커서 깜박이기 */
    const textareaRef = useRef(null);

    /** 커서 깜박이기 useEffect 
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []); */

    /** 이모티콘 박스 오픈 */
    const [emojiBoxOpne, setEmojiBoxOpen] = useState(false);

    const emojiBoxChange = () => {
        setEmojiBoxOpen(prev => !prev);
    }

    /** 이모티콘 선택 */
    const choseEmoji = (event) => {
        const emoji = event.target.innerText;
        emojiBoxChange();
        setChatMsg(prevChatMsg => prevChatMsg + emoji);
    }

    /** 입력한 채팅 내용 */
    const [chatMsg, setChatMsg] = useState("");

    const updateMsg = (event) => {
        if (chatMsg !== ""){
            setChatMsg(prevChatMsg => event.target.value);
        } else {
            setChatMsg(event.target.value);
        }
    }

    socket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setChat((prevChat) => [...prevChat, receivedMessage]);
    };
    

    const sendMessage = () => {
        if (ws&& chatMsg.trim() !== '') {
            const chatMessage = {
                roomId: '1dcef523-b731-48cd-9501-30a6aadd5349', 
                sender: auth?.username,
                message: chatMsg,
                type: 'TALK' 
            };
            if(!ws.onopen){
                ws = new WebSocket("ws://localhost:8080/onepie/ws");
            }
            ws.send(JSON.stringify(chatMessage));
            setChatMsg(''); 
        }

    };

    useEffect(() => {
        setWs(socket);
    }, [socket]);


  return (
    <div className="contentBox boxStyle8">
        <div className="chatInfo" style={{justifyContent:"space-between", padding:"20px 0"}}>
            <div>ㅇㅇㅇ 채팅방 이름</div>
            <label htmlFor="" style={{display:"flex"}}>
                <span>
                    <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                </span>
                <span>
                    <FontAwesomeIcon icon={faGear} /> &nbsp;설정
                </span>
            </label>
        </div>

        {/*key 속성이 있으므로 React가 리스트 요소의 변경 사항을 효율적으로 감지하고 업데이트할 수 있습니다.
            불필요한 리렌더링을 방지하여 성능이 최적화됩니다. */}

        <div className='chatRoom'>
            {chat.map((msg,index)=>(
            <div className='chat' key={index}>
                {auth?.userImg?(<img src={`${RootUrl()}/images/${auth?.userImg}`} alt='image from spring'/> ):(<img src="../images/iconSample3.png" alt="" />)}
                           
                <div>
                    <p>{msg.sender} <span>오후 12:24</span></p>
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
                        style={{color:"rgb(19, 168, 174)"}}/>
                        
                        <FontAwesomeIcon icon={faFaceSmile}
                            className="chatIcon"
                            style={{color:"#ff9100"}}
                            onClick={emojiBoxChange} />
                        {emojiBoxOpne && <EmojiBoxComponent choseEmoji={choseEmoji}/>}
                </span>

                {/*여기가 채팅을 치는 곳 */}
                <textarea name="" id="" value={chatMsg}
                    ref={textareaRef}
                    onChange={updateMsg}
                    ></textarea>

                <span style={{alignSelf:"center"}}>
                    <FontAwesomeIcon icon={faPaperPlane} 
                        style={{color:"rgb(19, 168, 174)", padding:"20px", cursor:"pointer"}} onClick={sendMessage}/>
                </span>
            </div>
        </div>
    </div>
  )
}

export default ChatRoomComponent