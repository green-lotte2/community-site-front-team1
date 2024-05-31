import React from 'react'

// 밑에 2개 날짜 포맷
import Moment from 'moment';
import "moment/locale/ko";
import { Link } from 'react-router-dom';

const TableListComponent = ({ articleList }) => {
    console.log(articleList);


  return (
    <>
    {articleList && articleList.dtoList.length > 0 ? (articleList.dtoList.map((article, index) => (
        <div key={index} className="articleRow">
            <div>{articleList.startNo - index}</div>
            <div>
            {article.articleThumb ? (
                <img src={article.articleThumb} alt="Thumbnail" style={{ width: '100px', height: '100px' }} /> /*<img src={article.articleThumb} alt="Thumbnail" />*/ // 이미지 썸네일 렌더링
            ) : (
                <img src="../images/iconSample5.PNG" alt="Thumbnail" />
            )}
                
            </div>
            
            <div>
                <Link to={`/view?articleNo=${article.articleNo}&articleCateNo=${article.articleCateNo}&pg=${articleList.pg}`}>{article.articleTitle}</Link>
            </div>
            <div>{article.articleHit}</div>
            <div>{article.writer}</div>
            <div>{/* 날짜 포맷(import 수동) / npm install moment --save */}
                    {Moment(article.articleRdate).format('YY-MM-DD')}</div>
        </div>
        ))
    ): (
        <div className="articleRow">
            게시글이 없습니다.
        </div>
    )}
    </>
  )
}

export default TableListComponent;