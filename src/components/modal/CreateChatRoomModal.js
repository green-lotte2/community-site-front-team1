import React, { useState } from 'react'
import { postCreateRoom } from '../../api/ChatApi'
import { useNavigate } from 'react-router-dom';

const CreateChatRoomModal = ({handelColseModal, handleCreateRoom}) => {

    const [titleInfo,setTitleInfo] = useState({
        name:'',
        geust:''

    });

    const inputTitle = (e)=>{
        setTitleInfo({ ...titleInfo, [e.target.name]: e.target.value });

    }
    console.log("입력한 방 이름 : ",titleInfo.name);


    const submitHandler = async ()=>{

        try {
            await handleCreateRoom(titleInfo.name);
          
        } catch (error) {
            console.error('Error creating chat room:', error);
        }
    }

  return (
    <div className="modlaBack modalClose">
        <div className="modalBox">
            <div className="modalHeader">
                <p>대화방 생성</p>
                <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handelColseModal}>
                    X
                </p>
            </div>

            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">이름</div>
                    <div>
                        <input type="text" name="name" value ={titleInfo.name} onChange={inputTitle}/>
                    </div>
                </div>
            </div>

            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">초대</div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
            </div>

            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">목록</div>
                    <div className='inviteList'>
                        <span>홍길동</span>
                        <span>김춘추</span>
                        <span>김유신</span>
                        <span>강감찬</span>
                        <span>이순신</span>
                    </div>
                </div>
            </div>

            <div className="modalRow">
                <button className="modalClose" onClick={handelColseModal}>취소</button>
                <input type="submit" value="생성" onClick={submitHandler}/>
            </div>
        </div>
    </div>
  )
}

export default CreateChatRoomModal