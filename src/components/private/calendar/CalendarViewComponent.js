import React, { useEffect, useRef, useState } from 'react';
import { faGear, faSquarePlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '300px',
    padding: '20px',
  },
};

const CalendarViewComponent = () => {
  const calendarRef = useRef(null);
  const [calendarInstance, setCalendarInstance] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventStart, setNewEventStart] = useState('');
  const [newEventEnd, setNewEventEnd] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEventCalendarId, setSelectedEventCalendarId] = useState(null);

  useEffect(() => {
    const container = calendarRef.current;
    const calendar = new Calendar(container, {
      defaultView: 'month',
      usageStatistics: false,
      useDetailPopup: false,
      useCreationPopup: false,
    });

    // 날짜 더블 클릭 이벤트 핸들러
    container.addEventListener('dblclick', (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const date = calendar.getDate(new Date().toString(), { x, y });

      if (date) {
        const start = new Date(date);
        const end = new Date(start);
        end.setHours(end.getHours() + 1);
        setNewEventTitle('');
        setNewEventStart(start.toISOString().slice(0, 16));
        setNewEventEnd(end.toISOString().slice(0, 16));
        setIsEditMode(false);
        setIsModalOpen(true);
      }
    });

    // 일정 클릭 이벤트 핸들러
    calendar.on('clickEvent', (event) => {
      const { id, calendarId, title, start, end } = event.event;
      setSelectedEventId(id);
      setSelectedEventCalendarId(calendarId);
      setNewEventTitle(title);
      setNewEventStart(new Date(start).toISOString().slice(0, 16));
      setNewEventEnd(new Date(end).toISOString().slice(0, 16));
      setIsEditMode(true);
      setIsModalOpen(true);
    });

    setCalendarInstance(calendar);

    return () => {
      calendar.destroy();
    };
  }, []);

  useEffect(() => {
    if (calendarInstance) {
      calendarInstance.setDate(currentDate);
    }
  }, [currentDate, calendarInstance]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getFormattedDate = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  const handleAddEvent = () => {
    if (calendarInstance) {
      calendarInstance.createEvents([
        {
          id: String(new Date().getTime()),
          calendarId: '1',
          title: newEventTitle,
          category: 'time',
          start: newEventStart,
          end: newEventEnd,
        },
      ]);
      setIsModalOpen(false);
    }
  };

  const handleEditEvent = () => {
    if (calendarInstance && selectedEventId && selectedEventCalendarId) {
      calendarInstance.updateEvent(selectedEventId, selectedEventCalendarId, {
        title: newEventTitle,
        start: newEventStart,
        end: newEventEnd,
      });
      setIsModalOpen(false);
    }
  };

  const handleDeleteEvent = () => {
    if (calendarInstance && selectedEventId && selectedEventCalendarId) {
      calendarInstance.deleteEvent(selectedEventId, selectedEventCalendarId);
      setIsModalOpen(false);
    }
  };

  const handleEventStartChange = (e) => {
    const newStartDate = e.target.value;
    setNewEventStart(newStartDate);

    // 종료일이 시작일보다 이전이면 종료일을 시작일로 설정
    if (newEventEnd < newStartDate) {
      setNewEventEnd(newStartDate);
    }
  };

  const handleEventEndChange = (e) => {
    const newEndDate = e.target.value;

    // 종료일이 시작일보다 이전이면 종료일을 시작일로 설정
    if (newEndDate < newEventStart) {
      setNewEventEnd(newEventStart);
    } else {
      setNewEventEnd(newEndDate);
    }
  };

  return (
    <div className="contentBox boxStyle8">
      <div className="chatInfo" style={{ justifyContent: 'space-between', padding: '20px 0' }}>
        <div>ㅇㅇㅇ 채팅방 이름</div>
        <label htmlFor="" style={{ display: 'flex' }}>
          <span>
            <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
          </span>
          <span>
            <FontAwesomeIcon icon={faGear} /> &nbsp;설정
          </span>
        </label>
      </div>

      <div className="chatRoom">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
          <button onClick={goToPrevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>{getFormattedDate()}</span>
          <button onClick={goToNextMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div ref={calendarRef} id="calendar" style={{ height: '600px' }}></div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={modalStyles} contentLabel="Add/Edit Event">
        <h3>{isEditMode ? '일정 수정' : '일정 추가'}</h3>
        <input
          type="text"
          placeholder="일정 제목"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        /><br />
        <input
          type="datetime-local"
          placeholder="시작 시간"
          value={newEventStart}
          onChange={handleEventStartChange}
        /><br />
        <input
          type="datetime-local"
          placeholder="종료 시간"
          value={newEventEnd}
          onChange={handleEventEndChange}
          min={newEventStart}
        /><br />
        <button onClick={isEditMode ? handleEditEvent : handleAddEvent}>
          {isEditMode ? '일정 수정' : '일정 추가'}
        </button>
        {isEditMode && <button onClick={handleDeleteEvent}>일정 삭제</button>}
        <button onClick={() => setIsModalOpen(false)}>닫기</button>
      </Modal>
    </div>
  );
};

export default CalendarViewComponent;
