import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import SearchComponent from '../../components/article/SearchComponent';
import PagingComponent from '../../components/common/PagingComponent';

import { getArticleCate, ArticleList } from '../../api/ArticleApi';
import TableListComponent from '../../components/article/TableListComponent';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const roleView = {
    ADMIN: 3,
    MANAGER: 2,
    USER: 1,
};
const getRoleValue = (role) => roleView[role] || 0;

const ListPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');

    const [articleCateName, setArticleCateName] = useState(null);
    const [articleOutPut, setArticleOutPut] = useState(null);
    const [articleCateWRole, setArticleCateWRole] = useState(null);
    const [articleCateCoRole, setArticleCateCoRole] = useState(null);
    const [articleStatus, setArticleStatus] = useState(null);
    const [resetSearch, setResetSearch] = useState(false);

    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const role = loginSlice.userRole;
    const userRoleValue = getRoleValue(role);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleCate(articleCateNo);
                setArticleCateName(response.articleCateName);
                setArticleOutPut(response.articleCateOutput);
                setArticleCateWRole(response.articleCateWRole);
                setArticleCateCoRole(response.articleCateCoRole);
                setArticleStatus(response.articleStatus);
                setPageRequest((prev) => ({
                    ...prev,
                    articleCateNo: articleCateNo,
                    type: null,
                    keyword: null,
                    startDate: null,
                    endDate: null,
                    sort: 'default'
                }));
                setResetSearch(true); // Reset the search component
                setTimeout(() => setResetSearch(false), 0); // Reset the flag after a short delay
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

    const [pageRequest, setPageRequest] = useState({
        pg: pg,
        articleCateNo: articleCateNo,
        type: null,
        keyword: null,
        startDate: null,
        endDate: null,
        sort: 'default',
    });

    const [articleList, setArticleList] = useState(null);

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

                <SearchComponent onSearch={handleSearch} reset={resetSearch} />

                <div className="contentColumn">
                    <div className="listType">
                        <span className="listOn">리스트</span>
                        <span>카드형</span>
                    </div>
                </div>

                <div className={contentClassName}>
                    {articleRowClassName === "articleRow" && 
                        <div className="articleRow">
                            <div>NO</div>
                            <div>이미지</div>
                            <div>제목</div>
                            <div>조회수</div>
                            <div>작성자</div>
                            <div>날짜</div>
                        </div>
                    }

                    <TableListComponent
                        articleList={articleList}
                        articleRowClassName={articleRowClassName}
                        articleCateCoRole={articleCateCoRole}
                    />
                </div>

                <PagingComponent articleList={articleList} changePage={changePage}></PagingComponent>
                <div style={{ alignSelf: 'end' }}>
                    <Link className="btn" to="/">
                        뒤로
                    </Link>
                    {getRoleValue(articleCateWRole) <= userRoleValue && (
                        <Link className="btn" to={`/write?articleCateNo=${articleCateNo}&pg=${pageRequest.pg}`}>
                            글쓰기
                        </Link>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default ListPage;
