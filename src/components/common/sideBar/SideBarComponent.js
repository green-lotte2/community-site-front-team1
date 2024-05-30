import React from 'react'
import SideBoxComponent from './SideBoxComponent'
import { Link } from 'react-router-dom';

const SideBarComponent = () => {
  return (
    <section id="sideBar">
      <Link to="/main" className="boxTitle">
          <img src="../images/zeroPie2.png" alt=""/>
          <img src="../images/zeroPieLogo.png" alt=""/>
          <div>
              <p>ZeroPie</p>
          </div>
      </Link>

      <SideBoxComponent sideBarCate={"private"}></SideBoxComponent>
      <SideBoxComponent sideBarCate={"article"}></SideBoxComponent>
      <SideBoxComponent sideBarCate={"admin"}></SideBoxComponent>
      
  </section>
  )
}

export default SideBarComponent;