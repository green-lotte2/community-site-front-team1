import { faCalendar, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import CreateCalendarModal from '../../modal/CreateCalendarModal';
import { useSelector } from 'react-redux';
import { RootUrl } from '../../../api/RootUrl';
import axios from 'axios';

const CalendarListComponent = ({ onSelectCalendar, defaultCalendar }) => {
    const [createCalendarRoom, setCreateCalendarRoom] = useState(false);
    const [calendars, setCalendars] = useState([]);

    // Redux에서 로그인 정보를 가져옴
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || "";
    const stfName = loginSlice.username || "";
    const stfEmail = loginSlice.userEmail || "";
    const stfImg = loginSlice.userImg || "";

    // 로그인된 사용자의 모든 캘린더를 가져오는 함수
    const fetchCalendars = async () => {
        try {
            const response = await axios.get(`${RootUrl()}/calendars/all/${stfNo}`, { params: { username: stfName } });
            const allCalendars = response.data;
            setCalendars(allCalendars);
            if (defaultCalendar) {
                onSelectCalendar(allCalendars[0]); // 기본 캘린더를 선택된 상태로 설정
            }
        } catch (error) {
            console.error("캘린더를 불러오는 중 오류가 발생했습니다!", error);
        }
    };

    // 컴포넌트가 마운트될 때와 stfNo 또는 stfName이 변경될 때 캘린더를 불러옴
    useEffect(() => {
        if (stfNo) {
            fetchCalendars();
        }
    }, [stfNo, stfName]);

    // 캘린더 생성 모달을 여는 함수
    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    };

    // 캘린더 생성 모달을 닫는 함수
    const handelColseModal = () => {
        setCreateCalendarRoom(false);
    };

    // 캘린더 생성 시 호출되는 함수
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

    // 캘린더 선택 시 호출되는 함수
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