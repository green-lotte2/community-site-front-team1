import React from 'react'
import MainLayout from '../../layout/MainLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminMain = () => {
  return (
    <MainLayout>
        <div className="contentBox boxStyle11" style={{flexDirection:"row"}}>
            <div className='adminMain'>
                <img src="../../../images/icon/users-between-lines-solid.svg" alt="" />
            </div>
            
            <div className='adminMain' style={{flexDirection:"column", justifyContent:"center"}}>
                <p>회원 현황</p>
                <span>가입된 회원 : 1234</span>
                <span>활동 회원 : 1234</span>
                <span>사용 플랜 : 1234</span>
            </div>
        </div>

        <div className="contentBox boxStyle11"  style={{flexDirection:"row"}}>
            <div className='adminMain'>
                <img src="../../../images/icon/comments-regular.svg" alt="" />
            </div>
            
            <div className='adminMain' style={{flexDirection:"column", justifyContent:"center"}}>
                <p>고객 문의 현황</p>
                <span>신규 문의 : 1234 (최근 2일?)</span>
                <span>답변 대기 : 1234</span>
            </div>
        </div>

        <div className="contentBox boxStyle12 adminImg">
            <Link to="/config">
                <p>기본 설정 관리</p>
                <img src="../../../images/icon/screwdriver-wrench-solid.svg" alt="" />
            </Link>
        </div>

        <div className="contentBox boxStyle12 adminImg">
            <Link to="/userList">
                <p>회원 정보 관리</p>
                <img src="../../../images/icon/user-gear-solid (1).svg" alt="" />
            </Link>
        </div>

        <div className="contentBox boxStyle12 adminImg">
            <Link to="/articleList">
                <p>게시판 관리</p>
                <img src="../../../images/icon/folder-open-solid.svg" alt="" />
            </Link>
        </div>
    </MainLayout>   
  )
}

export default AdminMain