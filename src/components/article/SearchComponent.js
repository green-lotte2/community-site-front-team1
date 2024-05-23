import React from 'react'

const SearchComponent = () => {
  return (
    <div class="contentRow searchBox">
        <div class="searchRow">
            <input type="date"/> ~ 
            <input type="date"/>
            <label for="">
                <input type="checkbox" name="" id=""/> 기본정렬
            </label>
            <label for="">
                <input type="checkbox" name="" id=""/> 조회순
            </label>
            <label for="">
                <input type="checkbox" name="" id=""/> 최신순
            </label>
        </div>

        <div class="searchRow">
            <select name="" id="">
                <option value="">제목</option>
                <option value="">내용</option>
                <option value="">글쓴이</option>
            </select>
            <input type="text"/>
            <input type="submit" value="검색"/>
        </div>
    </div>
  )
}

export default SearchComponent