import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import CreateCalendarModal from '../../modal/CreateCalendarModal';
import { faCalendar, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

const CalendarListComponent = () => {

    /** 캘린더 생성 모달 관리 */
    const [createCalendarRoom, setCreateCalendarRoom] = useState(false);

    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    }

    const handelColseModal = () => {
        setCreateCalendarRoom(false);
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

        <div className='CalendarList' onClick={handelOpenModal}>
            <FontAwesomeIcon icon={faCalendarPlus} />
            <div>
                <p>캘린더 생성</p>
            </div>
        </div>

        <div className='CalendarList'>
            <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae",}} />
            <div>
                <p>홍길동님의 캘린더</p>
            </div>
        </div>
            
        <div className='CalendarList'>
            <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae",}} />
            <div>
                <p>영업2팀 캘린더</p>
            </div>
        </div>

        <div className='CalendarList'>
            <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae",}} />
            <div>
                <p>점심 멤버 캘린더</p>
            </div>
        </div>

        {createCalendarRoom && <CreateCalendarModal handelColseModal={handelColseModal}/>}

    </div>
  )
}

export default CalendarListComponent