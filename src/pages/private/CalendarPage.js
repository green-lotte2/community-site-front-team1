import React, { useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import CalendarListComponent from '../../components/private/calendar/CalendarListComponent';
import CalendarViewComponent from '../../components/private/calendar/CalendarViewComponent';
import { RootUrl } from '../../api/RootUrl';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CalendarPage = () => {
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || "";
    const stfName = loginSlice.username || "";

    /** 캘린더 목록 */
    useEffect(() => {
        // 로그인된 사용자의 고유 캘린더 가져오기
        if (stfNo) {
            axios.get(`${RootUrl()}/calendars/user/${stfNo}`, { params: { username: stfName } })
                .then(response => {
                    const userCalendar = response.data;
                    setSelectedCalendar(userCalendar); // 기본 캘린더 설정
                })
                .catch(error => {
                    console.error("사용자 캘린더를 가져오는 중 오류가 발생했습니다!", error);
                });
        }
    }, [stfNo]); // 빈 배열을 의존 배열로 설정하여 한 번만 실행

    // 선택된 캘린더를 설정하는 함수
    const handleSelectCalendar = (calendar) => {
        setSelectedCalendar(calendar);
    };

    return (
        <MainLayout>
            <div className='chatBox'>
                <CalendarListComponent onSelectCalendar={handleSelectCalendar} />
                {selectedCalendar && <CalendarViewComponent selectedCalendar={selectedCalendar} />}
            </div>
        </MainLayout>
    );
};

export default CalendarPage;
