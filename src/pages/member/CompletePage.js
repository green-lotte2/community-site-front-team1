import React from 'react'
import MemberLayout from '../../layout/MemberLayout';
import { Link } from 'react-router-dom';

const CompletePage = () => {
  return (
    <MemberLayout>
    <section id="loginArea">
        <div id="completeBox">
            <p>회원가입이 완료되었습니다.</p>
            <p>회원님의 아이디는 <span>abcd1234</span> 입니다.</p>

            <Link to="#" className="singupText">로그인</Link>
        </div>
    </section>
    </MemberLayout>
  )
}

export default CompletePage