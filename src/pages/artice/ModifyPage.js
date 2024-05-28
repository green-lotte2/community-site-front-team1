import React, { useEffect, useState } from 'react'
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import MainLayout from '../../layout/MainLayout'
import { getArticleCate, getArticleModify } from '../../api/ArticleApi';
import { useLocation, useNavigate } from 'react-router-dom';

const ModifyPage = () => {
  const navigate = useNavigate();

    const completeHandler = () => {
      alert("수정완료")
  }

  const cancelHandler = () => {
    setTimeout(() => {
      navigate(`/view?articleNo=${articleNo}&articleCateNo=${articleCateNo}&pg=1`);
    }, 0);
  };

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const articleNo = queryParams.get('articleNo');

  // 게시판 카테고리 저장을 위한 스테이트
  const [articleCateName, setArticleCateName] = useState(null);

  // 게시글 제목을 불러오기 위한 스테이트
  const [articleTitle, setArticleTitle] = useState(null);

  // 게시글 내용을 불러오기 위한 스테이트
  const [articleCnt, setArticleCnt] = useState(null);

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

// 페이지 랜더링 될 때 호출(게시판 제목, 내용)
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getArticleModify(articleNo);
      setArticleTitle(response.articleTitle);
      setArticleCnt(response.articleCnt);
      
    } catch (error) {
      console.error('Failed to fetch article title:', error);
    }
  };
  fetchData();
}, []);

  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>
            
            <div className='writeRow'>
                <p>{articleTitle}</p>
                <p>{articleCnt}</p>

                <Viewer initialValue={articleCnt}/>
                {/*여기 articleCnt 내용 자꾸만 사라짐..... 왜인지 모르겠음
                  혹시나 잊을까봐 위에 p태그로 articleCnt 추가해놨음*/}
                  
            </div>

            <div className='writeRow'>
              <div className='wrtieBtnBox'>
                <input type='button' value={"수정취소"} onClick={cancelHandler}/>
                <input type='submit' value={"수정완료"} onClick={completeHandler}/>
              </div>
            </div>

        </div>     
    </MainLayout>
  )
}

export default ModifyPage;