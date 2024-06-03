import React from 'react'
import MainLayout from '../../layout/MainLayout'
import CalendarListComponent from '../../components/private/calendar/CalendarListComponent'
import CalendarViewComponent from '../../components/private/calendar/CalendarViewComponent'

const CalendarPage = () => {
  return (
    <MainLayout>
        <div className='chatBox'>
            
            {/** 캘린더 list */}
            <CalendarListComponent></CalendarListComponent>
            {/** 캘린더 view */}
            <CalendarViewComponent></CalendarViewComponent>
        </div>
        
    </MainLayout>
  )
}

export default CalendarPage