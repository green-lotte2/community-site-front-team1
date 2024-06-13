import { faFaceSmile, faGear, faImage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import EmojiBoxComponent from './EmojiBoxComponent';
import { getCookie} from "../../../util/cookieUtil";
import { RootUrl } from '../../../api/RootUrl';
import { findUser,saveUser,chatSave } from '../../../api/ChatApi'



const ChatRoomComponent = ({socket, roomId, roomname, id,beforeMessage}) => {

    const [chat, setChat] = useState([]);
    const [ws, setWs] = useState(null);
    const [type, setType] = useState('');
   
    const auth = getCookie("auth");

    const now = new Date();
    const localDateTime = now.toLocaleString();

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


    const selectUserList = async (roomId,id)=>{

        console.log("방번호",roomId);
        console.log("사용자 아이디",id);

        const data={
            "roomId":roomId,
            "stfNo":id
        }

        try {
            const userType = await findUser(data);
            console.log('제발1 : ' + userType);

            setType(userType);

            //console.log('제발1 : ' + type);
            //console.log('제발2 : ' + num);
   
            if (userType === "TALK") {
               // console.log("지금 type의 상태", type);
               setType("TALK");
                
            } else { // type === "ENTER"
                //console.log("지금 type의 상태2", type);
                //setType("ENTER");
                sendMessage("ENTER");  
                await saveUser({id:id,roomId:roomId});//들어온 유저 저장하기                    
            }

        } catch (error) {
            console.error("findUser 호출 중 오류 발생:", error);            
        }
    }

    const sendMessage = async (msgType) => {
        //console.log("msgType - ",msgType);
        console.log("roomId - ",roomId);
        console.log("sender - ",auth?.username);
        console.log("message - ",chatMsg);
        console.log("type - ",msgType);
        
        const chatMessage = {
            roomId: roomId, 
            sender: auth?.username,
            message: chatMsg,
            type: msgType,
        };

        const saveMessage = {
            roomId: roomId,
            stfNo:auth?.userId,
            message:chatMsg  
        }

        await chatSave(saveMessage);

        ws.send(JSON.stringify(chatMessage));
        setChatMsg('');      
    };
    
    useEffect(() => {
        if (socket) {
            setWs(socket);
            socket.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);
                setChat((prevChat) => [...prevChat, receivedMessage]);
            };
        }
    }, [socket]);

    useEffect(()=>{
        console.log("roomId",roomId);
        console.log("roomName",roomname);

        if (roomId && id) {
            selectUserList(roomId, id);            
        }

    },[roomId, id]);

   
  return (
    <div className="contentBox boxStyle8">
        <div className="chatInfo" style={{justifyContent:"space-between", padding:"20px 0"}}>
            <div>{roomname} 대화방</div>
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
            {/*로그인한 객체가 본인이면 로그인한 이미지를 띄우고 본인이 아니면...? */}

        <div className='chatRoom'>
        {beforeMessage.length > 0 ? (
                beforeMessage.map((msg, index) => (
                    <div className='chat' key={index}>
                        {auth?.userImg ? (
                            <img src={`${RootUrl()}/images/${auth?.userImg}`} alt='image from spring'/>
                        ) : (
                            <img src="../images/iconSample3.png" alt='' />
                        )}
                        <div>
                            <p>
                                {msg.sender} <span>{msg.rdate}</span>
                            </p>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))
            ) : (<p>No messages available</p>)              
            
        }

            {chat.map((msg,index)=>(
            <div className='chat' key={index}>
                {auth?.userImg?(<img src={`${RootUrl()}/images/${auth?.userImg}`} alt='image from spring'/> ):(<img src="../images/iconSample3.png" alt="" />)}
                           
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
                        style={{color:"rgb(19, 168, 174)", padding:"20px", cursor:"pointer"}} onClick={()=>sendMessage('TALK')}/>
                </span>
            </div>
        </div>
    </div>
  )
}

export default ChatRoomComponent