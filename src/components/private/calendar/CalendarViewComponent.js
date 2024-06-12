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

const CalendarViewComponent = ({ selectedCalendar }) => {
  const calendarRef = useRef(null);
  const calendarInstance = useRef(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [error, setError] = useState("");
  const loginSlice = useSelector((state) => state.loginSlice) || {}; // 안전한 접근 방법
  const stfNo = loginSlice.userId || "";

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
          .post(`${url}/events/selects`, { stfNo: stfNo, calendarId: selectedCalendar.calendarId }) // calendarId 포함
          .then((response) => {
              console.log("Events fetched:", response.data); // 이벤트 데이터 로그 출력
              response.data.forEach((event) => {
                  const isReadOnly = event.isReadOnly === "false" ? false : true;
                  const isAllDay = event.isAllDay === "false" ? false : true;
                  const newEvent = {
                      id: event.id,
                      calendarId: event.calendarId,
                      eventId: event.eventId, // 이벤트 종류 ID 포함
                      title: event.title,
                      start: Moment(event.start).format("YYYY-MM-DD[T]HH:mm:ss"),
                      end: Moment(event.end).format("YYYY-MM-DD[T]HH:mm:ss"),
                      location: event.location,
                      state: event.state,
                      isReadOnly: isReadOnly,
                      isAllDay: isAllDay,
                      backgroundColor: event.backgroundColor || getRandomColor(),
                      color: event.color || "#000000",
                      stfNo: stfNo
                  };

                  console.log("Adding event:", newEvent);

                  calendar.createEvents([newEvent]);
              });
          })
          .catch((err) => {
              console.error("Failed to fetch events:", err); // 에러 로그 출력
              setError("일정을 불러오지 못했습니다.");
          });

      calendar.on("beforeCreateEvent", (event) => {
          const calendarId = selectedCalendar.calendarId; // 선택된 캘린더의 ID 사용
          const eventId = options.calendars.find(cal => cal.id === event.calendarId)?.id || "defaultEventId";

          const newEvent = {
              id: `${calendarId}-${Date.now()}`, // 고유 ID 생성
              calendarId, // calendarId 추가
              eventId, // 이벤트 종류 ID
              title: event.title,
              start: Moment(event.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss"),
              end: Moment(event.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss"),
              location: event.location,
              state: event.state,
              isReadOnly: false,
              isAllDay: event.isAllday,
              backgroundColor: getRandomColor(),
              color: "#FFFFFF",
              stfNo: stfNo
          };
          console.log("Creating new event:", newEvent); // 이벤트 로그 출력
          calendar.createEvents([newEvent]);

          /** 등록 */
          axios
              .post(`${url}/events/insert`, newEvent)
              .then((response) => {
                  console.log(response.data);
              })
              .catch((err) => {
                  console.error("Failed to insert event:", err); // 에러 로그 출력
                  setError("일정이 저장되지 않았습니다.");
              });
      });

      calendar.on("beforeUpdateEvent", ({ event, changes }) => {
          const calendarId = changes.calendarId || event.calendarId;
          const eventId = options.calendars.find(cal => cal.id === calendarId)?.id || "defaultEventId";

          calendar.updateEvent(event.id, calendarId, changes);

          const start = changes.start ? Moment(changes.start.toDate()).format("YYYY-MM-DD[T]HH:mm:ss") : event.start;
          const end = changes.end ? Moment(changes.end.toDate()).format("YYYY-MM-DD[T]HH:mm:ss") : event.end;

          const updatedEvent = {
              calendarId, // calendarId 추가
              eventId, // eventId 추가
              title: changes.title || event.title,
              location: changes.location || event.location,
              start,
              end,
              state: changes.state || event.state,
              isAllDay: changes.isAllDay !== undefined ? changes.isAllDay : event.isAllDay,
              isReadOnly: changes.isReadOnly !== undefined ? changes.isReadOnly : event.isReadOnly,
              backgroundColor: changes.backgroundColor || event.backgroundColor || getRandomColor(),
              color: changes.color || event.color || "#FFFFFF",
              stfNo: stfNo
          };

          console.log("Updating event:", updatedEvent); // 업데이트 로그 출력

          axios
              .post(`${url}/events/modify/${event.id}`, updatedEvent)
              .then((response) => {
                  console.log(response.data);
                  window.location.reload();
              })
              .catch((err) => {
                  console.error("Failed to update event:", err); // 에러 로그 출력
              });
      });

      calendar.on("beforeDeleteEvent", (event) => {
          calendar.deleteEvent(event.id, event.calendarId);
          axios
              .get(`${url}/events/delete?id=${event.id}`)
              .then((response) => {
                  console.log(response.data);
              })
              .catch((err) => {
                  console.error("Failed to delete event:", err); // 에러 로그 출력
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
          if (calendarInstance.current) {
              calendarInstance.current.destroy();
          }
      };
  }, [stfNo, selectedCalendar]);

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
              <div>{selectedCalendar.title} 채팅방</div> {/* 채팅방 이름을 선택된 캘린더의 제목으로 설정 */}
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
