import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('default');
  const [type, setType] = useState('title');
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    const isValidDate = (dateString) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return dateString.match(regex) !== null;
    };

    if (startDate && !isValidDate(startDate)) {
      console.error('Invalid start date format');
      return;
    }

    if (endDate && !isValidDate(endDate)) {
      console.error('Invalid end date format');
      return;
    }

    const searchParams = {
      startDate,
      endDate,
      sort,
      type,
      keyword,
    };
    onSearch(searchParams); // 부모 컴포넌트로 검색 매개변수 전달
  };

  return (
    <div className="contentRow searchBox">
      <div className="searchRow">
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        /> ~ 
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
        <label>
          <input 
            type="checkbox" 
            checked={sort === 'default'} 
            onChange={() => setSort('default')} 
          /> 기본정렬
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={sort === 'hit'} 
            onChange={() => setSort('hit')} 
          /> 조회순
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={sort === 'latest'} 
            onChange={() => setSort('latest')} 
          /> 최신순
        </label>
      </div>

      <div className="searchRow">
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="title+content">제목+내용</option>
          <option value="writer">글쓴이</option>
        </select>
        <input 
          type="text" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <input 
          type="submit" 
          value="검색" 
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
