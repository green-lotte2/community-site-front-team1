import React from 'react'

const NavBarComponent = () => {
  return (
    <div id="navbar">
        <label class="searchBar" for="">
            <input type="text" placeholder="검색어를 입력해주세요."/>
            <span class="searchIcon"></span>
        </label>
        <div id="userBox">
            <div>홍길동님</div>
            <div>로그아웃</div>
            <img src="../images/iconSample3.png" alt=""/>
        </div>
    </div>
  )
}

export default NavBarComponent;