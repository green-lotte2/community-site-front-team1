import { faFaceSmile, faGear, faImage, faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import EmojiBoxComponent from './EmojiBoxComponent';

const ChatRoomComponent = () => {

    /** 커서 깜박이기 */
    const textareaRef = useRef(null);

    /** 커서 깜박이기 useEffect */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []); 

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

        <div className='chatRoom'>
            <div className='chat'>
                <img src="../images/iconSample3.png" alt="" />
                <div>
                    <p>홍길동 <span>오후 12:24</span></p>
                    <p>오늘 점심 뭐먹어요?</p>
                </div>
            </div>

            <div className='chat'>
                <img src="../images/iconSample3.png" alt="" />
                <div>
                    <p>김유신 <span>오후 12:25</span></p>
                    <p>돈가스 국밥</p>
                </div>
            </div>

            <div className='chat'>
                <img src="../images/iconSample3.png" alt="" />
                <div>
                    <p>홍길동 <span>오후 12:26</span></p>
                    <p>어제 먹었잔슴..</p>
                </div>
            </div>
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

                <textarea name="" id="" value={chatMsg}
                    ref={textareaRef}
                    onChange={updateMsg}
                    ></textarea>

                <span style={{alignSelf:"center"}}>
                    <FontAwesomeIcon icon={faPaperPlane} 
                        style={{color:"rgb(19, 168, 174)", padding:"20px", cursor:"pointer"}} />
                </span>
            </div>
        </div>
    </div>
  )
}

export default ChatRoomComponent