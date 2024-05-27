import React from 'react'
import { Link } from 'react-router-dom';

const SideTabComponent = ({sideTabCate}) => {
  return (
    <Link to={`/${sideTabCate}`} className="sideTab">
        <img src="../images/sideBar_icon.png" alt=""/>
        <div>
            {/* 관리자 */}
            {(sideTabCate === "index") && <p>관리자메인</p>}
            {(sideTabCate === "userList") && <p>회원관리</p>}
            {(sideTabCate === "articleList") && <p>게시글관리</p>}

            {/* 개인 */}
            {(sideTabCate === "myPage") && <p>마이페이지</p>}
            {(sideTabCate === "menu1") && <p>메뉴1</p>}
            {(sideTabCate === "menu2") && <p>메뉴2</p>}

            {/* 게시판 */}
            {(sideTabCate === "list?articleCateNo=1&pg=1") && <p>공지사항</p>}
            {(sideTabCate === "article1") && <p>게시판1</p>}
            {(sideTabCate === "article2") && <p>게시판2</p>}
        </div>
    </Link>
  )
}

export default SideTabComponent;