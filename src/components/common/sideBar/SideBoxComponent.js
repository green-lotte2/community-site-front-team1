import React, { useState } from 'react'
import SideTabComponent from './SideTabComponent'

const SideBoxComponent = ({ sideBarCate }) => {

  const [accordion, setAccordion]  = useState(true);

  const handleAccordion = (e) => {
    setAccordion(!accordion);
    console.log(accordion);
    if (accordion) {
      e.target.innerText = "▲";
    } else {
      e.target.innerText = "▼";
    }
  }

  return (
    <div className="sideBox">
        <div className="sideTitle">
            <span>■</span>
            <div>
                {(sideBarCate === "admin") && <p>관리자</p>}
                {(sideBarCate === "private") && <p>개인</p>}
                {(sideBarCate === "article") && <p>게시판</p>}
                <span onClick={handleAccordion}>▼</span>
            </div>
        </div>

      {accordion && 
        <>
          {(sideBarCate === "admin") && 
            <>
              <SideTabComponent sideTabCate={"index"}></SideTabComponent>
              <SideTabComponent sideTabCate={"config"}></SideTabComponent>
              <SideTabComponent sideTabCate={"userList"}></SideTabComponent>
              <SideTabComponent sideTabCate={"articleList"}></SideTabComponent>
              <SideTabComponent sideTabCate={"articleModify?articleCateNo=1&pg=1"}></SideTabComponent>
            </>
          }
          {(sideBarCate === "private") && 
            <>
              <SideTabComponent sideTabCate={"myPage"}></SideTabComponent>
              <SideTabComponent sideTabCate={"menu1"}></SideTabComponent>
              <SideTabComponent sideTabCate={"menu2"}></SideTabComponent>
              <SideTabComponent sideTabCate={"group"}></SideTabComponent>

            </>
          }
          {(sideBarCate === "article") && 
            <>
              <SideTabComponent sideTabCate={"list?articleCateNo=1&pg=1"}></SideTabComponent>
              <SideTabComponent sideTabCate={"article1"}></SideTabComponent>
              <SideTabComponent sideTabCate={"article2"}></SideTabComponent>
            </>
          }
        </>
      }
        
    </div>
  )
}

export default SideBoxComponent;