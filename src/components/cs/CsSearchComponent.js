import React from 'react'

const CsSearchComponent = () => {
  return (
    <div className="contentRow searchBox">
      <div className="searchRow">

        <input type="date" /> ~ 
        <input type="date" />

        <select style={{marginRight: "10px"}}>
            <option value="title">카테고리</option>
            <option value="content">결재관련</option>
            <option value="title+content">일정관련</option>
            <option value="writer">기타</option>
        </select>

        <select>
            <option value="title">답변상태</option>
            <option value="content">댑변대기</option>
            <option value="title+content">답변완료</option>
        </select>

        <label>
          <input type="checkbox" /> 기본정렬
        </label>

        <label>
          <input type="checkbox" /> 최신순
        </label>
      </div>

      <div className="searchRow">
        <select>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="title+content">제목+내용</option>
            <option value="writer">글쓴이</option>
        </select>

        <input type="text" style={{width:"200px"}}/>
        <input type="submit" value="검색" />

      </div>
    </div>
  )
}

export default CsSearchComponent