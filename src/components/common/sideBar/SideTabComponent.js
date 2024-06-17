import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faFileLines,
    faFilePen,
    faFlag,
    faFolderOpen,
    faFolderTree,
    faGear,
    faHeadset,
    faUserGear,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons';

const SideTabComponent = ({ sideTabCate, sideTabCateName, type }) => {
    return (
        <Link to={`/${sideTabCate}`} className="sideTab">
            <div>
                {/* 관리자 */}
                {sideTabCate === 'admin' && (
                    <>
                        <FontAwesomeIcon icon={faGear} />
                        <p>관리자메인</p>
                    </>
                )}
                {sideTabCate === 'config' && (
                    <>
                        <FontAwesomeIcon icon={faUserGear} />
                        <p>기본설정</p>
                    </>
                )}
                {sideTabCate === 'userList?pg=1' && (
                    <>
                        <FontAwesomeIcon icon={faUserGear} />
                        <p>회원관리</p>
                    </>
                )}
                {sideTabCate === 'articleList' && (
                    <>
                        <FontAwesomeIcon icon={faFolderOpen} />
                        <p>게시판관리</p>
                    </>
                )}

                {/* 개인 */}
                {sideTabCate === 'mypage' && (
                    <>
                        <FontAwesomeIcon icon={faUserLock} />
                        <p>마이페이지</p>
                    </>
                )}
                {sideTabCate === 'chat' && (
                    <>
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>채팅</p>
                    </>
                )}
                {sideTabCate === 'project' && (
                    <>
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>프로젝트</p>
                    </>
                )}
                {sideTabCate === 'doc' && (
                    <>
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>문서</p>
                    </>
                )}
                {sideTabCate === 'calendar' && (
                    <>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p>캘린더</p>
                    </>
                )}
                {sideTabCate === 'group' && (
                    <>
                        <FontAwesomeIcon icon={faFolderTree} />
                        <p>조직도</p>
                    </>
                )}

                {type > 0 && (
                    <>
                        <FontAwesomeIcon icon={faFlag} />
                        <p>{sideTabCateName}</p>
                    </>
                )}

                {/* 게시판 
                {sideTabCate === 'list?articleCateNo=1&pg=1' && (
                    <>
                        <FontAwesomeIcon icon={faFlag} />
                        <p>공지사항</p>
                    </>
                )}
                {sideTabCate === 'article1' && (
                    <>
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>게시판</p>
                    </>
                )}
                {sideTabCate === 'article2' && (
                    <>
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>게시판</p>
                    </>
                )}
*/}
                {/* 고객센터 */}
                {sideTabCate === 'csList' && (
                    <>
                        <FontAwesomeIcon icon={faHeadset} />
                        <p>고객문의</p>
                    </>
                )}
                {sideTabCate === 'csTerms' && (
                    <>
                        <FontAwesomeIcon icon={faFilePen} />
                        <p>이용약관</p>
                    </>
                )}
            </div>
        </Link>
    );
};

export default SideTabComponent;
