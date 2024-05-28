import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import EditorBoxComponent from '../../components/article/EditorBoxComponent';
import { useLocation } from 'react-router-dom';
import { getArticleCate } from '../../api/ArticleApi';


const WritePage = () => {

  // URL에서 파라미터값 추출
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const articleCateNo = queryParams.get('articleCateNo');

  // 게시판 카테고리 저장을 위한 스테이트
const [articleCateName, setArticleCateName] = useState(null);

// 페이지 랜더링 될 때 호출(게시판 카테고리)
useEffect(() => {
const fetchData = async () => {
  try {
    const response = await getArticleCate(articleCateNo);
    setArticleCateName(response.articleCateName);
    
  } catch (error) {
    console.error('Failed to fetch article category:', error);
  }
};
fetchData();
}, []);
  return (
    <MainLayout>
      <div className="contentBox boxStyle7">
        <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>
          
        <div className='writeRow'>
          <EditorBoxComponent></EditorBoxComponent>
        </div>

      </div>     
    </MainLayout>
  )
}

export default WritePage;