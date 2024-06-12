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
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || "";
    const stfName = loginSlice.username || "";
    const stfEmail = loginSlice.userEmail || "";
    const stfImg = loginSlice.userImg || "";

    useEffect(() => {
        // 로그인된 사용자의 고유 캘린더 가져오기 또는 생성
        if (stfNo) {
            axios.get(`${RootUrl()}/calendars/user/${stfNo}`, { params: { username: stfName } })
                .then(response => {
                    const userCalendar = response.data;
                    setCalendars([userCalendar]);
                    onSelectCalendar(userCalendar); // 기본 캘린더 선택
                })
                .catch(error => {
                    console.error("There was an error fetching the user calendar!", error);
                });
        }
    }, []); // 빈 배열을 의존 배열로 설정하여 한 번만 실행

    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    }

    const handelColseModal = () => {
        setCreateCalendarRoom(false);
    }

    // CreateCalendarModal에서 CalendarListComponent로 데이터를 전달하기 위한 콜백 함수
    // 캘린더를 생성하고, 생성된 캘린더를 calendars 상태에 추가하는 역할
    // 즉, 생성된 캘린더를 상태에 추가하고 UI를 업데이트하는 역할
    const handleCreateCalendar = (newCalendar) => {
        axios.post(`${RootUrl()}/calendars`, newCalendar)
            .then(response => {
                setCalendars((prevCalendars) => [...prevCalendars, response.data]);
                setCreateCalendarRoom(false);
            })
            .catch(error => {
                console.error("There was an error creating the calendar!", error);
            });
    }

    const handleSelectCalendar = (calendar) => {
        onSelectCalendar(calendar);
    }

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

            {createCalendarRoom && <CreateCalendarModal handelColseModal={handelColseModal} onCreate={handleCreateCalendar} />}
        </div>
    )
}

export default CalendarListComponent;