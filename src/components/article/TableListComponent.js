import React from 'react';

// 밑에 2개 날짜 포맷
import Moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';

const TableListComponent = ({ articleList, articleRowClassName }) => {
    console.log(articleList);

    return (
        <>
            {articleList && articleList.dtoList.length > 0 ? (
                articleList.dtoList.map((article, index) => (
                    <div key={index} className={articleRowClassName}>
                        <div>{articleList.startNo - index}</div>
                        <div>
                            {article.articleThumb ? (
                                <img src={`${RootUrl()}/images/orgArtImage/${article.articleThumb}`} alt="Thumbnail" />
                            ) : (
                                <img src="../images/iconSample5.PNG" alt="Thumbnail" />
                            )}
                        </div>

                        <div>
                            <Link
                                to={`/view?articleNo=${article.articleNo}&articleCateNo=${article.articleCateNo}&pg=${articleList.pg}`}
                            >
                                {article.articleTitle}
                            </Link>
                        </div>
                        <div>{article.articleHit}</div>
                        <div>{article.writer}</div>
                        <div>
                            {/* 날짜 포맷(import 수동) / npm install moment --save */}
                            {Moment(article.articleRdate).format('YY-MM-DD')}
                        </div>
                    </div>
                ))
            ) : (
                <div className="articleRow">게시글이 없습니다.</div>
            )}
        </>
    );
};

export default TableListComponent;
