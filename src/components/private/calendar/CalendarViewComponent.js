import { faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import '../../../App.css';

export default class CalendarViewComponent extends Component {
  constructor(props) {
    super(props);
    this.dateClick = this.dateClick.bind(this);
  }

  dateClick(info) {
    alert(info.dateStr);
  }

  render() {
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
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={'dayGridMonth'}
            headerToolbar={{
              start: 'today',
              center: 'title',
              end: 'prev,next',
            }}
            height={'85vh'}
            dateClick={this.dateClick}
            events={[
              { title: '판매건수 : 23건', date: '2024-06-01' },
              { title: '판매건수 : 23건', date: '2024-06-17' },
            ]}
          />
        </div>
      </div>
    );
  }
}
