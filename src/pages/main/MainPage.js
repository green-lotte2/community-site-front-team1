import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import CalendarListComponent from '../../components/private/calendar/CalendarListComponent';
import CalendarViewComponent from '../../components/private/calendar/CalendarViewComponent';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
import { createTodoApi, mainInfoApi, todoCompleteApi } from '../../api/MainApi';
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
  const [todoRender, setTodoRender] = useState(1);

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

  },[todoRender])

  /** todo 완료 */
  const todoComplete = async (todoNo) => {
    try {
      const response = await todoCompleteApi(todoNo); 
      console.log(response)

      if (response > 0) {
        setTodoRender(todoRender + 1);
      }else {
        alert("todo 변경에 실패했습니다.");
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** todo 생성 */
  const [todoCreate, setTodoCreate] = useState(false);
  const [newTodo, setNewTodo] = useState({
    content : "",
    date : "",
  });
  const createTodo = async () => {

    const data = {
      todoContent : newTodo.content,
      todoDate : newTodo.date,
      stfNo : loginSlice.userId,
      todoStatus : "Y"
    }

    try {
      const response = await createTodoApi(data);
      console.log(response);
      if (response > 0) {
        setTodoRender(todoRender + 1);
        setTodoCreate(false);
      } else {
        setTodoCreate(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout>
      <div className="contentBox boxStyle1" style={{overflow:"scroll", scrollbarWidth:"none"}}>
        <div className="contentTitle">ToDo</div>
        <div className="contentColumn">
          {infoData.todoDTO && infoData.todoDTO.map((todo, index)=>(
            <span key={index} className="contentRow">
              <p>[{Moment(todo.todoDate).format('YY-MM-DD')}] {todo.todoContent}</p>
              <p><button className='ssBtn' onClick={() => todoComplete(todo.todoNo)}>완료</button></p>
            </span>
          ))}
          {todoCreate && 
            <span className="contentRow" >
              <input type="date" onChange={(e) => setNewTodo(prev => ({ ...prev, date: e.target.value }))}/>
              <input type="text" name="" id="" placeholder='할일'
                onChange={(e) => setNewTodo(prev => ({ ...prev, content: e.target.value }))}
                style={{width:"170px", padding:"4px"}}/>
              <button className='ssBtn' onClick={createTodo}>생성</button>
            </span>
          }
          <span className="contentRow" style={{justifyContent:"center"}}>
            <button className='todoBtn' onClick={()=>setTodoCreate(true)}>+</button>
          </span>
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
          {infoData.noticeDTO && infoData.noticeDTO.map((notice, index)=>(
            <Link key={index} to={`/view?articleNo=${notice.articleNo}`} className="contentRow">
              <p className="hidden">{notice.articleTitle}</p>
              <p>{Moment(notice.articleRdate).format('YY-MM-DD')}</p>
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
