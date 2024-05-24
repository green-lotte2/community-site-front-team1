import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage  = () => {
  return (
    <div id='landingPage'>
      <div id='landingBox'>
        <p>안녕하세요</p>
        <Link to="/">메인페이지</Link>
        <br/>
        <Link to="/main">로그인후페이지</Link>
        <br/>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  )
}

export default LandingPage 