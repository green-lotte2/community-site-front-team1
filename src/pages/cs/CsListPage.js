import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import CsListComponent from '../../components/cs/CsListComponent'
import PagingComponent from '../../components/common/PagingComponent'
import CsSearchComponent from '../../components/cs/CsSearchComponent'
import axios from 'axios';
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { postCsList,postCsSearch } from '../../api/CsApi'
import { useSelector } from 'react-redux'
import { getCookie } from '../../util/cookieUtil'


const initState = {
  dtoList: [],
  cate: null,
  pg: 0,
  size: 0,
  total: 0,
  startNo: 0,
  start: 0,
  end: 0,
  prev: false,
  next: false,
};

const auth = getCookie("auth");



const CsListPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    let pg = queryParams.get('pg');// URL에서 파라미터값 추출
    if (pg === null) {
        pg = 1;
    }

    const navigate = useNavigate();

    const [isCheck,setIsCheck] = useState(false);

    const [serverData, setServerData] = useState(initState); 
   

    // 서버에 전달할 페이지 정보를 저장하는 useState 
    const [pageRequest, setPageRequest] = useState({
        "pg": pg,
        "csCate": '',
        "csTitle":'',
        "csReply":'',
        "type": '',
        "keyword": '',
        "startDate":'',
        "endDate":'',
        "latest":'',
        "hit":'',
        "stfNo":auth?.userId,
        "stfRole":auth?.userRole
      });

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageRequest(prevPageRequest => {
            const updatedRequest = { ...prevPageRequest, pg: newPg };
            const newParam = {pg : newPg};
            const searchParams = new URLSearchParams(newParam).toString();
            navigate(`?${searchParams}`);
            return updatedRequest;
        });
    }
 
      // 페이지 랜더링 될 때 호출
      useEffect(() => {
        const fetchCsList = async () =>{
          console.log("cs페이지 호출될때, 여기에 들어오지?");   
          

          if(!isCheck){//제일 처음 list출력
              try{
                //console.log("보낼 값에 뭐가 들어있는지는 보자 : "+pageRequest.csCate);//잘나오거든?
                const response = await postCsList(pageRequest);
                setServerData(response);
                console.log("전체 리스트 출력 : "+response);

              }catch(err){
                  console.log(err);
              }
          }else{//검색 list 출력
              try{
                const response = await postCsSearch(pageRequest);
                setServerData(response);
                console.log("검색 리스트 출력 : "+response);

              }catch(err){
                console.log(err);
              }

          }
        }
        fetchCsList();
      }, [pageRequest]);

      const handleSearch = (searchParams) => {

        console.log('handleSearch!');

        setIsCheck(true);

        setPageRequest(prevPageRequest => ({ ...prevPageRequest, ...searchParams, pg: 1 }));
    };
  

  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">QnA 게시판</div>

        <CsSearchComponent onSearch={handleSearch}></CsSearchComponent>

        <div className="contentColumn">
            <div className="articleRow">
                <div>NO</div>
                <div>작성자</div>
                <div>제목</div>
                <div style={{width: "150px"}}>작성일</div>
                <div>조회수</div>
                <div>답변상태</div>
            </div>

            <CsListComponent serverData={serverData}></CsListComponent>

            </div>

            <PagingComponent articleList={serverData} changePage={changePage}></PagingComponent>
            <div style={{alignSelf:"end"}}>
              <Link className='btn' to="/">뒤로</Link>
              <Link className='btn' to="/csWrite" >글쓰기</Link>
            </div>
        </div>


    </MainLayout>
  )
}

export default CsListPage;