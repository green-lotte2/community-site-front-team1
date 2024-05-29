import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import TableListComponent from '../../components/article/TableListComponent';
import PagingComponent from '../../components/common/PagingComponent';
import { Link } from 'react-router-dom';

const ArticleModifyPage = () => {
      // pageNation 정보를 저장하는 useState
      const [pageNation, setPageNation] = useState({
        "pg" : 1,
        "articleCateNo" : 0,
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
            const response = await (pageNation);
            setArticleList(response);

        } catch (error) {
            console.log(error);
        }
    };

    fetchData();

    return () => {
        // 정리 함수
    };
    }, [pageNation]);

    // 페이지를 변경하는 함수 -> 자식컴포넌트(PagingComponent)로 전달해 pg값 변경 감지
    const handlePageChange = async (newPage) => {
        // 새로운 페이지 정보 가져오기
        const newPageNation = { ...pageNation, pg: newPage };
                
    };

    return (
    <MainLayout>
    <div className="contentBox boxStyle7">
        <div className="contentTitle font30 alignL">게시글 관리</div>
        
        <div className="contentColumn">
            <div className="adminArticleRow">
                <div>NO</div>
                <div>게시판 제목</div>
                <div>사용 여부</div>
                <div>읽기 권한</div>
                <div>쓰기 권한</div>
                <div>댓글 권한</div>
                <div>관리</div>
            </div>

            <TableListComponent></TableListComponent>
            
        </div>

        <PagingComponent 
            onPageChange={handlePageChange} 
        />
        <div className="contentColumn">
            <div className='createRow'>
                <Link to="">게시판 생성</Link>
            </div>
        </div>
    </div>     
    </MainLayout>
  )
}

export default ArticleModifyPage