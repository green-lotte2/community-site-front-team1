import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import CalendarListComponent from '../../components/private/calendar/CalendarListComponent';
import CalendarViewComponent from '../../components/private/calendar/CalendarViewComponent';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
import { mainInfoApi } from '../../api/MainApi';
import Moment from 'moment';


const MainPage = () => {
  const dispatch = useDispatch();
  const loginSlice = useSelector((state) => state.loginSlice);
  const [myCalendar, setMyCalendar] = useState(null);
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  /** 캘린더 */
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
  }, [])

  const handleSelectCalendar = (calendar) => {
    setSelectedCalendar(calendar);
  };

  /** 메인페이지 정보 출력 */
  const [infoData, setInfoData] = useState("");

  useEffect(()=>{
    console.log("Aa", loginSlice.userId)
    const mainInfo = async () => {
      try {
        const response = await mainInfoApi(loginSlice.userId);
        console.log("메인",response);
        setInfoData(response);
      } catch (error) {
        console.log(error);
      }
    }
    mainInfo();

  },[])


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
          {infoData.birthDTO && infoData.birthDTO.map((birth, index)=>(
            <Link key={index} to="#" className="contentRow">
              <p>[{Moment(birth.stfBirth).format('YY-MM-DD')}] {birth.strDptName}</p>
              <p>{birth.stfName} {birth.strRnkNo}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="contentTitle">공지사항</div>
        <div className="contentColumn">
          {infoData.csDTO && infoData.csDTO.map((cs, index)=>(
            <Link key={index} to={`/csView?csNo=${cs.csNo}`} className="contentRow">
              <p className="hidden">[{cs.csCate}] {cs.csTitle}</p>
              <p>{Moment(cs.csRdate).format('YY-MM-DD')}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="contentBox boxStyle1">
        <div className="profileRow">
        {infoData.stfDTO && infoData.stfDTO.map((stf, index)=>(
          <>
          <div className='contentRow' style={{justifyContent:"normal", border:"0"}}>
            <img className="contentImg" src={`${RootUrl()}/images/${stf.stfImg}`} alt=""/>
            <div className="contentColumn profileContent">
                  <p key={index}>{stf.stfName} {stf.strRnkNo}</p>
                  <p>{stf.strDptName}</p>
                  
            </div>
          </div>
          <div className='profileRow'>
            <p>연락처 : {stf.stfPh}</p>
            <p>이메일 : {stf.stfEmail}</p>
          </div>
            
          </>
          )) }
        </div>
      </div>

      <div>
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

    </MainLayout>
  );
};

export default MainPage;
