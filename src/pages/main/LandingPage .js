import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage  = () => {
  return (
    <div style={{ margin: "200px auto", width: "1920px", textAlign: "center", fontSize: "40px"}}>
        <p>임시 랜딩페이지</p>
        <Link to="/">메인페이지</Link>
        <br/>
        <Link to="/main">로그인후페이지</Link>
        <br/>
        <Link to="/login">로그인</Link>
    </div>
  )
}

export default LandingPage 