import React from 'react'
import SideBarComponent from '../components/common/sideBar/SideBarComponent'
import ContentAreaComponent from '../components/common/contentBox/ContentAreaComponent'

const MainLayout = ({ children }) => {
  return (
    <div id="container">
      <SideBarComponent></SideBarComponent>
      <ContentAreaComponent>
      {children}
      </ContentAreaComponent>
    </div>
  )
}

export default MainLayout