import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import SearchComponent from '../../components/article/SearchComponent'
import PagingComponent from '../../components/common/PagingComponent'
import { getList } from '../../api/ArticleApi'
import TableListComponent from '../../components/article/TableListComponent'
import { useLocation } from 'react-router-dom'

const ListPage = () => {
    // 페이지 최초 접근시 카테고리값 확인을 위해 URL에서 파라미터 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');

    // pageNation 정보를 저장하는 useState
    const [pageNation, setPageNation] = useState({
      "pg" : 1,
      "articleCateNo" : articleCateNo,
      "type" : null,
      "keyword" : null
    });

    // 서버에서 받아온 resopnseDTO를 저장하는 useState
    const [articleList, setArticleList] = useState(null);
    
    // 서버에서 데이터를 받아오는 useEffect
    useEffect(() => {
      const fetchData = async () => {
        try {
            // 컴포넌트화된 axios 함수 사용해 서버 접근
            const response = await getList(pageNation);
            setArticleList(response);

        } catch (error) {
            console.log(error);
        }
      };
  
      fetchData();
  
      return () => {
        // 정리 함수
      };
    }, []);

    // 페이지를 변경하는 함수 -> 자식컴포넌트(PagingComponent)로 전달해 pg값 변경 감지
    const handlePageChange = async (newPage) => {
      // 새로운 페이지 정보 가져오기
      const newPageNation = { ...pageNation, pg: newPage };
      
      try {
          // 새로운 페이지 정보로 데이터 가져오기
          const response = await getList(newPageNation);
          setArticleList(response);
          // 페이지 정보 업데이트
          setPageNation(newPageNation);
      } catch (error) {
          console.log(error);
      }
  };
    

  return (
    <MainLayout>
      <div className="contentBox boxStyle7">
        <div className="contentTitle font30 alignL">ㅁㅁㅁ 게시판</div>
        
        <SearchComponent></SearchComponent>

        <div className="contentColumn">
            <div className="listType">
                <span className="listOn">리스트</span>
                <span>카드형</span>
            </div>
        </div>

        <div className="contentColumn">
            <div className="articleRow">
                <div>NO</div>
                <div>이미지</div>
                <div>제목</div>
                <div>조회수</div>
                <div>작성자</div>
                <div>날짜</div>
            </div>

            <TableListComponent articleList={articleList}></TableListComponent>
            
        </div>

        <PagingComponent 
            articleList={articleList} 
            onPageChange={handlePageChange} 
        />
      </div>     
    </MainLayout>
  )
}

export default ListPage