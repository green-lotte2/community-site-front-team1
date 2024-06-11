import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import CalendarListComponent from '../../components/private/calendar/CalendarListComponent';
import CalendarViewComponent from '../../components/private/calendar/CalendarViewComponent';

const CalendarPage = () => {
    const [selectedCalendar, setSelectedCalendar] = useState(null);

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
