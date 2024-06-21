import React, { useEffect, useState } from 'react';
import ArticleModal from '../modal/ArticleModal';
import PagingComponent from '../common/PagingComponent';
import { delArticleCateList, getArticleCateList } from '../../api/AdminApi';
import { RootUrl } from '../../api/RootUrl';

const ArticleListComponent = (articleList) => {
    // 모달창 활성화 여부 저장하는 useState
    const [modalOpen, setModalOpen] = useState({});
    const [articleCateList, setArticleCateList] = useState(null);

    // 모달창 오픈 핸들러
    const handleModalOpen = (index) => {
        setModalOpen((prev) => ({ ...prev, [index]: true }));
    };

    // 모달창 닫는 핸들러
    const handleModalClose = (index) => {
        window.location.reload();
        setModalOpen((prev) => ({ ...prev, [index]: false }));
    };

    const handleNavigation = (articleCateNo) => {
        const url = `articleModify?articleCateNo=${articleCateNo}&pg=1`;
        window.location.href = url;
    };

    // 게시판 삭제 핸들러
    const handleArticleDelete = async (index) => {
        const confirmed = window.confirm(
            '해당 게시판의 게시글이 모두 삭제 되어야 게시판 삭제가 가능합니다. 삭제하시겠습니까?'
        );
        if (confirmed) {
            try {
                await delArticleCateList(articleCateList[index].articleCateNo);
                const newList = articleCateList.filter((item, i) => i !== index);
                setArticleCateList(newList);
                window.location.reload();
            } catch (err) {
                console.log('게시판 삭제 실패', err);
            }
        }
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
    }, [articleList]);

    return (
        <>
            {articleCateList && articleCateList.length > 0 ? (
                articleCateList.map((cate, index) => (
                    <div className="adminArticleRow" key={index}>
                        <div>{articleCateList.length - index}</div>
                        <div>
                            {cate.articleCateName} [ {cate.articleCount} ]
                        </div>
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
                            <span className="nomalBtn" onClick={() => handleNavigation(cate.articleCateNo)}>
                                게시물 관리
                            </span>
                        </div>

                        <PagingComponent></PagingComponent>

                        {modalOpen[index] && (
                            <ArticleModal
                                cateData={cate}
                                handleModalClose={(modifiedData) => handleModalClose(index, modifiedData)}
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
