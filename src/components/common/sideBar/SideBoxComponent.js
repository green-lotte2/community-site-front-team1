import React from 'react'
import SideTabComponent from './SideTabComponent'

const SideBoxComponent = () => {
  return (
    <div class="sideBox">
        <div class="sideTitle">
            <span>■</span>
            <div>
                <p>개인</p>
                <span>▼</span>
            </div>
        </div>

        <SideTabComponent></SideTabComponent>
        <SideTabComponent></SideTabComponent>
        <SideTabComponent></SideTabComponent>
    </div>
  )
}

export default SideBoxComponent;