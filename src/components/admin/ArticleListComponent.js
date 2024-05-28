import React, { useEffect, useState } from 'react';
import ArticleModal from '../modal/ArticleModal';
import PagingComponent from '../common/PagingComponent';
import { getArticleCateList, getUserList } from '../../api/AdminApi';

const ArticleListComponent = () => {
    // 모달 컴포넌트로 넘겨야할 요소들이 많음
    // 모달창 닫는 핸들러
    // 해당 게시판의 현재 활성화 여부 useState
    // 상태를 변경할 핸들러 + useState

    // 모달창 활성화 여부 저장하는 useState
    const [modalOpen, setModalOpen] = useState(false);
    const [articleCateList, setArticleCateList] = useState(null);

    // 모달창 오픈 핸들러
    const handleModalOpen = () => {
        return setModalOpen(true);
    };
    // 모달창 닫는 핸들러
    const handleModalClose = (event) => {
        const modalClose = document.getElementsByClassName('modalClose');
        Array.from(modalClose).forEach(function (each) {
            if (event.target === each) {
                return setModalOpen(false);
            }
        });
    };
    // 게시판 삭제 핸들러
    const handleArticleDelete = () => {
        alert('삭제');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleCateList();
                setArticleCateList(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {articleCateList && articleCateList.length > 0 ? (
                articleCateList.map((cate, index) => (
                    <div className="adminArticleRow">
                        <div>{articleCateList.length - index}</div>
                        <div>{cate.articleCateName}</div>
                        <div>{cate.articleCateStatus === 0 ? '비활성화' : '활성화'}</div>
                        <div>{cate.articleCateVRole}</div>
                        <div>{cate.articleCateWRole}</div>
                        <div>{cate.articleCateCoRole}</div>
                        <div>
                            <span className="nomalBtn" onClick={handleModalOpen}>
                                권한변경
                            </span>
                            <span className="nomalBtn" onClick={handleArticleDelete}>
                                삭제
                            </span>
                        </div>

                        <PagingComponent></PagingComponent>

                        {modalOpen && <ArticleModal cateData={cate} handleModalClose={handleModalClose}></ArticleModal>}
                    </div>
                ))
            ) : (
                <div className="adminArticleRow">결과가 없습니다.</div>
            )}
        </>
    );
};

export default ArticleListComponent;
