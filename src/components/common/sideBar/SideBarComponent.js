import React from 'react'
import SideBoxComponent from './SideBoxComponent'
import { Link } from 'react-router-dom';

const SideBarComponent = () => {
  return (
    <section id="sideBar">
      <Link to="/main" class="boxTitle">
          <img src="../images/zeroPieLogo.png" alt=""/>
          <div>
              <p>1조 게시판</p>
          </div>
      </Link>

      <SideBoxComponent></SideBoxComponent>
      <SideBoxComponent></SideBoxComponent>
      <SideBoxComponent></SideBoxComponent>
      
  </section>
  )
}

export default SideBarComponent;