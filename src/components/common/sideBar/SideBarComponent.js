import React from 'react'
import SideBoxComponent from './SideBoxComponent'

const SideBarComponent = () => {
  return (
    <section id="sideBar">
      <div class="boxTitle">
          <img src="../images/zeroPieLogo.png" alt=""/>
          <div>
              <p>1조 게시판</p>
          </div>
      </div>

      <SideBoxComponent></SideBoxComponent>
      <SideBoxComponent></SideBoxComponent>
      <SideBoxComponent></SideBoxComponent>
      
  </section>
  )
}

export default SideBarComponent;