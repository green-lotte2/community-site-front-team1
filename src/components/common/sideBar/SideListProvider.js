import { createContext, useEffect, useState } from 'react';
import { getArticleCateList } from '../../../api/AdminApi';

export const ArticleListContext = createContext();

export const ArticleListProvider = ({ children }) => {
    const [articleCateList, setArticleCateList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getArticleCateList();
                setArticleCateList(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return <ArticleListContext.Provider value={articleCateList}>{children}</ArticleListContext.Provider>;
};
