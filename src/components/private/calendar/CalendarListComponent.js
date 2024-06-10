import { faCalendar, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CreateCalendarModal from '../../modal/CreateCalendarModal';
import { useSelector } from 'react-redux';

const CalendarListComponent = () => {

    /** 캘린더 생성 모달 관리 */
    const [createCalendarRoom, setCreateCalendarRoom] = useState(false);
    const [calendars, setCalendars] = useState([]); // 생성된 캘린더들을 관리하는 상태

    const loginSlice = useSelector((state) => state.loginSlice) || {}; // 안전한 접근 방법
    const stfNo = loginSlice.userId || "";

    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    }

    const handelColseModal = () => {
        setCreateCalendarRoom(false);
    }

    const handleCreateCalendar = (newCalendar) => {
        setCalendars((prevCalendars) => [...prevCalendars, newCalendar]);
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
                <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae"}} />
                <div>
                    <p>내 캘린더 ({stfNo})</p> {/* 로그인된 사용자의 고유 캘린더 */}
                </div>
            </div>

            {calendars.map((calendar, index) => (
                <div key={index} className='CalendarList'>
                    <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae"}} />
                    <div>
                        <p>{calendar.title}</p>
                    </div>
                </div>
            ))}

            {createCalendarRoom && <CreateCalendarModal handelColseModal={handelColseModal} onCreate={handleCreateCalendar} />}

        </div>
    )
}

export default CalendarListComponent;
