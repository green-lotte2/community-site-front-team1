import React from 'react'
import { Link } from 'react-router-dom'

const UserListComponent = () => {
  return (
    <div className="adminUserRow">
        <div>1</div>
        <div>재직</div>
        <div>홍길동</div>
        <div>사원</div>
        <div>팀원</div>
        <div>재무팀</div>
        <div>2013.05.01</div>
        <div>abcd1234@gmail.com</div>
        <div>
            {/* 파라미터로 no값 들고 가기 */}
            <Link to="/userModify">수정</Link>
        </div>
    </div>
  )
}

export default UserListComponent