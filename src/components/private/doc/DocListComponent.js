import { faFile, faFileCircleExclamation, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { RootUrl } from '../../../api/RootUrl';

const DocListComponent = ({docList, openDocument, loginSlice, createDoc}) => {

  return (
    <div className="contentBox boxStyle9">
        <div className="chatInfo" onClick={createDoc}>
            <img src={`${RootUrl()}/images/${loginSlice.userImg}`} alt="pro" />
            <div>
                <p>{loginSlice.username}</p>
                <p>{loginSlice.userEmail}</p>
            </div>
        </div>

        <div className='docList' onClick={createDoc}>
            <FontAwesomeIcon icon={faSquarePlus} />
            <div>
                <p>문서 생성</p>
            </div>
        </div>

        {docList && docList.map((doc, index) => (
            doc.owner === loginSlice.userId ? (
                <div className='docList' key={index} onClick={(event) => openDocument(event, doc.pno, index)}>
                    <FontAwesomeIcon icon={faFile} style={{color: "#13a8ae"}} />
                    <div>
                        <p>{doc.title}</p>
                    </div>
                </div>
            ) : (
                <div className='docList' key={index} onClick={(event) => openDocument(event, doc.pno, index)}>
                    <FontAwesomeIcon icon={faFileCircleExclamation} style={{color: "#2d65f2"}} />
                    <div>
                        <p>{doc.title}</p>
                    </div>
                </div>
            )
        ))}
    </div>
  )
}

export default DocListComponent