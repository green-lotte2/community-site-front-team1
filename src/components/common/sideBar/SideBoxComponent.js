import React, { useEffect, useState } from 'react';
import SideTabComponent from './SideTabComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPhoneVolume, faUnlockKeyhole, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { getArticleCateList } from '../../../api/AdminApi';

const SideBoxComponent = ({ sideBarCate }) => {
    const [accordion, setAccordion] = useState(true);
    const [articleCateList, setArticleCateList] = useState([]);

    const handleAccordion = (e) => {
        const arrow = e.target.closest('.sideTitle').querySelector('.arrow');
        setAccordion(!accordion);
        console.log(accordion);
        if (accordion) {
            arrow.innerText = '▼';
        } else {
            arrow.innerText = '▲';
        }
    };
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

    return (
        <div className="sideBox">
            <div className="sideTitle" onClick={handleAccordion}>
                {sideBarCate === 'private' && (
                    <>
                        <span>
                            <FontAwesomeIcon icon={faUserLarge} />
                        </span>
                        <div>
                            <p>개인</p>
                            <span className="arrow">▼</span>
                        </div>
                    </>
                )}
                {sideBarCate === 'article' && (
                    <>
                        <span>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                        <div>
                            <p>게시판</p>
                            <span className="arrow">▲</span>
                        </div>
                    </>
                )}
                {sideBarCate === 'admin' && (
                    <>
                        <span>
                            <FontAwesomeIcon icon={faUnlockKeyhole} />
                        </span>
                        <div>
                            <p>관리자</p>
                            <span className="arrow">▲</span>
                        </div>
                    </>
                )}
                {sideBarCate === 'cs' && (
                    <>
                        <span>
                            <FontAwesomeIcon icon={faPhoneVolume} />
                        </span>
                        <div>
                            <p>고객센터</p>
                            <span className="arrow">▲</span>
                        </div>
                    </>
                )}
            </div>

            {accordion && (
                <>
                    {sideBarCate === 'admin' && (
                        <>
                            <SideTabComponent sideTabCate={'index'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'config'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'userList?pg=1'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'articleList'}></SideTabComponent>
                        </>
                    )}
                    {sideBarCate === 'private' && (
                        <>
                            <SideTabComponent sideTabCate={'mypage'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'chat'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'project'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'calendar'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'group'}></SideTabComponent>
                        </>
                    )}
                    {sideBarCate === 'article' && (
                        <>
                            {articleCateList.map((articleCate, index) => (
                                <SideTabComponent
                                    key={index}
                                    sideTabCate={`list?articleCateNo=${articleCate.articleCateNo}&pg=1`}
                                    sideTabCateName={articleCate.articleCateName}
                                    type={1}
                                />
                            ))}
                        </>
                    )}
                    {sideBarCate === 'cs' && (
                        <>
                            <SideTabComponent sideTabCate={'csList'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'csTerms'}></SideTabComponent>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SideBoxComponent;
