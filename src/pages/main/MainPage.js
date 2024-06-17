import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import CalendarListComponent from '../../components/private/calendar/CalendarListComponent';
import CalendarViewComponent from '../../components/private/calendar/CalendarViewComponent';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';

const MainPage = () => {
  const dispatch = useDispatch();
  const loginSlice = useSelector((state) => state.loginSlice);
  const [myCalendar, setMyCalendar] = useState(null);
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  useEffect(() => {
    const fetchMyCalendar = async () => {
      try {
        const response = await axios.get(`${RootUrl()}/calendars/user/${loginSlice.userId}`, { params: { username: loginSlice.username } });
        const myCalendar = response.data;
        setMyCalendar(myCalendar);
        setSelectedCalendar((prevCalendar) => prevCalendar || myCalendar); // 기본 캘린더 설정
      } catch (error) {
        console.error("There was an error fetching the user calendar!", error);
      }
    };

    if (loginSlice.userId) {
      fetchMyCalendar();
    }

    if (loginSlice.userRole === "ADMIN") {
      setTimeout(() => {
        alert("플랜 가입 해야지?");
      }, 1000);
    }
  }, [loginSlice.userId, loginSlice.userRole, loginSlice.username]);

  const handleSelectCalendar = (calendar) => {
    setSelectedCalendar(calendar);
  };

  return (
    <MainLayout>
      <div className="contentBox boxStyle1">
        <div className="contentTitle">결재</div>
        <div className="contentColumn">
          <Link to="#" className="contentRow">
              <p>[24.05.22] 연차 신청</p>
              <p>승인대기</p>
          </Link>
          <Link to="#" className="contentRow">
              <p>[24.05.23] 연차 신청</p>
              <p>승인대기</p>
          </Link>
          <Link to="#" className="contentRow">
              <p>[24.05.20] 비품구매 결재건</p>
              <p>승인대기</p>
          </Link>
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="contentTitle">생일</div>
        <div className="contentColumn">
          <Link to="#" className="contentRow">
              <p>[24.05.22] 경영지원본부 인사/총무팀</p>
              <p>홍길동 대리</p>
          </Link>
          <Link to="#" className="contentRow">
              <p>[24.05.23] 시스템사업본부 공공영업팀</p>
              <p>김유신 대리</p>
          </Link>
          <Link to="#" className="contentRow">
              <p>[24.05.25] 개발사업부 SW개발</p>
              <p>김춘추 과장</p>
          </Link>
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="contentTitle">ToDo</div>

        <div className="contentColumn">
          <div className="contentRow">
            <div className="contentWithCheck">
              <input type="checkbox"/>
              <p>ㅁㅁㅁ 거래처 방문</p>
            </div>
            <p>24.05.22 14:00</p>
          </div>

          <div className="contentRow">
            <div className="contentWithCheck">
                <input type="checkbox"/>
                <p>ㅁㅁㅁ 프로젝트 준비</p>
            </div>
            <p>24.05.22 16:00</p>
          </div>

          <div className="contentRow">
            <div className="contentWithCheck">
              <input type="checkbox"/>
              <p>김춘추 과장님 면담</p>
            </div>
            <p>24.05.23 10:00</p>
          </div>
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="profileRow">
          <img className="contentImg" src="../images/iconSample3.png" alt=""/>
          <div className="contentColumn profileContent">
            <p>홍길동 대리</p>
            <p>시스템사업본부 공공영업팀</p>
            <p>010-1234-5678</p>
            <p>abcd1234@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="contentBox boxStyle5" style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '10px', visibility: 'hidden', height: 0 }}>
          <CalendarListComponent onSelectCalendar={handleSelectCalendar} defaultCalendar={true} />
        </div>
        <div style={{ flex: 3 }}>
          {selectedCalendar ? (
            <CalendarViewComponent selectedCalendar={selectedCalendar} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="contentBox boxStyle6">
        <div className="contentTitle">공지사항</div>
        <div className="contentColumn">
          <Link to="#" className="contentRow">
            <p className="hidden">그룹웨어 프로젝트 스토리보드 회의 결과 공지</p>
            <p>24.05.22</p>
          </Link>
          <Link to="#" className="contentRow">
            <p className="hidden">그룹웨어 프로젝트 데이터베이스 구축 회의 결과 공지</p>
            <p>24.05.23</p>
          </Link>
          <Link to="#" className="contentRow">
            <p className="hidden">그룹웨어 프로젝트 서버구축 회의 결과 공지</p>
            <p>24.05.25</p>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
