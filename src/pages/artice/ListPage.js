import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import SearchComponent from '../../components/article/SearchComponent'
import PagingComponent from '../../components/common/PagingComponent'
import { getList } from '../../api/ArticleApi'
import TableListComponent from '../../components/article/TableListComponent'
import { useLocation } from 'react-router-dom'

const ListPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');

    const [articleList, setArticleList] = useState(null);

    let data = {
      "pg" : 1,
      "articleCateNo" : 1,
      "type" : null,
      "keyword" : null
    }
    console.log(articleCateNo);

    const [pgValue, setPgValue] = useState('');

    const pgChangeHandler = (newValue) => {
      setPgValue(newValue);
      data.pg = newValue;
      console.log("pg : " + pgValue);
   };


    useEffect(() => {
      const fetchData = async () => {
        try {
            // 컴포넌트화된 axios 함수 사용해 서버 접근
            const response = await getList(data);
            setArticleList(response);
        } catch (error) {
            // 오류 처리
            console.log(error);
        }
      };
  
      fetchData();
  
      return () => {
        // 정리 함수
        
      };
    }, [data.pg]);

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

            <PagingComponent articleList={articleList} onChange={pgChangeHandler}></PagingComponent>
        </div>     
    </MainLayout>
  )
}

export default ListPage