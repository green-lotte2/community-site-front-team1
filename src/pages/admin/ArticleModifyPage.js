import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import TableListComponent from '../../components/article/TableListComponent';
import PagingComponent from '../../components/common/PagingComponent';
import { Link, useLocation } from 'react-router-dom';
import SearchComponent from '../../components/article/SearchComponent';

import { getArticleCate, getArticleDelete, getArticleList } from '../../api/ArticleApi';

import ArticleModifyComponent from '../../components/admin/ArticleModifyComponent';

const ArticleModifyPage = () => {

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');

    // 게시판 제목 상태 저장을 위한 스테이트
    const [articleCateName, setArticleCateName] = useState(null);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedArticles, setSelectedArticles] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedArticles(articleList.dtoList.map((article) => article.articleNo));
        } else {
            setSelectedArticles([]);
        }
    };

    const handleSelectArticle = (articleNo) => {
        if (selectedArticles.includes(articleNo)) {
            setSelectedArticles(selectedArticles.filter((id) => id !== articleNo));
        } else {
            setSelectedArticles([...selectedArticles, articleNo]);
        }

    };

    // 선택 삭제 핸들러
    const handleDeleteSelected = async () => {
        const confirmed = window.confirm('선택된 게시글을 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await Promise.all(selectedArticles.map((articleNo) => getArticleDelete({ articleNo })));

                alert('선택된 게시글이 삭제되었습니다.');
            } catch (error) {
                console.error('Failed to delete selected articles:', error);
                alert('선택된 게시글 삭제에 실패하였습니다.');
            }
        }
    };

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
    useEffect(() => {
        const fetchArticleData = async () => {
            try {
                const [cateResponse, listResponse] = await Promise.all([
                    getArticleCate(articleCateNo),
                    getArticleList(pageRequest),
                ]);
                setArticleCateName(cateResponse.articleCateName);
                setArticleList(listResponse);
            } catch (error) {
                console.error('Failed to fetch article data:', error);
            }
        };
        fetchArticleData();
    }, [articleCateNo, pageRequest, articleList]);

    console.log(articleList);

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageRequest((prevPageRequest) => ({ ...prevPageRequest, pg: newPg }));
    };


    const handleSearch = async (searchParams) => {
        const newPageNation = { ...pageRequest, ...searchParams, pg: 1 };

        console.log('검색 옵션:', searchParams);
        console.log('검색 결과:', newPageNation);


        try {
            const response = await getArticleList(newPageNation);
            setArticleList(response);
            setPageRequest(newPageNation);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">{articleCateName} 게시글 관리</div>

                <SearchComponent onSearch={handleSearch} />

                <div className="contentColumn">
                    <div className="ModArticleRowTitle">
                        <div>
                            <input
                                style={{ width: '20px', height: '20px' }}
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </div>
                        <div>NO</div>
                        <div>작성자</div>
                        <div>제목</div>
                        <div style={{ width: '150px' }}>날짜</div>
                        <div style={{ width: '100px' }}>상태</div>
                        <div>관리</div>
                    </div>

                    <ArticleModifyComponent
                        articleList={articleList}
                        setArticleList={setArticleList}
                        selectedArticles={selectedArticles}
                        handleSelectArticle={handleSelectArticle}
                        selectAll={selectAll}
                    />
                </div>
                <button className="delBtn" style={{ fontSize: '14px' }} onClick={handleDeleteSelected}>
                    선택 삭제
                </button>
                <PagingComponent articleList={articleList} changePage={changePage}></PagingComponent>
            </div>
        </MainLayout>
    );
};

export default ArticleModifyPage;
