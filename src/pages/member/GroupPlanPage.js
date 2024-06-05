import React, { useEffect, useState } from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { getPlan } from '../../api/MemberApi'

const GroupPlanPage = () => {

  const [registerPlan,setRegisterPlan] = useState([]);


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


console.log("첫번째 플랜 집어넣기전에 꺼내기",registerPlan[0]);


   
   const firstPlan = registerPlan.length > 0 ? registerPlan[0] : null;
   const secondPlan = registerPlan.length > 1 ? registerPlan[1] : null;
   const thirdPlan = registerPlan.length > 2 ? registerPlan[2] : null;

   console.log("첫번째 플랜 꺼내기",firstPlan);


  return (
    <MemberLayout>
      <div className="memberBack planBack">
        <div className="planBox">
         <p className='colorG'>{firstPlan && firstPlan.planName}</p>
          <h3 className='colorG'><span>멤버당</span>{firstPlan && firstPlan.planCost}<span>원/월</span></h3>
          <button className='BcolorG' value={null}>가입하기</button>
          <div className='planDetail'>
            <p>{firstPlan && firstPlan.planInfo}</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 협업자 등록 최대 5명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 최대 5명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 최대 5명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 왕밤빵 무제한 제공</h3>
          </div>
        </div>

        <div className="planBox">
          <p className='colorB'>{secondPlan && secondPlan.planName}</p>
          <h3 className='colorB'><span>멤버당</span>{secondPlan && secondPlan.planCost}<span>원/월</span></h3>
          <button className='BcolorB'>가입하기</button>
          <div className='planDetail'>
            <p>{secondPlan && secondPlan.planInfo}</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 협업자 등록 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 1일 1피자 무제한 제공</h3>
          </div>
        </div>

        <div className="planBox">
          <p className='colorR'>{thirdPlan && thirdPlan.planName}</p>
          <h3 className='colorR'><span>멤버당</span>{thirdPlan && thirdPlan.planCost}<span>원/월</span></h3>
          <button className='BcolorR'>가입하기</button>
          <div className='planDetail'>
            <p>{thirdPlan && thirdPlan.planInfo}</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 편집 협업자 등록 무제한</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 무제한</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 무제한</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 1일 1치킨 제공</h3>
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default GroupPlanPage