import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import EditorBoxComponent from '../../components/article/EditorBoxComponent';
import { useLocation } from 'react-router-dom';
import { getArticleCate } from '../../api/ArticleApi';

const WritePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');

    const [articleCateName, setArticleCateName] = useState(null);

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
    }, [articleCateNo]);

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>
                <div className='writeRow'>
                    <EditorBoxComponent articleCateNo={articleCateNo} />
                </div>
            </div>
        </MainLayout>
    );
}

export default WritePage;
