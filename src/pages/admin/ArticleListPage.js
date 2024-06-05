import React, { useEffect, useState } from 'react';
import PagingComponent from '../../components/common/PagingComponent';
import TableListComponent from '../../components/article/TableListComponent';
import SearchComponent from '../../components/article/SearchComponent';
import MainLayout from '../../layout/MainLayout';
import ArticleListComponent from '../../components/admin/ArticleListComponent';
import { Link } from 'react-router-dom';
import CreateCateModal from '../../components/modal/CreateCateModal';
import { getArticleCateList } from '../../api/AdminApi';

const ArticleListPage = () => {
    // pageNation 정보를 저장하는 useState
    const [pageNation, setPageNation] = useState({
        pg: 1,
        articleCateNo: 0,
        type: null,
        keyword: null,
    });

    // 서버에서 받아온 resopnseDTO를 저장하는 useState
    const [articleList, setArticleList] = useState(null);
    const [loading, setLoading] = useState(true);

    // 서버에서 데이터를 받아오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 컴포넌트화된 axios 함수 사용해 서버 접근
                const response = await pageNation;
                setArticleList(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
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

    /** 게시판 생성 */
    const [createCateModal, setCreateCateModal] = useState(false);

    const openModal = () => {
        setCreateCateModal(!createCateModal);
    };

    const handleModalClose = () => {
        setCreateCateModal(false);
        window.location.reload();
    };

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">게시판 관리</div>

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

                    {loading ? <div>Loading...</div> : <ArticleListComponent articleList={articleList} />}
                </div>

                <PagingComponent onPageChange={handlePageChange} />
                <div className="contentColumn">
                    <div className="createRow">
                        <Link to="" onClick={openModal}>
                            게시판 생성
                        </Link>
                    </div>
                </div>
            </div>

            {createCateModal && <CreateCateModal handleModalClose={handleModalClose} />}
        </MainLayout>
    );
};

export default ArticleListPage;
