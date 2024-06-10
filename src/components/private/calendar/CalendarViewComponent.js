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

const globalPath = {
  path: "http://localhost:8080/onepie"
};

// 랜덤 색상을 생성하는 함수
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CalendarViewComponent = () => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [error, setError] = useState("");
  const loginSlice = useSelector((state) => state.loginSlice) || {}; // 안전한 접근 방법
  const stfNo = loginSlice.userId || "";
  // formData.append('stfNo', loginSlice.userId); << stfNo는 왼쪽꺼 보고 참고

  useEffect(() => {
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
      useDetailPopup: true,
      useFormPopup: true,
    };

    const calendar = new Calendar(container, options);
    calendarInstance.current = calendar;

    calendar.setOptions({
      month: {
        isAlways6Weeks: false,
      },
    });

    const url = globalPath.path;
    /** 일정 조회 */
    axios
      .post(`${url}/calendar/selects`, { stfNo: stfNo }) // stfNo를 포함하여 요청
      .then((response) => {
        response.data.forEach((event) => {
          const isReadOnly = event.isReadOnly === "false" ? false : true;
          const isAllDay = event.isAllDay === "false" ? false : true;
          const selectedCalendar = options.calendars.find(
            (cal) => cal.id === event.calendarId
          );
          const newEvent = {
            id: event.id,
            calendarId: event.calendarId,
            title: event.title,
            start: Moment(event.start)
              .subtract(1, "months")
              .format("YYYY-MM-DD[T]HH:mm:ss"),
            end: Moment(event.end)
              .subtract(1, "months")
              .format("YYYY-MM-DD[T]HH:mm:ss"),
            location: event.location,
            state: event.state,
            isReadOnly: isReadOnly,
            isAllDay: isAllDay,
            backgroundColor: event.backgroundColor || getRandomColor(),
            color: event.color || "#000000",
            stfNo: stfNo
          };

          calendar.createEvents([newEvent]);
        });
      })
      .catch((err) => {
        setError("일정을 불러오지 못했습니다.");
      });

    calendar.on("beforeCreateEvent", (event) => {
      const selectedCalendar = options.calendars.find(
        (cal) => cal.id === event.calendarId
      );

      const newEvent = {
        id: `${event.calendarId}-${Date.now()}`, // 고유 ID 생성
        calendarId: event.calendarId,
        title: event.title,
        start: Moment(event.start.toDate())
          .utcOffset(9)
          .format("YYYY-MM-DD[T]HH:mm:ss"),
        end: Moment(event.end.toDate())
          .utcOffset(9)
          .format("YYYY-MM-DD[T]HH:mm:ss"),
        location: event.location,
        state: event.state,
        isReadOnly: false,
        isAllDay: event.isAllday,
        backgroundColor: getRandomColor(),
        color: "#FFFFFF",
        stfNo: stfNo
      };
      calendar.createEvents([newEvent]);

      /** 등록 */
      axios
        .post(`${url}/calendar/insert`, newEvent)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          setError("일정이 저장되지 않았습니다.");
        });
    });

    calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      calendar.updateEvent(event.id, event.calendarId, changes);

      const start =
        changes.start === undefined
          ? null
          : Moment(changes.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss");
      const end =
        changes.end === undefined
          ? null
          : Moment(changes.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss");

      const updatedEvent = {
        calendarId: changes.calendarId,
        title: changes.title,
        location: changes.location,
        start: start,
        end: end,
        state: changes.state,
        isAllDay: changes.isAllday,
        isReadOnly: changes.isReadOnly,
        backgroundColor: changes.backgroundColor || getRandomColor(),
        color: changes.color || "#FFFFFF",
        stfNo: stfNo
      };

      axios
        .post(`${url}/calendar/modify/${event.id}`, updatedEvent)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    calendar.on("beforeDeleteEvent", (event) => {
      calendar.deleteEvent(event.id, event.calendarId);
      axios
        .get(`${url}/calendar/delete?id=${event.id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
      if (calendar) {
        calendar.destroy();
      }
    };
  }, [stfNo]);

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
        <div>ㅇㅇㅇ 채팅방 이름</div>
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
          <button style={btnMoveStyle} onClick={goToday}>
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
}

export default CalendarViewComponent;
