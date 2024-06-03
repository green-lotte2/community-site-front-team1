import React, { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import MainLayout from '../../layout/MainLayout';
import { getArticleCate, ArticleDelete, ArticleView } from '../../api/ArticleApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

const ViewPage = () => {
    const navigate = useNavigate();

    const modifyHandler = () => {
        navigate(`/modify?articleNo=${articleNo}&articleCateNo=${articleCateNo}&pg=1`);
    };

    const deleteHandler = async () => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await ArticleDelete({ articleNo });
                alert('게시글이 삭제되었습니다.');
                navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
            } catch (error) {
                console.error('Failed to delete article:', error);
                alert('게시글 삭제에 실패하였습니다.');
            }
        }
    };

    const listHandler = () => {
        //navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
        navigate(-1);
    };

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const articleNo = queryParams.get('articleNo');

    // 게시판 카테고리 저장을 위한 스테이트
    const [articleCateName, setArticleCateName] = useState(null);
    // 제목, 내용
    const [articleView, setArticleView] = useState('');
    // 중복 요청 방지를 위한 상태 변수
    const [isCateFetched, setIsCateFetched] = useState(false);
    const [isArticleFetched, setIsArticleFetched] = useState(false);

    // 페이지 랜더링 될 때 호출(게시판 카테고리)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleCate(articleCateNo);
                setArticleCateName(response.articleCateName);
            } catch (error) {
                console.error('Failed to fetch article category:', error);
            } finally {
                setIsCateFetched(true);
            }
        };

        if (!isCateFetched) {
            fetchData();
        }
    }, [articleCateNo, isCateFetched]);

    // 페이지 랜더링 될 때 호출(게시판 제목, 내용)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ArticleView(articleNo);
                setArticleView(response);

                // 이미지 저장?
                saveArticleThumb(response.articleCnt);
            } catch (error) {
                console.error('Failed to fetch article title:', error);
            } finally {
                setIsArticleFetched(true);
            }
        };

        if (!isArticleFetched) {
            fetchData();
        }
    }, [articleNo, isArticleFetched]);

    // articleThumb에 이미지 저장하는 함수
    const saveArticleThumb = (articleCnt) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(articleCnt, 'text/html');
        const img = doc.querySelector('img');
        const imageUrl = img ? img.getAttribute('src') : null;
        if (imageUrl) {
            // 이미지 주소를 서버에 저장하거나 필요한 곳에 전달할 수 있습니다.
            console.log('First image URL:', imageUrl);
        } else {
            console.log('No image found in the article content.');
        }
    };

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>
                <div className="viewRow">
                    <p>{articleView.articleTitle}</p>
                    {articleView.articleCnt ? <Viewer initialValue={articleView.articleCnt} /> : <p>Loading...</p>}
                </div>               
                <div className='writeFile'>
                    <div className='fileList'>
                        <Link to="">첨부파일목록</Link>
                        <Link to="">2분기 실적보고서.txt</Link>
                    </div>
                </div>

                <div className="writeRow">
                    <div className="wrtieBtnBox">
                        <input type="submit" value={'수정'} onClick={modifyHandler} />
                        <input type="submit" value={'삭제'} onClick={deleteHandler} />
                        <input type="button" value={'목록'} onClick={listHandler} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ViewPage;
