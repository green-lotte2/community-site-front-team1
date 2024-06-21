import React, { useEffect, useState } from 'react'
import { postSearch } from '../../api/CsApi';
import { useNavigate } from 'react-router-dom';

const CsSearchComponent = ({onSearch}) => {

  const navigate = useNavigate();
 

  const [isChecked1,setIsChecked1] = useState(false);
  const [isChecked2,setIsChecked2] = useState(false);


  //받아야하는것 :  시작일, 끝일, 카테고리, 답변상태, 검색타입, 키워드
  const [searchParams, setSearchParams] = useState({
    csCate: '',
    csReply: '',
    startDate: '',
    endDate: '',
    type: '',
    keyword: '',
    latest:0,
    hit:0

});


const handleSearch = () => {

  if(searchParams.type!='' && searchParams.keyword==''){
    alert("검색어를 입력해주세요!");
  }else{
    onSearch(searchParams);
  }
};

useEffect(() => {
  if (searchParams.latest || searchParams.hit) {
    handleSearch();
  }
}, [searchParams.latest, searchParams.hit]);

const handleChange1 = () => {
  const newLatest = isChecked1 ? 0 : 1;

  setSearchParams((prevParams) => ({
    ...prevParams,
    latest: newLatest,
    hit: 0 // 첫 번째 체크박스가 선택되면 두 번째 체크박스를 해제
  }));

  setIsChecked1((prev) => !prev);
  setIsChecked2(false);
};

const handleChange2 = () => {
  const newHit = isChecked2 ? 0 : 1;

  setSearchParams((prevParams) => ({
    ...prevParams,
    hit: newHit,
    latest: 0 // 두 번째 체크박스가 선택되면 첫 번째 체크박스를 해제
  }));

  setIsChecked2((prev) => !prev);
  setIsChecked1(false);
};


const handleInputChange = (e) => {

  const { name, value } = e.target;

    setSearchParams((prevParams) => ({
      ...prevParams,
      //[name]: name === 'startDate' || name === 'endDate' ? new Date(value).toISOString() : value,
    [name]: value,
    }));
  
  };

  //console.log("글 내용 찍어보기 : "+searchParams.keyword);

  return (
    <div className="contentRow searchBox">
      <div className="searchRow">

        <input type="date" name ="startDate" value={searchParams.startDate} onChange={handleInputChange}/> ~ 
        <input type="date" name="endDate" value={searchParams.endDate} onChange={handleInputChange}/>

        <select style={{marginRight: "10px"}} name="csCate" value={searchParams.csCate} onChange={handleInputChange}>
            <option value="">카테고리</option>
            <option value="결재관련">결재관련</option>
            <option value="일정관련">일정관련</option>
            <option value="기타">기타</option>
        </select>

        <select name ="csReply" value={searchParams.csReply} onChange={handleInputChange}>
            <option value="">답변상태</option>
            <option value="0">답변대기</option>
            <option value="1">답변완료</option>
        </select>

        <label>
          <input type="checkbox" name ="latest" checked={isChecked1} onChange={handleChange1} disabled={isChecked2}/> 최신순
        </label>

        <label>
          <input type="checkbox" name="hit" checked={isChecked2} onChange={handleChange2} disabled={isChecked1}/> 조회순
        </label>
      </div>

      <div className="searchRow">
        <select name ="type" value={searchParams.type} onChange={handleInputChange}>
            <option value="">검색선택</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="title+content">제목+내용</option>
            <option value="writer">글쓴이</option>
        </select>

        <input type="text" style={{width:"200px"}} name ="keyword" value={searchParams.keyword} onChange={handleInputChange}/>
        <input type="submit" value="검색" onClick={handleSearch}/>

      </div>
    </div>
  )
}

export default CsSearchComponent