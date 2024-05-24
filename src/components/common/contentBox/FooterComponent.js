import React from 'react'
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <div id="footer">
        <div class="footerContent">
            <p>만든사람</p>
            <p>카피라이트</p>
        </div>
        <div class="footerContent">
            <Link to="#">이용정책1</Link>
            <Link to="#">이용정책2</Link>
            <Link to="#">이용정책3</Link>
            <Link to="#">기타</Link>
            <Link >Version : {process.env.REACT_APP_VERSION}</Link>
        </div>
    </div>
  )
}

export default FooterComponent;