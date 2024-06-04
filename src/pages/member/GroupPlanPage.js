import React from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'

const GroupPlanPage = () => {
  return (
    <MemberLayout>
      <div className="memberBack planBack">
        <div className="planBox">
          <p className='colorG'>BASIC</p>
          <h3 className='colorG'><span>멤버당</span>5,000<span>원/월</span></h3>
          <button className='BcolorG'>가입하기</button>
          <div className='planDetail'>
            <p>빵을 좋아하는 분에게 추천합니다.</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 협업자 등록 최대 5명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 최대 5명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 최대 5명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 왕밤빵 무제한 제공</h3>
          </div>
        </div>

        <div className="planBox">
          <p className='colorB'>STANDARD</p>
          <h3 className='colorB'><span>멤버당</span>10,000<span>원/월</span></h3>
          <button className='BcolorB'>가입하기</button>
          <div className='planDetail'>
            <p>피자를 좋아하는 분에게 추천합니다.</p>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 페이지 협업자 등록 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 프로젝트 협업자 등록 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 그룹채팅 회원 초대 최대 10명</h3>
            <h3><FontAwesomeIcon icon={faSquareCheck} style={{color:"#00a51e"}}/> 1일 1피자 무제한 제공</h3>
          </div>
        </div>

        <div className="planBox">
          <p className='colorR'>PREMIUM</p>
          <h3 className='colorR'><span>멤버당</span>15,000<span>원/월</span></h3>
          <button className='BcolorR'>가입하기</button>
          <div className='planDetail'>
            <p>치킨을 좋아하는 분에게 추천합니다.</p>
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