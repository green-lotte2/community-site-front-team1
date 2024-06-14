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

    const fetchCalendars = async () => {
        try {
            const response = await axios.get(`${RootUrl()}/calendars/all/${stfNo}`, { params: { username: stfName } });
            const allCalendars = response.data;
            console.log("Fetched Calendars:", allCalendars);
            setCalendars(allCalendars);
        } catch (error) {
            console.error("There was an error fetching the calendars!", error);
        }
    };
    
    useEffect(() => {
        if (stfNo) {
            fetchCalendars();
        }
    }, [stfNo, stfName]);

    const handelOpenModal = () => {
        setCreateCalendarRoom(true);
    };

    const handelColseModal = () => {
        setCreateCalendarRoom(false);
    };

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