import React, { useEffect, useState } from 'react';
import ArticleHideModal from '../modal/ArticleHideModal';

// 밑에 2개 날짜 포맷
import Moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import { ArticleDelete } from '../../api/ArticleApi';

const ArticleModifyComponent = ({ articleList, setArticleList, selectedArticles, handleSelectArticle, selectAll }) => {
    console.log(articleList);

    // 모달창 활성화 여부 저장하는 useState
    const [modalOpen, setModalOpen] = useState({});

    // 모달창 오픈 핸들러
    const handleModalOpen = (index) => {
        setModalOpen((prev) => ({ ...prev, [index]: true }));
    };

    // 모달창 닫는 핸들러
    const handleModalClose = (index) => {
        setModalOpen((prev) => ({ ...prev, [index]: false }));
    };

    const deleteHandler = async (articleNo) => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await ArticleDelete({ articleNo });
                console.log('Before filter:', articleList.dtoList);
                const newList = articleList.dtoList.filter((article) => article.articleNo !== articleNo);
                console.log('After filter:', newList);
                setArticleList({ ...articleList, dtoList: newList });
                alert('게시글이 삭제되었습니다.');
            } catch (error) {
                console.error('Failed to delete article:', error);
                alert('게시글 삭제에 실패하였습니다.');
            }
        }
    };

    return (
        <>
            {articleList && articleList.dtoList.length > 0 ? (
                articleList.dtoList.map((article, index) => (
                    <div key={index} className="ModArticleRow">
                        <div>
                            <input
                                style={{ width: '20px', height: '20px' }}
                                type="checkbox"
                                checked={selectAll || selectedArticles.includes(article.articleNo)}
                                onChange={() => handleSelectArticle(article.articleNo)}
                            />
                        </div>
                        <div>{articleList.startNo - index}</div>
                        <div>{article.writer}</div>
                        <div>
                            <Link
                                to={`/view?articleNo=${article.articleNo}&articleCateNo=${article.articleCateNo}&pg=${articleList.pg}`}
                            >
                                {article.articleTitle}
                            </Link>
                        </div>
                        <div>{Moment(article.articleRdate).format('YY-MM-DD')}</div>

                        <div>
                            <button
                                className="nomalBtn"
                                style={{ fontSize: '14px' }}
                                onClick={() => deleteHandler(article.articleNo)}
                            >
                                삭제
                            </button>
                        </div>
                        {modalOpen[index] && (
                            <ArticleHideModal
                                articleData={article}
                                handleModalClose={() => handleModalClose(index)}
                            ></ArticleHideModal>
                        )}
                    </div>
                ))
            ) : (
                <div className="articleRow">게시글이 없습니다.</div>
            )}
        </>
    );
};

export default ArticleModifyComponent;
