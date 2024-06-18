import React, { useContext, useState } from 'react';
import SideTabComponent from './SideTabComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPhoneVolume, faUnlockKeyhole, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { ArticleListContext } from './SideListProvider';
import { useSelector } from 'react-redux';

const roleView = {
    ADMIN: 3,
    MANAGER: 2,
    USER: 1,
};
const getRoleValue = (role) => roleView[role] || 0;

const SideBoxComponent = ({ sideBarCate }) => {
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const role = loginSlice.userRole;

    const userRoleValue = getRoleValue(role);
    const articleCateList = useContext(ArticleListContext);
    const [accordion, setAccordion] = useState(true);

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
                            <SideTabComponent sideTabCate={'admin'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'config'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'userList?pg=1'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'articleList'}></SideTabComponent>
                        </>
                    )}
                    {sideBarCate === 'private' && (
                        <>
                            <SideTabComponent sideTabCate={'mypage'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'chat'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'doc'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'project'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'calendar'}></SideTabComponent>
                            <SideTabComponent sideTabCate={'group'}></SideTabComponent>
                        </>
                    )}

                    {sideBarCate === 'article' && (
                        <>
                            {articleCateList.map(
                                (articleCate, index) =>
                                    articleCate.articleCateStatus === 1 &&
                                    getRoleValue(articleCate.articleCateVRole) <= userRoleValue && (
                                        <SideTabComponent
                                            key={index}
                                            sideTabCate={`list?articleCateNo=${articleCate.articleCateNo}&pg=1`}
                                            sideTabCateName={articleCate.articleCateName}
                                            type={1}
                                        />
                                    )
                            )}
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
