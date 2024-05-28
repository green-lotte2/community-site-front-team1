import React, { useEffect, useState } from 'react'
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import MainLayout from '../../layout/MainLayout'
import { getArticleCate, getArticleView } from '../../api/ArticleApi';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewPage = () => {
  const navigate = useNavigate();

    const modifyHandler = () => {
      alert("수정페이지로 이동합니다.")
      navigate(`/modify?articleNo=${articleNo}&articleCateNo=${articleCateNo}&pg=1`);
  }

  const deleteHandler = () => {
      alert("삭제")
  }

  const listHandler = () => {
    setTimeout(() => {
      navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
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

// 페이지 랜더링 될 때 호출(게시판 제목)
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getArticleView(articleNo);
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
              
                {/*여기 articleCnt 내용 자꾸만 사라짐..... 왜인지 모르겠음
                  혹시나 잊을까봐 위에 p태그로 articleCnt 추가해놨음*/}

                <Viewer initialValue={articleCnt}/>
            </div>

            <div className='writeRow'>
              <div className='wrtieBtnBox'>
                <input type='submit' value={"수정"} onClick={modifyHandler}/>
                <input type='submit' value={"삭제"} onClick={deleteHandler}/>
                <input type='button' value={"목록"} onClick={listHandler}/>
              </div>
            </div>

        </div>     
    </MainLayout>
  )
}

export default ViewPage;