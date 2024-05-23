import React from 'react'
import { Link } from 'react-router-dom';

const SideTabComponent = () => {
  return (
    <Link to="/list?articleCateNo=1" className="sideTab">
        <img src="../images/sideBar_icon.png" alt=""/>
        <div>
            <p>마이페이지</p>
        </div>
    </Link>
  )
}

export default SideTabComponent;