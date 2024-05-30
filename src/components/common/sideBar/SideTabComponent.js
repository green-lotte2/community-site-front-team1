import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faFilePen, faFlag, faFolderOpen, faFolderTree, faGear, faHeadset, faUserGear, faUserLock,  } from "@fortawesome/free-solid-svg-icons";

const SideTabComponent = ({sideTabCate}) => {
  return (
    <Link to={`/${sideTabCate}`} className="sideTab">
        <div>
            {/* 관리자 */}
            {(sideTabCate === "index") && 
              <><FontAwesomeIcon icon={faGear}/><p>관리자메인</p></>}
            {(sideTabCate === "config") &&
              <><FontAwesomeIcon icon={faUserGear}/><p>기본설정</p></>}
            {(sideTabCate === "userList") &&
              <><FontAwesomeIcon icon={faUserGear}/><p>회원관리</p></>}
            {(sideTabCate === "articleList") && 
              <><FontAwesomeIcon icon={faFolderOpen} /><p>게시판관리</p></>}
            {(sideTabCate === "articleModify?articleCateNo=1&pg=1") && 
              <><FontAwesomeIcon icon={faFilePen} /><p>게시글관리</p></>}

            {/* 개인 */}
            {(sideTabCate === "myPage") &&
                <><FontAwesomeIcon icon={faUserLock} /><p>마이페이지</p></>}
            {(sideTabCate === "menu1") && 
              <><FontAwesomeIcon icon={faFileLines} /><p>메뉴1</p></>}
            {(sideTabCate === "menu2") && 
              <><FontAwesomeIcon icon={faFileLines} /><p>메뉴2</p></>}
            {(sideTabCate === "group") && 
              <><FontAwesomeIcon icon={faFolderTree} /><p>조직도</p></>}

            {/* 게시판 */}
            {(sideTabCate === "list?articleCateNo=1&pg=1") && 
              <><FontAwesomeIcon icon={faFlag} /><p>공지사항</p></>}
            {(sideTabCate === "article1") &&
              <><FontAwesomeIcon icon={faFileLines} /><p>게시판</p></>}
            {(sideTabCate === "article2") &&
              <><FontAwesomeIcon icon={faFileLines} /><p>게시판</p></>}

            {/* 고객센터 */}
            {(sideTabCate === "csList") && 
              <><FontAwesomeIcon icon={faHeadset} /><p>고객문의</p></>}
            {(sideTabCate === "csTerms") && 
              <><FontAwesomeIcon icon={faFilePen} /><p>이용약관</p></>}
        </div>
    </Link>
  )
}

export default SideTabComponent;