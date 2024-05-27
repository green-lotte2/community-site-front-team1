import React from 'react'

const UserSearchComponent = () => {
  return (
    <div className="contentRow searchBox">
        <div className='searchColumn'>
            <div className="searchRow">
                <span className='searchTitle'>상태</span>
                <select name="" id="">
                    <option value="">재직</option>
                    <option value="">퇴직</option>
                </select>

                <span className='space150'></span>

                <span className='searchTitle'>직급</span>
                <select name="" id="">
                    <option value="">사원</option>
                    <option value="">대리</option>
                </select>

                <span className='space150'></span>

                <span className='searchTitle'>직책</span>
                <select name="" id="">
                    <option value="">팀원</option>
                    <option value="">팀장</option>
                </select>

                <span className='space150'></span>

                <span className='searchTitle'>부서</span>
                <select name="" id="">
                    <option value="">인사팀</option>
                    <option value="">재무팀</option>
                </select>
            </div>

            <div className="searchRow">
                <span className='searchTitle'>입사일</span>
                <input type="date"/> ~ 
                <input type="date"/>

                <span className='space330'></span>

                <select name="" id="">
                    <option value="">이름</option>
                    <option value="">이메일</option>
                </select>
                <input type="text"/>
            </div>
        </div>
        <div className='contentColumn'>
            <div className="userSearchRow">
                <input type="submit" value="검색"/>
            </div>
        </div>
    </div>
  )
}

export default UserSearchComponent