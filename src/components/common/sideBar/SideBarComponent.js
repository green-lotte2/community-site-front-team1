import React from 'react'
import SideBoxComponent from './SideBoxComponent'
import { Link } from 'react-router-dom';

const SideBarComponent = () => {
  return (
    <section id="sideBar">
      <Link to="/main" className="boxTitle">
          <img src="../images/zeroPie2.png" alt=""/>
          <div>
              <p>ZeroPie</p>
          </div>
      </Link>

      <SideBoxComponent sideBarCate={"private"}></SideBoxComponent>
      <SideBoxComponent sideBarCate={"article"}></SideBoxComponent>
      <SideBoxComponent sideBarCate={"admin"}></SideBoxComponent>
      <SideBoxComponent sideBarCate={"cs"}></SideBoxComponent>
      
  </section>
  )
}

export default SideBarComponent;