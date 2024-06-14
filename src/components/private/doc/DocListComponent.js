import { faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { RootUrl } from '../../../api/RootUrl';

const DocListComponent = ({docList, openDocument, loginSlice}) => {

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
            <img src={`${RootUrl()}/images/${loginSlice.userImg}`} alt="pro" />
            <div>
                <p>{loginSlice.username}</p>
                <p>{loginSlice.userEmail}</p>
            </div>
        </div>

        <div className='docList' onClick={handelOpenModal}>
            <FontAwesomeIcon icon={faSquarePlus} />
            <div>
                <p>문서 생성</p>
            </div>
        </div>

        {docList && docList.map((doc, index) => (
            <div className='docList' onClick={() => openDocument(doc.pno)}>
                <FontAwesomeIcon icon={faMessage} style={{color: "#13a8ae",}} />
                <div>
                    <p>{doc.title}</p>
                </div>
            </div>
        ))}

        {/**{openCreateChatRoom && <CreateChatRoomModal handelColseModal={handelColseModal}/>} */}

    </div>
  )
}

export default DocListComponent