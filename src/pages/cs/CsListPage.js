import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import CsListComponent from '../../components/cs/CsListComponent'
import PagingComponent from '../../components/common/PagingComponent'
import CsSearchComponent from '../../components/cs/CsSearchComponent'

const CsListPage = () => {

    // 서버에 전달할 페이지 정보를 저장하는 useState 
    const [pageRequest, setPageRequest] = useState({
        "pg": 0,
        "cate": 0,
        "type": null,
        "keyword": null,
      });

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageRequest(prevPageRequest => ({...prevPageRequest, pg: newPg}));
    }

  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">QnA 게시판</div>

        <CsSearchComponent></CsSearchComponent>

        <div className="contentColumn">
            <div className="articleRow">
                <div>NO</div>
                <div>작성자</div>
                <div>제목</div>
                <div>작성일</div>
                <div>조회수</div>
                <div>답변상태</div>
            </div>

            <CsListComponent></CsListComponent>

            </div>
        </div>

        <PagingComponent changePage={changePage}></PagingComponent>


    </MainLayout>
  )
}

export default CsListPage