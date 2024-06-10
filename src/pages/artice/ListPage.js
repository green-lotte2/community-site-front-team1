import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import SearchComponent from '../../components/article/SearchComponent';
import PagingComponent from '../../components/common/PagingComponent';

import { getArticleCate, ArticleList } from '../../api/ArticleApi';
import TableListComponent from '../../components/article/TableListComponent';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CreateCateModal from '../../components/modal/CreateCateModal';

const ListPage = () => {
    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');

    // 게시판 제목 상태 저장을 위한 스테이트
    const [articleCateName, setArticleCateName] = useState(null);
    const [articleOutPut, setArticleOutPut] = useState(null);

    const navigate = useNavigate();

    // 페이지 랜더링 될 때 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleCate(articleCateNo);
                setArticleCateName(response.articleCateName);
                setArticleOutPut(response.articleCateOutput);
                setPageRequest((prev) => ({ ...prev, articleCateNo: articleCateNo }));
            } catch (error) {
                console.error('Failed to fetch article category:', error);
            }
        };
        fetchData();
    }, [articleCateNo]);

    let pg = queryParams.get('pg');
    if (pg === null) {
        pg = 1;
    }

    // 서버에 전달할 페이지 정보를 저장하는 useState
    const [pageRequest, setPageRequest] = useState({
        pg: pg,
        articleCateNo: articleCateNo,
        type: null,
        keyword: null,
        startDate: null,
        endDate: null,
        sort: 'default',
    });

    // 서버에서 받아온 articleList 정보 저장하는 useState
    const [articleList, setArticleList] = useState(null);

    // 서버에서 게시글 목록 데이터를 가져오는 useEffect
    // useEffect 의존성배열에 pageRequest가 있어 pageRequest의 내용이 바뀔때마다 수행
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ArticleList(pageRequest);
                setArticleList(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [pageRequest]);

    console.log(articleList);

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageRequest((prevPageRequest) => {
            const updatedRequest = { ...prevPageRequest, pg: newPg };
            const newParam = { pg: newPg };
            const searchParams = new URLSearchParams(newParam).toString();
            navigate(`?articleCateNo=${articleCateNo}&${searchParams}`);
            return updatedRequest;
        });
    };

    const handleSearch = async (searchParams) => {
        const newPageNation = { ...pageRequest, ...searchParams, pg: 1 };

        console.log('검색 옵션:', searchParams);
        console.log('검색 결과:', newPageNation);

        try {
            const response = await ArticleList(newPageNation);
            setArticleList(response);
            setPageRequest(newPageNation);
        } catch (error) {
            console.log(error);
        }
    };

    const contentClassName = articleOutPut === 'list' ? 'contentColumn' : 'contentCard';
    const articleRowClassName = articleOutPut === 'list' ? 'articleRow' : 'articleCard';

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>

                <SearchComponent onSearch={handleSearch} />

                <div className="contentColumn">
                    <div className="listType">
                        <span className="listOn">리스트</span>
                        <span>카드형</span>
                    </div>
                </div>

                <div className={contentClassName}>
                    <div className="articleRow">
                        <div>NO</div>
                        <div>이미지</div>
                        <div>제목</div>
                        <div>조회수</div>
                        <div>작성자</div>
                        <div>날짜</div>
                    </div>

                    <TableListComponent articleList={articleList} articleRowClassName={articleRowClassName} />
                </div>

                <PagingComponent articleList={articleList} changePage={changePage}></PagingComponent>
                <div style={{ alignSelf: 'end' }}>
                    <Link className="btn" to="/main">
                        뒤로
                    </Link>
                    <Link className="btn" to={`/write?articleCateNo=${articleCateNo}&pg=${pageRequest.pg}`}>
                        글쓰기
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default ListPage;
