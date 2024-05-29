import React, { useState } from 'react'
import { postSearch } from '../../api/CsApi';
import { useNavigate } from 'react-router-dom';

const CsSearchComponent = () => {

  const navigate = useNavigate();

  //받아야하는것 :  시작일, 끝일, 카테고리, 답변상태, 검색타입, 키워드
  const [searchParams, setSearchParams] = useState({
    csCate: '',
    csReply: '',
    startDate: '',
    endDate: '',
    type: '',
    keyword: '',
});


const searchHandler = async(e)=>{

  e.preventDefault();

  console.log("자 이제 고른걸로 검색을 하러갑시다!!!");

  const response = await postSearch(searchParams);

  if(response=='성공'){
    navigate('/');
  }
}

/*

//상태값이 업그레이드가 되는게 보장되지 않아서 찍어볼 수 없음!
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
  }));
  console.log("한번 찍어봅시다1 : "+searchParams.startDate);
  console.log("한번 찍어봅시다2 : ", searchParams.endDate);
};
*/

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setSearchParams((prevParams) => {
    const newParams = {
      ...prevParams,
      [name]: value,
    };
    console.log("한번 찍어봅시다1 : ", newParams.startDate);
    console.log("한번 찍어봅시다2 : ", newParams.endDate);
    console.log("한번 찍어봅시다3 : ", newParams.csCate);
    console.log("한번 찍어봅시다4 : ", newParams.csReply);
    console.log("한번 찍어봅시다5 : ",newParams.type);
    return newParams;
  });
};

  console.log("글 내용 찍어보기 : "+searchParams.keyword);

  return (
    <div className="contentRow searchBox">
      <div className="searchRow">

        <input type="date" name ="startDate" value={searchParams.startDate} onChange={handleInputChange}/> ~ 
        <input type="date" name="endDate" value={searchParams.endDate} onChange={handleInputChange}/>

        <select style={{marginRight: "10px"}} name="csCate" value={searchParams.csCate} onChange={handleInputChange}>
            <option value="" disabled hidden>카테고리</option>
            <option value="결재관련">결재관련</option>
            <option value="일정관련">일정관련</option>
            <option value="기타">기타</option>
        </select>

        <select name ="csReply" value={searchParams.csReply} onChange={handleInputChange}>
            <option  value="" disabled hidden>답변상태</option>
            <option value="0">답변대기</option>
            <option value="1">답변완료</option>
        </select>

        <label>
          <input type="checkbox" /> 기본정렬
        </label>

        <label>
          <input type="checkbox" /> 최신순
        </label>
      </div>

      <div className="searchRow">
        <select name ="type" value={searchParams.type} onChange={handleInputChange}>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="title+content">제목+내용</option>
            <option value="writer">글쓴이</option>
        </select>

        <input type="text" style={{width:"200px"}} name ="keyword" value={searchParams.keyword} onChange={handleInputChange}/>
        <input type="submit" value="검색" onClick={null}/>

      </div>
    </div>
  )
}

export default CsSearchComponent