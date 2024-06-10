import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DocWriteComponent = () => {
  return (
    <div className="contentBox boxStyle8">
        <div className="chatInfo" style={{justifyContent:"space-between", padding:"20px 0"}}>
            <div>문서 이름</div>
            <label htmlFor="" style={{display:"flex"}}>
                <span>
                    <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                </span>
                <span>
                    <FontAwesomeIcon icon={faGear} /> &nbsp;설정
                </span>
            </label>
        </div>

        <div>
            
        </div>

    </div>
  )
}

export default DocWriteComponent