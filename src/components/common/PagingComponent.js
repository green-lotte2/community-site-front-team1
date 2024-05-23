import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PagingComponent = ({ articleList, onChange }) => {

  
  const handleInputChange = (i) => {
      console.log("자식 : " + i)
      onChange(i); // 콜백 함수 호출하여 값 전달
  };

    // articleList가 존재하고 total이 0보다 큰 경우에만 페이지 번호를 생성
    if (articleList && articleList.total > 0) {
        // 페이지 링크를 담을 배열 생성
        const pages = [];

        // articleList.startNo부터 articleList.endNo까지 반복하여 페이지 링크 생성
        for (let i = articleList.start; i <= articleList.end; i++) {
            // 현재 페이지인 경우 class에 "pageOn" 추가
            const pageClass = i === articleList.pg ? 'pageOn' : '';

            // Link 컴포넌트를 사용하여 페이지 링크 생성
            pages.push(
                <Link key={i} className={pageClass} onClick={() => handleInputChange(i)}>
                    {i}
                </Link>
            );
        }

        // 페이지 링크 배열을 UI로 반환
        return (
            <div className="contentColumn">
                <div className="paging">
                    {/* 이전 페이지 링크 */}
                    <Link to="#">이전</Link>
                    
                    {/* 생성된 페이지 링크 */}
                    {pages}

                    {/* 다음 페이지 링크 */}
                    <Link to="#">다음</Link>
                </div>
            </div>
        );
    } else {
        // articleList가 존재하지 않거나 total이 0인 경우 아무것도 렌더링하지 않음
        return null;
    }
};

export default PagingComponent;
