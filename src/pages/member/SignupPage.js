import React from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <MemberLayout>
      <div className="memberBack signupBack">
          <div id="completeBox" >

            <div className="memberTitle">가입 유형 선택</div>

            <div className='registerPack'>
              <Link to="/register?type=USER" className="singupText">일반회원</Link>
              <Link to="/register?type=ADMIN" className="singupText">관리자</Link>
            </div>
          </div>
      </div>
    </MemberLayout>
  )
}

export default SignupPage;