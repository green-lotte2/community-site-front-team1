import { faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const DocListComponent = () => {

    /** 문서 생성 모달 관리 */
    const [openCreateDoc, setOpenCreateDoc] = useState(false);

    const handelOpenModal = () => {
        setOpenCreateDoc(true);
    }

    const handelColseModal = () => {
        setOpenCreateDoc(false);
    }

  return (
    <div className="contentBox boxStyle9">
        <div className="chatInfo">
            <img src="../images/iconSample3.png" alt="pro" />
            <div>
                <p>홍길동</p>
                <p>abcd1234@gmail.com</p>
            </div>
        </div>

        <div className='docList' onClick={handelOpenModal}>
            <FontAwesomeIcon icon={faSquarePlus} />
            <div>
                <p>문서 생성</p>
            </div>
        </div>

        <div className='docList'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
            <div>
                <p>문서 목록</p>
            </div>
        </div>
            
        <div className='docList'>
            <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
            <div>
                <p>문서 목록</p>
            </div>
        </div>

        {/**{openCreateChatRoom && <CreateChatRoomModal handelColseModal={handelColseModal}/>} */}

    </div>
  )
}

export default DocListComponent