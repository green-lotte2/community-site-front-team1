import React from 'react'
import NavBarComponent from './NavBarComponent'
import FooterComponent from './FooterComponent'

const ContentAreaComponent = ({ children }) => {
  return (
    <section id="contentArea">
            {/*상단바*/}
            <NavBarComponent></NavBarComponent>

            {/*메인*/}
            <div id="mainBox">
              {children}
            </div>

            {/*Footer*/}
            <FooterComponent></FooterComponent>
        </section>
  )
}

export default ContentAreaComponent;