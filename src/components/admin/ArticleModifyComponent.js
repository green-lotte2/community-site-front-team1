import React from 'react'

// 밑에 2개 날짜 포맷
import Moment from 'moment';
import "moment/locale/ko";
import { Link } from 'react-router-dom';

const ArticleModifyComponent = ({ articleList }) => {
    console.log(articleList);


  return (
    <>
    {articleList && articleList.dtoList.length > 0 ? (articleList.dtoList.map((article, index) => (
        <div key={index} className="articleRow">
            <div>{articleList.total - index}</div>
            <div>{article.writer}</div>
            <div>{article.articleTitle}</div>
            <div style={{width:"150px"}}>{Moment(article.articleRdate).format('YY-MM-DD')}</div>
            <div style={{width:"100px"}}>좋음</div>
            <div>
                <button className='nomalBtn' style={{fontSize:"14px"}}>숨김</button>
                <button className='nomalBtn' style={{fontSize:"14px"}}>삭제</button>
            </div>
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

export default ArticleModifyComponent