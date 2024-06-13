import React, { useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "moment";
import "moment/locale/ko";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FaCalendarAlt, FaCalendarWeek } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { RootUrl } from '../../../api/RootUrl';

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CalendarViewComponent = ({ selectedCalendar }) => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [error, setError] = useState("");
  const loginSlice = useSelector((state) => state.loginSlice) || {};

  useEffect(() => {
    if (!selectedCalendar) return;

    console.log("Selected calendar:", selectedCalendar);

    const container = calendarRef.current;
    const options = {
      defaultView: "month",
      isReadOnly: false,
      timezone: {
        zones: [
          {
            timezoneName: "Asia/Seoul",
            displayLabel: "Seoul",
          },
        ],
      },
      calendars: [
        { id: "1", name: "개인업무" },
        { id: "2", name: "회의" },
        { id: "3", name: "미팅" },
        { id: "4", name: "다이어리" },
        { id: "5", name: "미정" },
      ],
      useDetailPopup: true, // 이벤트 상세 팝업 사용
      useFormPopup: true,
    };

    const calendar = new Calendar(container, options);
    calendarInstance.current = calendar;

    calendar.setOptions({
      month: {
        isAlways6Weeks: false,
      },
    });

    const url = RootUrl();

    const fetchEvents = async () => {
      try {
        const response = await axios.post(`${url}/events/selects`, { calendarId: selectedCalendar.calendarId });
        console.log("Events fetched:", response.data);
        response.data.forEach((event) => {
          const newEvent = {
            id: event.eventNo, // 고유 식별자로 eventNo 사용
            calendarId: event.calendarId,
            eventId: event.eventId,
            title: event.title,
            start: Moment(event.start).format("YYYY-MM-DD[T]HH:mm:ss"),
            end: Moment(event.end).format("YYYY-MM-DD[T]HH:mm:ss"),
            location: event.location,
            state: event.state,
            isReadOnly: event.isReadOnly,
            isAllDay: event.isAllDay,
            backgroundColor: event.backgroundColor || getRandomColor(),
            color: event.color || "#000000",
          };

          console.log("Adding event:", newEvent);

          calendar.createEvents([newEvent]);
        });
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("일정을 불러오지 못했습니다.");
      }
    };

    fetchEvents();

    calendar.on("beforeCreateEvent", async (event) => {
      const calendarId = selectedCalendar.calendarId;
      const eventType = options.calendars.find(cal => cal.id === event.calendarId)?.id || "defaultEventId";
  
      const newEvent = {
          eventId: eventType,  // 이벤트 종류 ID 설정
          calendarId,
          title: event.title,
          start: Moment(event.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss"),
          end: Moment(event.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss"),
          location: event.location,
          state: event.state,
          isReadOnly: false,
          isAllDay: event.isAllDay,
          backgroundColor: getRandomColor(),
          color: "#FFFFFF",
          stfNo: loginSlice.userId // 작성자 정보 추가
      };
      console.log("Creating new event:", newEvent);
  
      try {
          const response = await axios.post(`${url}/events/insert`, newEvent);
          const createdEvent = response.data;
          newEvent.eventNo = createdEvent.eventNo; // 백엔드에서 생성된 eventNo를 받아서 설정
          calendar.createEvents([newEvent]);
          console.log("Event inserted successfully");
      } catch (err) {
          console.error("Failed to insert event:", err);
          setError("일정이 저장되지 않았습니다.");
      }
  });
    

    calendar.on("beforeUpdateEvent", async ({ event, changes }) => {
      // 수정 권한 체크
      if (selectedCalendar.ownerStfNo !== loginSlice.userId && 
          !selectedCalendar.members.some(member => member.stfNo === loginSlice.userId)) {
        alert("이벤트를 수정할 권한이 없습니다.");
        return;
      }

      const calendarId = changes.calendarId || event.calendarId;
      const start = changes.start ? Moment(changes.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss") : event.start;
      const end = changes.end ? Moment(changes.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss") : event.end;

      const updatedEvent = {
        eventNo: event.id,  // 고유 식별자로 event.id 사용
        calendarId,
        title: changes.title || event.title,
        location: changes.location || event.location,
        start,
        end,
        state: changes.state || event.state,
        isAllDay: changes.isAllDay !== undefined ? changes.isAllDay : event.isAllDay,
        isReadOnly: changes.isReadOnly !== undefined ? changes.isReadOnly : event.isReadOnly,
        backgroundColor: changes.backgroundColor || event.backgroundColor || getRandomColor(),
        color: changes.color || event.color || "#FFFFFF",
        stfNo: loginSlice.userId // 수정한 사람의 ID로 업데이트
      };

      console.log("Updating event:", updatedEvent);

      try {
        await axios.post(`${url}/events/modify/${event.id}`, updatedEvent);
        console.log("Event updated successfully");
        calendar.updateEvent(event.id, updatedEvent);
      } catch (err) {
        console.error("Failed to update event:", err);
      }
    });

    calendar.on("beforeDeleteEvent", async (event) => {
      // 삭제 권한 체크
      if (selectedCalendar.ownerStfNo !== loginSlice.userId && 
          !selectedCalendar.members.some(member => member.stfNo === loginSlice.userId)) {
        alert("이벤트를 삭제할 권한이 없습니다.");
        return;
      }

      const calendarId = event.calendarId;
      calendar.deleteEvent(event.id, calendarId);
      try {
        await axios.get(`${url}/events/delete?eventNo=${event.id}`); // 수정
        console.log("Event deleted successfully");
      } catch (err) {
        console.error("Failed to delete event:", err);
      }
    });

    calendar.setTheme({
      month: {
        startDayOfWeek: 0,
        format: "YYYY-MM",
      },
      week: {
        startDayOfWeek: 0,
        showTimezoneCollapseButton: true,
        timezonesCollapsed: true,
      },
      common: {
        holiday: {
          color: "rgba(255, 0, 0, 1)",
        },
        today: {
          color: "#fff",
          backgroundColor: "blue",
        },
        saturday: {
          color: "rgba(0, 0, 255, 1)",
        },
      },
    });

    setCurrentMonth(calendar.getDate().getMonth() + 1);
    setCurrentYear(calendar.getDate().getFullYear());

    return () => {
      if (calendarInstance.current) {
        calendarInstance.current.destroy();
      }
    };
  }, [selectedCalendar]);

  const handleClickNextButton = () => {
    calendarInstance.current.next();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  const handleClickPrevButton = () => {
    calendarInstance.current.prev();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  const weekChangeButton = () => {
    calendarInstance.current.changeView("week");
  };

  const monthChangeButton = () => {
    calendarInstance.current.changeView("month");
  };

  const goToday = () => {
    calendarInstance.current.today();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  const buttonStyle = {
    borderRadius: "25px",
    border: "2px solid #ddd",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
  };

  const btnToday = {
    borderRadius: "25px",
    border: "2px solid #ddd",
    padding: "0 16px",
    lineHeight: "30px",
    fontWeight: "700",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
  };

  const btnMoveStyle = {
    border: "1px solid #ddd",
    borderRadius: "25px",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
  };

  const dateSpan = {
    fontSize: "19px",
    lineHeight: "30px",
    verticalAlign: "bottom",
    marginLeft: "7px",
  };

  return (
    <div className="contentBox boxStyle8">
      <div className="chatInfo" style={{ justifyContent: "space-between", padding: "20px 0" }}>
        <div>{selectedCalendar.title} 채팅방</div>
        <label htmlFor="" style={{ display: "flex" }}>
          <span>
            <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
          </span>
          <span>
            <FontAwesomeIcon icon={faGear} /> &nbsp;설정
          </span>
        </label>
      </div>

      <div className="chatRoom">
        <span style={dateSpan}>
          {currentYear}.{currentMonth}
        </span>
        <div style={{ marginBottom: "10px" }}>
          <button style={buttonStyle} onClick={monthChangeButton}>
            <FaCalendarAlt style={{ marginRight: "5px" }} /> Month
          </button>
          <button style={buttonStyle} onClick={weekChangeButton}>
            <FaCalendarWeek style={{ marginRight: "5px" }} /> Week
          </button>
          <button style={btnMoveStyle} onClick={handleClickPrevButton}>
            <GrFormPrevious />
          </button>
          <button style={btnToday} onClick={goToday}>
            today
          </button>
          <button style={btnMoveStyle} onClick={handleClickNextButton}>
            <MdNavigateNext />
          </button>
        </div>
        <div ref={calendarRef} style={{ width: "100%", height: "600px" }} />
      </div>
    </div>
  );
};

export default CalendarViewComponent;
