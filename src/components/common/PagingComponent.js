import React from 'react'

const PagingComponent = ({articleList, changePage}) => {


    // 페이징 처리 함수 (버튼 생성)
    const pages = [];
    if (articleList && articleList.total > 0) {
        for (let i = articleList.start; i <= articleList.end; i++) {
            const pageClass = i === articleList.pg ? 'pageOn' : '';
            pages.push(
                <button className={pageClass} onClick={() => changePage(i)}>{i}</button>
            );
        }
    }
    const prev = [];
    if (articleList && articleList.prev) {
        prev.push(
            <button onClick={() => changePage(articleList.start - 1)}>이전</button>
        );
    }
    const next = [];
    if (articleList && articleList.next) {
        next.push(
            <button onClick={() => changePage(articleList.end + 1)}>다음</button>
        );
    }

  return (
    <div className='paging'>
        {prev}
        {pages}
        {next}
    </div>
  )
}

export default PagingComponent