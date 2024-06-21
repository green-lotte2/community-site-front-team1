import React, { useEffect, useState } from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { getPlan,freePlan } from '../../api/MemberApi'
import {Navigate, useLocation, useNavigate} from 'react-router-dom';


const GroupPlanPage = () => {

  const [registerPlan,setRegisterPlan] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stfNo = queryParams.get('stfNo');


  useEffect(() => { 

    const fetchPlan = async () =>{
      console.log("cs페이지 호출될때, 여기에 들어오지?");   
      
      try{
     
        const response = await getPlan();
        console.log("저장 전",response);

        setRegisterPlan(response);
        console.log("저장 후 ",response);

      }catch(err){
          console.log(err);
      }
    }
    fetchPlan();
   }, []);


   const submitOrder = (type,planNo)=> async (e)=>{

    e.preventDefault();

  
    console.log("사용자 아이디는 잘 들어오나?",stfNo);
    console.log("타입이 잘 들어오나?",type);
    console.log("타입에 대한 planNo는?",planNo);
    console.log("유저 아이디 : ",stfNo);



      if(type==="BASIC"){
        
        await freePlan(stfNo);
        
        navigate("/complete", {state: { user: stfNo }});//결제 할거 없으면 그냥 완성 페이지로 이동

      }else{

        const url = `/planOrder?planType=${type}&planNo=${planNo}&stfNo=${stfNo}`;
        window.location.href=url;

      }
   }


  console.log("첫번째 플랜 집어넣기전에 꺼내기",registerPlan[0]);


   
   const firstPlan = registerPlan.length > 0 ? registerPlan[0] : null;
   const secondPlan = registerPlan.length > 1 ? registerPlan[1] : null;
   const thirdPlan = registerPlan.length > 2 ? registerPlan[2] : null;

   console.log("첫번째 플랜 꺼내기",firstPlan);


  return (
    <MemberLayout>
      <div className="memberBack planBack">

      {firstPlan && (
        <div className="planBox">
          <p className='colorG'>{firstPlan.planName}</p>
          <h3 className='colorG'><span>멤버당</span>{firstPlan.planCost}<span>원/월</span></h3>
          <button type="button" className='BcolorG' onClick={submitOrder("BASIC", firstPlan.planNo)}>가입하기</button>
          <div className='planDetail'>
            <p>{firstPlan.planInfo}</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{ color: "#00a51e" }} /> 페이지 협업자 등록 최대 3명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{ color: "#00a51e" }} /> 프로젝트 협업자 등록 최대 3명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{ color: "#00a51e" }} /> 그룹채팅 회원 초대 최대 5명</h3>
          </div>
        </div>
      )}

      {secondPlan && (
        <div className="planBox">
          <p className='colorB'>{secondPlan && secondPlan.planName}</p>
          <h3 className='colorB'><span>멤버당</span>{secondPlan && secondPlan.planCost.toLocaleString()}<span>원/월</span></h3>
          <button type="button" onClick={submitOrder("STANDARD",secondPlan.planNo)} className='BcolorB'>가입하기</button>
          <div className='planDetail'>
            <p>{secondPlan && secondPlan.planInfo}</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 협업자 등록 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 최대 10명</h3>
          </div>
        </div>
        )}


      {thirdPlan && (
        <div className="planBox">
          <p className='colorR'>{thirdPlan && thirdPlan.planName}</p>
          <h3 className='colorR'><span>멤버당</span>{thirdPlan && thirdPlan.planCost.toLocaleString()}<span>원/월</span></h3>
          <button type="button" onClick={submitOrder("PREMIUM",thirdPlan.planNo)} className='BcolorR'>가입하기</button>
          <div className='planDetail'>
            <p>{thirdPlan && thirdPlan.planInfo}</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 편집 협업자 등록 무제한</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 무제한</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 무제한</h3>
          </div>
        </div>
        )}

      </div>
    </MemberLayout>
  )
}

export default GroupPlanPage