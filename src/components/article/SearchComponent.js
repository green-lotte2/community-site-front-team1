import React, { useEffect, useState } from 'react';

const SearchComponent = ({ onSearch, reset }) => {
  const [isCheckedDefault, setIsCheckedDefault] = useState(true);
  const [isCheckedLatest, setIsCheckedLatest] = useState(false);
  const [isCheckedHit, setIsCheckedHit] = useState(false);

  const [searchParams, setSearchParams] = useState({
    startDate: '',
    endDate: '',
    sort: 'default',
    type: 'title',
    keyword: ''
  });

  const handleSearch = () => {
    onSearch(searchParams);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams.sort]);

  useEffect(() => {
    if (reset) {
      setSearchParams({
        startDate: '',
        endDate: '',
        sort: 'default',
        type: 'title',
        keyword: ''
      });
      setIsCheckedDefault(true);
      setIsCheckedLatest(false);
      setIsCheckedHit(false);
    }
  }, [reset]);

  const handleChangeDefault = () => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      sort: 'default'
    }));

    setIsCheckedDefault(true);
    setIsCheckedLatest(false);
    setIsCheckedHit(false);
  };

  const handleChangeLatest = () => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      sort: 'latest'
    }));

    setIsCheckedLatest(true);
    setIsCheckedDefault(false);
    setIsCheckedHit(false);
  };

  const handleChangeHit = () => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      sort: 'hit'
    }));

    setIsCheckedHit(true);
    setIsCheckedDefault(false);
    setIsCheckedLatest(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <div className="contentRow searchBox">
      <div className="searchRow">
        <input 
          type="date" 
          name="startDate" 
          value={searchParams.startDate} 
          onChange={handleInputChange} 
        /> ~ 
        <input 
          type="date" 
          name="endDate" 
          value={searchParams.endDate} 
          onChange={handleInputChange} 
        />
        <label>
          <input 
            type="checkbox" 
            checked={isCheckedDefault} 
            onChange={handleChangeDefault} 
          /> 기본정렬
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={isCheckedHit} 
            onChange={handleChangeHit} 
          /> 조회순
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={isCheckedLatest} 
            onChange={handleChangeLatest} 
          /> 최신순
        </label>
      </div>

      <div className="searchRow">
        <select 
          name="type" 
          value={searchParams.type} 
          onChange={handleInputChange}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="title+content">제목+내용</option>
          <option value="writer">글쓴이</option>
        </select>
        <input 
          type="text" 
          name="keyword" 
          value={searchParams.keyword} 
          onChange={handleInputChange} 
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
