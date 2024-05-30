import React, { useState } from 'react'
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
  onSearch(searchParams);
};

const ChageCheckBox1 = () => {

  setIsChecked1(!isChecked1)

}

const ChageCheckBox2 = () => {

  setIsChecked2(!isChecked2)

}
/*

 // 최신순 체크박스 상태 변경 시 호출될 함수
 const handleChange1 = () => {
  setIsChecked1(!isChecked1); // 체크 상태 반전
  setSearchParams((prevParams) => ({
    ...prevParams,
    latest: !isChecked1 ? 1 : 0, // 현재 상태 반영하여 업데이트
  }));

  if (isChecked1) {
    handleSearch(); // 최신순 체크가 되었을 때 검색 실행
  }
};
*/

const handleChange1 = () => {
  console.log("전 : " + searchParams.latest)


  if(isChecked1){
    setIsChecked2(false);
  }

  if (searchParams.latest==0){
    setSearchParams((prevParams) => ({
      ...prevParams,
      latest: searchParams.latest+1 // 현재 상태 반영하여 업데이트
    }));
    console.log("하이")
  }
  else {
    setSearchParams((prevParams) => ({
      ...prevParams,
      latest: searchParams.latest-1 // 현재 상태 반영하여 업데이트
    }));

  }

  

  console.log('here1');
  const updatedIsChecked1 = !isChecked1; // 체크 상태 반전

   setIsChecked1(updatedIsChecked1); // 상태 업데이트 반영

   if (updatedIsChecked1) {
    setIsChecked2(false); // 첫 번째 체크박스가 선택되면 두 번째 체크박스를 해제
    setSearchParams(prevParams => ({
      ...prevParams,
      hit: 0 // 두 번째 체크박스 상태를 업데이트
    }));
    handleSearch(); // 최신순 체크가 되었을 때 검색 실행
  }

  handleSearch();

};

const handleChange2 = () => {
  if (searchParams.hit==0){
    setSearchParams((prevParams) => ({
      ...prevParams,
      hit: searchParams.hit+1 // 현재 상태 반영하여 업데이트
    }));
    console.log("하이")
  }
  else {
    setSearchParams((prevParams) => ({
      ...prevParams,
      hit: searchParams.hit-1 // 현재 상태 반영하여 업데이트
    }));

  }

  console.log('here1');
  const updatedIsChecked2 = !isChecked2; // 체크 상태 반전

  setIsChecked2(updatedIsChecked2); // 상태 업데이트 반영

  if (updatedIsChecked2) {
    setIsChecked1(false); // 두 번째 체크박스가 선택되면 두 번째 체크박스를 해제
    setSearchParams(prevParams => ({
      ...prevParams,
      latest: 0 // 첫 번째 체크박스 상태를 업데이트
    }));
    handleSearch(); // 최신순 체크가 되었을 때 검색 실행
  }

  handleSearch();

};


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
    console.log("한번 찍어봅시다6 : ",newParams.latest);
    return newParams;
  });

};

  //console.log("글 내용 찍어보기 : "+searchParams.keyword);

  return (
    <div className="contentRow searchBox">
      <div className="searchRow">

        <input type="date" name ="startDate" value={searchParams.startDate} onChange={handleInputChange}/> ~ 
        <input type="date" name="endDate" value={searchParams.endDate} onChange={handleInputChange}/>

        <select style={{marginRight: "10px"}} name="csCate" value={searchParams.csCate} onChange={handleInputChange}>
            <option value="" disabled hidden>카테고리</option>
            <option value="결제관련">결재관련</option>
            <option value="일정관련">일정관련</option>
            <option value="기타">기타</option>
        </select>

        <select name ="csReply" value={searchParams.csReply} onChange={handleInputChange}>
            <option  value="" disabled hidden>답변상태</option>
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