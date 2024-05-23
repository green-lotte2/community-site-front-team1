import React from 'react'

const TableListComponent = ({ articleList }) => {
    console.log(articleList);

  return (
    <>
    {articleList && articleList.dtoList.length > 0 ? (articleList.dtoList.map((article, index) => (
        <div className="articleRow">
            <div>{index+1}</div>
            <div>
            {article.thumbnail ? (
                <img src="../images/iconSample5.PNG" alt=""/>
            ) : (
                <img src="../images/iconSample5.PNG" alt=""/>
            )}
                
            </div>
            <div>{article.articleTitle}</div>
            <div>{article.articleHit}</div>
            <div>{article.writer}</div>
            <div>{article.articleRdate}</div>
        </div>
        ))
    ): (
        <div className="articleRow">
            없음
        </div>
    )}
    </>
  )
}

export default TableListComponent;