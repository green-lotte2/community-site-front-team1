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
import { faSquarePlus, faDoorOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaCalendarAlt, FaCalendarWeek } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { RootUrl } from '../../../api/RootUrl';
import AddCalendarMemberModal from '../../modal/AddCalendarMemberModal'; // 모달 컴포넌트 임포트
import { boxSizing, height, width } from "@mui/system";
import { h } from "@fullcalendar/core/preact.js";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

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
      useFormPopup: true, // 폼 팝업 사용
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
        console.error("이벤트를 불러오지 못했습니다.", err);
        setError("일정을 불러오지 못했습니다.");
      }
    };

    fetchEvents();

    // 새로운 이벤트 생성 전에 호출되는 핸들러
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
        newEvent.id = createdEvent.eventNo; // 백엔드에서 생성된 eventNo를 받아서 설정
        calendar.createEvents([newEvent]);
        console.log("이벤트가 성공적으로 추가되었습니다.");

      } catch (err) {
        console.error("이벤트를 추가하지 못했습니다.", err);
        setError("일정이 저장되지 않았습니다.");
      }
    });
    
    // 이벤트 수정 전에 호출되는 핸들러
    calendar.on("beforeUpdateEvent", async ({ event, changes }) => {
      // 수정 권한 체크
      if (selectedCalendar.ownerStfNo !== loginSlice.userId && 
          !selectedCalendar.members.some(member => member.stfNo === loginSlice.userId)) {
        alert("이벤트를 수정할 권한이 없습니다.");
        return;
      }
    
      // 기존 calendarId를 유지하거나 변경된 값 설정
      const calendarId = changes.calendarId || event.calendarId;
    
      // TZDate 객체를 처리하여 문자열로 변환
      const start = changes.start ? Moment(changes.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss") : Moment(event.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss");
      const end = changes.end ? Moment(changes.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss") : Moment(event.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss");
    
      // 모든 필드를 업데이트
      const updatedEvent = {
        eventNo: event.id,
        calendarId,
        eventId: changes.eventId !== undefined ? changes.eventId : event.eventId, // 변경된 eventId 또는 기존 eventId 유지
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
        console.log("이벤트가 성공적으로 업데이트되었습니다.");

        // 캘린더 인스턴스에서 이벤트 업데이트
        calendar.updateEvent(event.id, event.calendarId, {
          ...event,
          ...changes,
          start: new Date(start),
          end: new Date(end),
        });

      } catch (err) {
        console.error("이벤트를 업데이트하지 못했습니다.", err);
        setError("일정이 저장되지 않았습니다.");
      }
    });
    
    // 이벤트 삭제 전에 호출되는 핸들러
    calendar.on("beforeDeleteEvent", async (event) => {
      // 삭제 권한 체크
      if (selectedCalendar.ownerStfNo !== loginSlice.userId && 
          !selectedCalendar.members.some(member => member.stfNo === loginSlice.userId)) {
        alert("이벤트를 삭제할 권한이 없습니다.");
        return;
      }

      const calendarId = event.calendarId;
      try {
        const response = await axios.get(`${url}/events/delete?eventNo=${event.id}`); // 수정
        if(response.status === 200){
          calendar.deleteEvent(event.id, calendarId);
          console.log("이벤트가 성공적으로 삭제되었습니다.");
        }
      } catch (err) {
        console.error("이벤트를 삭제하지 못했습니다.", err);
      }
    });

    // 캘린더 테마 설정
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

  // 다음 달 버튼 클릭 핸들러
  const handleClickNextButton = () => {
    calendarInstance.current.next();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  // 이전 달 버튼 클릭 핸들러
  const handleClickPrevButton = () => {
    calendarInstance.current.prev();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  // 주간 보기로 변경
  const weekChangeButton = () => {
    calendarInstance.current.changeView("week");
  };

  // 월간 보기로 변경
  const monthChangeButton = () => {
    calendarInstance.current.changeView("month");
  };

  // 오늘 날짜로 이동
  const goToday = () => {
    calendarInstance.current.today();
    setCurrentMonth(calendarInstance.current.getDate().getMonth() + 1);
    setCurrentYear(calendarInstance.current.getDate().getFullYear());
  };

  // 버튼 스타일 정의
  const buttonStyle = {
    height:"30px",
    width:"90px",
    borderRadius: "10px",
    border: "2px solid #ddd",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
    boxSizing:"border-box",
    cursor:"pointer",
  };

  const btnToday = {
    height: "30px",
    borderRadius: "10px",
    border: "2px solid #ddd",
    padding: "0 16px",
    fontWeight: "700",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
    boxSizing:"border-box",
    cursor:"pointer",
  };

  const btnMoveStyle = {
    height:"28px",
    width:"16px",
    border: "2px solid #ddd",
    borderRadius: "25px",
    fontSize: "15px",
    color: "#333",
    marginRight: "5px",
    boxSizing:"border-box",
    cursor:"pointer",
  };

  const dateSpan = {
    fontSize: "19px",
    lineHeight: "30px",
    verticalAlign: "bottom",
    marginLeft: "7px",
  };

  // 멤버 추가 버튼 클릭 핸들러
  const handleAddMembersClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 모달에서 멤버 추가 후 핸들러
  const handleAddMembers = (newMembers) => {
    // 여기서 새로운 멤버를 처리하는 로직을 추가할 수 있습니다.
    alert("멤버가 추가되었습니다."); // 멤버 추가 시 alert
    console.log("Added members:", newMembers);
    setIsModalOpen(false);
  };

// 나가기 또는 삭제 버튼 클릭 핸들러
const handleLeaveOrDeleteCalendar = async () => {
  if (selectedCalendar.ownerStfNo === loginSlice.userId) {
    // 방 삭제
    const confirmDelete = window.confirm("정말로 이 캘린더를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${RootUrl()}/calendars/${selectedCalendar.calendarId}`);
        if (response.status === 200 || response.status === 204) { // 성공 시 status code 204일 수도 있습니다.
          alert("캘린더가 삭제되었습니다."); // 삭제 시 alert
          console.log("Successfully deleted the calendar");
          window.location.reload(); // 화면 새로고침
        } else {
          throw new Error("Failed to delete the calendar"); // 상태 코드가 200 또는 204가 아닌 경우 오류 처리
        }
      } catch (err) {
        console.error("캘린더를 삭제하는 데 실패했습니다.", err);
        alert("캘린더를 삭제하는 데 실패했습니다."); // 삭제 실패 시 alert
      }
    }
  } else {
    // 방 나가기
    const confirmLeave = window.confirm("정말로 이 캘린더에서 나가시겠습니까?");
    if (confirmLeave) {
      try {
        const response = await axios.delete(`${RootUrl()}/calendarMembers/leave`, {
          data: {
            calendarId: selectedCalendar.calendarId,
            stfNo: loginSlice.userId,
          },
        });

        if (response.status === 200) {
          alert("캘린더에서 나갔습니다."); // 나가기 시 alert
          console.log("Successfully left the calendar");
          window.location.reload(); // 화면 새로고침
        } else {
          throw new Error("Failed to leave the calendar"); // 상태 코드가 200이 아닌 경우 오류 처리
        }
      } catch (err) {
        console.error("캘린더에서 나가는 데 실패했습니다.", err);
        alert("캘린더에서 나가는 데 실패했습니다."); // 나가기 실패 시 alert
      }
    }
  }
};

  return (
    <div className="contentBox boxStyle8">
      <div className="chatInfo" style={{ justifyContent: "space-between", padding: "20px 0" }}>
        <div>{selectedCalendar.title}</div>
        <label htmlFor="" style={{ display: "flex" }}>
          {!selectedCalendar.title.startsWith('나의 캘린더') && (
            <>
              <span onClick={handleAddMembersClick} style={{ cursor: 'pointer', marginRight: '10px' }}>
                <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
              </span>
              <span onClick={handleLeaveOrDeleteCalendar} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={selectedCalendar.ownerStfNo === loginSlice.userId ? faTrash : faDoorOpen} /> &nbsp;{selectedCalendar.ownerStfNo === loginSlice.userId ? '삭제하기' : '나가기'}
              </span>
            </>
          )}
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

      {isModalOpen && (
        <AddCalendarMemberModal
          calendarId={selectedCalendar.calendarId}
          handelColseModal={handleCloseModal}
          onAddMembers={handleAddMembers}
        />
      )}
    </div>
  );
};

export default CalendarViewComponent;
