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
    const [modalOpen, setModalOpen] = useState({});
    const [articleCateList, setArticleCateList] = useState(null);

    // 모달창 오픈 핸들러
    const handleModalOpen = (index) => {
        setModalOpen((prev) => ({ ...prev, [index]: true }));
    };
    // 모달창 닫는 핸들러
    const handleModalClose = (index) => {
        setModalOpen((prev) => ({ ...prev, [index]: false }));
    };
    // 게시판 삭제 핸들러
    const handleArticleDelete = (index) => {
        console.log(index);
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
    }, [handleModalClose]);

    return (
        <>
            {articleCateList && articleCateList.length > 0 ? (
                articleCateList.map((cate, index) => (
                    <div className="adminArticleRow" key={index}>
                        <div>{articleCateList.length - index}</div>
                        <div>{cate.articleCateName}</div>
                        <div>{cate.articleCateStatus === 0 ? '비활성화' : '활성화'}</div>
                        <div>{cate.articleCateVRole}</div>
                        <div>{cate.articleCateWRole}</div>
                        <div>{cate.articleCateCoRole}</div>
                        <div>
                            <span className="nomalBtn" onClick={() => handleModalOpen(index)}>
                                권한변경
                            </span>
                            <span className="nomalBtn" onClick={() => handleArticleDelete(index)}>
                                삭제
                            </span>
                        </div>

                        <PagingComponent></PagingComponent>

                        {modalOpen[index] && (
                            <ArticleModal
                                cateData={cate}
                                handleModalClose={() => handleModalClose(index)}
                            ></ArticleModal>
                        )}
                    </div>
                ))
            ) : (
                <div className="adminArticleRow">결과가 없습니다.</div>
            )}
        </>
    );
};

export default ArticleListComponent;
