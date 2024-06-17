import React, { useState } from 'react'
import { postCreateRoom } from '../../api/ChatApi'
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../../util/cookieUtil";

const CreateChatRoomModal = ({handleCloseModal, handleCreateRoom}) => {

    const auth = getCookie("auth");

    const [selectedItem, setSelectedItem] = useState(null);

    const [titleInfo,setTitleInfo] = useState({
        name:'',
        stfNo:auth?.userId

    });

    const inputTitle = (e)=>{
        setTitleInfo({ ...titleInfo, [e.target.name]: e.target.value });

    }
    
    console.log("입력한 방 이름 : ",titleInfo.name);


    const submitHandler = async ()=>{

        if(titleInfo.name!=null && !titleInfo.name==''){

            try {
                await handleCreateRoom(titleInfo);
            
            } catch (error) {
                console.error('Error creating chat room:', error);
            }
        }else{
            alert("방 이름을 입력해주세요!");
        }
    }

    const handleClick = (item) => {
        setSelectedItem(item);
    };

  return (
    <div className="modlaBack modalClose">
        <div className="modalBox">
            <div className="modalHeader">
                <p>대화방 생성</p>
                <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handleCloseModal}>
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
{/*
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
                    <div className="maR30">채팅방</div>
                    <div className='inviteList'>
                    <span
                        className={selectedItem === 'openChat' ? 'selected' : ''}
                        onClick={() => handleClick('openChat')}
                    >
                        오픈채팅방
                    </span>
                    <span
                        className={selectedItem === 'normalChat' ? 'selected' : ''}
                        onClick={() => handleClick('normalChat')}
                    >
                        일반채팅방
                    </span>
                    </div>
                </div>
            </div>
*/}

            <div className="modalRow">
                <button className="modalClose" onClick={handleCloseModal}>취소</button>
                <input type="submit" value="생성" onClick={submitHandler}/>
            </div>
        </div>
    </div>
  )
}

export default CreateChatRoomModal