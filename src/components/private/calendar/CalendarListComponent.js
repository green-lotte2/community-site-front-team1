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
        axios.get(`${RootUrl()}/calendars`)
            .then(response => {
                setCalendars(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the calendars!", error);
            });
    }, []);

    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    }

    const handelColseModal = () => {
        setCreateCalendarRoom(false);
    }

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
        console.log('Selected Calendar:', calendar);
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

            <div className='CalendarList' onClick={() => handleSelectCalendar({ title: '내 캘린더', stfNo })}>
                <FontAwesomeIcon icon={faCalendar} style={{color: "#13a8ae"}} />
                <div>
                    <p>내 캘린더 ({stfNo})</p> {/* 로그인된 사용자의 고유 캘린더 */}
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
