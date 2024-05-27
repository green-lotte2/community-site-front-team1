import React from 'react'
import SideTabComponent from './SideTabComponent'

const SideBoxComponent = ({ sideBarCate }) => {
  return (
    <div class="sideBox">
        <div class="sideTitle">
            <span>■</span>
            <div>
                {(sideBarCate === "admin") && <p>관리자</p>}
                {(sideBarCate === "private") && <p>개인</p>}
                {(sideBarCate === "article") && <p>게시판</p>}
                <span>▼</span>
            </div>
        </div>

        {(sideBarCate === "admin") && 
          <>
            <SideTabComponent sideTabCate={"index"}></SideTabComponent>
            <SideTabComponent sideTabCate={"userList"}></SideTabComponent>
            <SideTabComponent sideTabCate={"articleList"}></SideTabComponent>
          </>
        }
        {(sideBarCate === "private") && 
          <>
            <SideTabComponent sideTabCate={"myPage"}></SideTabComponent>
            <SideTabComponent sideTabCate={"menu1"}></SideTabComponent>
            <SideTabComponent sideTabCate={"menu2"}></SideTabComponent>
          </>
        }
        {(sideBarCate === "article") && 
          <>
            <SideTabComponent sideTabCate={"list?articleCateNo=1&pg=1"}></SideTabComponent>
            <SideTabComponent sideTabCate={"article1"}></SideTabComponent>
            <SideTabComponent sideTabCate={"article2"}></SideTabComponent>
          </>
        }
        
    </div>
  )
}

export default SideBoxComponent;