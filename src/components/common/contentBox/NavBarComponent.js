import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../slice/LoginSlice';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../../api/RootUrl';

const NavBarComponent = () => {

// 저장된 로그인 인증 정보를 불러오는 Hook
const dispatch = useDispatch();
const loginSlice = useSelector((state) => state.loginSlice);

const rootURL = RootUrl();

const logoutHandler = () => {
  // 로그아웃 액션 실행
  dispatch(logout());
};

console.log(loginSlice)

  return (
    <div id="navbar">
        <div id="userBox">
          {!loginSlice.username ? (
            <Link to={"/login"}>로그인</Link>
          ) : (
            <>
              <Link to={"/myPage"}>{loginSlice.username}님</Link>
              <Link to={"/login"} onClick={logoutHandler}>로그아웃</Link>
              <img src={`${RootUrl()}/images/${loginSlice.userImg}`} alt=""/>
            </>
          )}
        </div>
    </div>
  )
}

export default NavBarComponent;