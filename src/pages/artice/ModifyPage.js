import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useLocation } from 'react-router-dom';
import { getArticleCate, ArticleModifyForm } from '../../api/ArticleApi';
import EditorBoxComponentModify from '../../components/article/EditorBoxComponentModify';

const ModifyPage = () => {
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

    /** 파일 목록 저장 */
    const [fileList, setFileList] = useState([]);

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
                const response = await ArticleModifyForm(articleNo);
                setArticleTitle(response.articleTitle);
                setArticleCnt(response.articleCnt);
                setFileList(response.fileList);
            } catch (error) {
                console.error('Failed to fetch article title, cnt:', error);
            }
        };
        fetchData();
    }, []);

    const removeItemAtIndex = (indexToRemove) => {
        setFileList((prevList) => prevList.filter((_, index) => index !== indexToRemove));
    };

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>

                <div className="writeRow">
                    <EditorBoxComponentModify
                        articleTitle={articleTitle}
                        setArticleTitle={setArticleTitle}
                        articleCnt={articleCnt}
                        setArticleCnt={setArticleCnt}
                        fileList={fileList}
                        removeItemAtIndex={removeItemAtIndex}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default ModifyPage;
