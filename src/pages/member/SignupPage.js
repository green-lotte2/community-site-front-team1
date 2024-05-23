import React from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <MemberLayout>
    <section id="loginArea">
        <div classNameName="loginBox" id="singupBox1">
            <Link to="#" classNameName="singupText">일반회원</Link>
        </div>

        <div classNameName="loginBox" id="singupBox2">
            <Link to="#" classNameName="singupText">관리자</Link>
        </div>
    </section>
    </MemberLayout>
  )
}

export default SignupPage