import { faCalendar, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import CreateCalendarModal from '../../modal/CreateCalendarModal';
import { useSelector } from 'react-redux';
import { RootUrl } from '../../../api/RootUrl';
import axios from 'axios';

const CalendarListComponent = ({ onSelectCalendar }) => {
    const [createCalendarRoom, setCreateCalendarRoom] = useState(false);
    const [calendars, setCalendars] = useState([]);

    // Redux 스토어에서 사용자 정보 가져오기
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || "";
    const stfName = loginSlice.username || "";
    const stfEmail = loginSlice.userEmail || "";
    const stfImg = loginSlice.userImg || "";

    // 서버에서 캘린더 목록 가져오는 함수
    const fetchCalendars = async () => {
        try {
            const response = await axios.get(`${RootUrl()}/calendars/all/${stfNo}`, { params: { username: stfName } });
            const allCalendars = response.data;
            console.log("Fetched Calendars:", allCalendars);
            setCalendars(allCalendars);
        } catch (error) {
            console.error("캘린더를 가져오는 중 오류가 발생했습니다!", error);
        }
    };
    
    // 사용자 정보가 있을 때 캘린더 목록 가져오기
    useEffect(() => {
        if (stfNo) {
            fetchCalendars();
        }
    }, [stfNo, stfName]);

    // 새로운 캘린더 생성 모달 열기
    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    };

    // 새로운 캘린더 생성 모달 닫기
    const handelColseModal = () => {
        setCreateCalendarRoom(false);
    };

    // 새로운 캘린더 생성 처리
    const handleCreate = (newCalendar) => {
        setCalendars((prevCalendars) => {
            const isAlreadyExist = prevCalendars.some(calendar => calendar.calendarId === newCalendar.calendarId);
            if (!isAlreadyExist) {
                return [...prevCalendars, newCalendar];
            }
            return prevCalendars;
        });
        onSelectCalendar(newCalendar);
    };

    // 캘린더 선택 처리
    const handleSelectCalendar = (calendar) => {
        onSelectCalendar(calendar);
    };

    return (
        <div className="contentBox boxStyle9">
            <div className="chatInfo">
                <img src={stfImg ? `${RootUrl()}/images/${stfImg}` : "../images/iconSample3.png"} alt="pro"/>
                <div>
                    <p>{stfName}</p>
                    <p>{stfEmail}</p>
                </div>
            </div>

            <div className='CalendarList' onClick={handelOpenModal}>
                <FontAwesomeIcon icon={faCalendarPlus} />
                <div>
                    <p>캘린더 생성</p>
                </div>
            </div>

            {calendars.map((calendar, index) => (
                <div key={index} className='CalendarList' onClick={() => handleSelectCalendar(calendar)}>
                    <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae"}} />
                    <div>
                        <p>{calendar.title}</p>
                    </div>
                </div>
            ))}

            {createCalendarRoom && <CreateCalendarModal handelColseModal={handelColseModal} onCreate={handleCreate} />}
        </div>
    );
}

export default CalendarListComponent;
