import React, { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import MainLayout from '../../layout/MainLayout';
import {
    getArticleCate,
    ArticleDelete,
    ArticleView,
    FileDownload,
    postComment,
    getArticleComment,
} from '../../api/ArticleApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { RootUrl } from '../../api/RootUrl';
import { getCookie } from '../../util/cookieUtil';
import moment from 'moment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const roleView = {
    ADMIN: 3,
    MANAGER: 2,
    USER: 1,
};
const getRoleValue = (role) => roleView[role] || 0;

const ViewPage = () => {
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const role = loginSlice.userRole;
    const userRoleValue = getRoleValue(role);

    const navigate = useNavigate();

    const modifyHandler = () => {
        navigate(`/modify?articleNo=${articleNo}&articleCateNo=${articleCateNo}&pg=${pg}`);
    };

    const deleteHandler = async () => {
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await ArticleDelete({ articleNo });
                alert('게시글이 삭제되었습니다.');
                navigate(`/list?articleCateNo=${articleCateNo}&pg=${pg}`);
            } catch (error) {
                console.error('Failed to delete article:', error);
                alert('게시글 삭제에 실패하였습니다.');
            }
        }
    };

    const listHandler = () => {
        navigate(`/list?articleCateNo=${articleCateNo}&pg=${pg}`);
    };

    // URL에서 파라미터값 추출
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const articleNo = queryParams.get('articleNo');
    const commentRole = queryParams.get('role');

    let pg = queryParams.get('pg');
    if (pg === null) {
        pg = 1;
    }

    // 게시판 카테고리 저장을 위한 스테이트
    const [articleCateName, setArticleCateName] = useState(null);
    // 제목, 내용
    const [articleView, setArticleView] = useState('');
    // 중복 요청 방지를 위한 상태 변수
    const [isCateFetched, setIsCateFetched] = useState(false);
    const [isArticleFetched, setIsArticleFetched] = useState(false);

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
                setFileList(response.fileList);
                console.log('글', response);

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

    /** 파일 다운로드 핸들러 */
    const handFileDownload = async (fileNo, fileOname) => {
        try {
            const response = await FileDownload(fileNo);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', fileOname);
            document.body.appendChild(a);
            a.click();
            // window.URL.revokeObjectURL(url);
            // document.body.removeChild(a);
            a.remove();
        } catch (err) {
            console.log(err);
        }
    };

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

    /** 댓글 */
    const [commentMessage, setCommentMessage] = useState('');
    const [comment, setComment] = useState([]);
    const auth = getCookie('auth');
    const id = auth?.userId;
    const commentChange = (e) => {
        const Message = e.target.value;
        setCommentMessage({ ...commentMessage, commentCnt: Message });
        console.log(commentMessage);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const newComment = {
            articleNo: articleNo,
            stfNo: id,
            commentCnt: commentMessage.commentCnt,
        };

        try {
            const response = await postComment(newComment);
            console.log('저장 완료' + response);
            setCommentMessage('');
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async () => {
        try {
            const CommentList = await getArticleComment(articleNo);
            console.log(CommentList);
            setComment(CommentList);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 댓글 수정 토글 핸들러
    const toggleEditComment = (index) => {
        setComment((prevComments) =>
            prevComments.map((each, idx) =>
                idx === index ? { ...each, isEditing: !each.isEditing, editedCommentCnt: each.commentCnt } : each
            )
        );
    };

    // 댓글 내용 변경 핸들러
    const handleCommentChange = (e, index) => {
        const { value } = e.target;
        setComment((prevComments) =>
            prevComments.map((each, idx) => (idx === index ? { ...each, editedCommentCnt: value } : each))
        );
    };

    // 댓글 수정 저장 핸들러
    const saveEditedComment = async (commentNo, index) => {
        try {
            const updatedComment = comment[index];
            await axios.put(`${RootUrl()}/article/comment/${commentNo}`, {
                commentNo: updatedComment.commentNo,
                commentCnt: updatedComment.editedCommentCnt,
            });
            setComment((prevComments) =>
                prevComments.map((each, idx) =>
                    idx === index ? { ...each, isEditing: false, commentCnt: updatedComment.editedCommentCnt } : each
                )
            );
            alert('댓글이 수정되었습니다.');
        } catch (err) {
            console.error('Failed to update comment:', err);
            alert('댓글 수정에 실패했습니다.');
        }
    };

    // 댓글 삭제 핸들러
    const deleteCommentHandler = async (commentNo) => {
        const confirmed = window.confirm('댓글을 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await axios.delete(`${RootUrl()}/article/comment/${commentNo}`);
                alert('댓글이 삭제되었습니다.');
                fetchData(); // 댓글 목록을 다시 불러옵니다.
            } catch (err) {
                console.error('댓글 삭제 실패:', err);
                alert('댓글 삭제에 실패했습니다.');
            }
        }
    };

    // 현재 로그인한 사용자가 글 작성자인지 확인
    const isAuthor = id === articleView.stfNo;

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">{articleCateName} 게시판</div>
                <div className="viewRow">
                    <p>{articleView.articleTitle}</p>
                    {articleView.articleCnt ? <Viewer initialValue={articleView.articleCnt} /> : <p>Loading...</p>}
                </div>
                <div className="writeFile">
                    <div className="fileList">
                        <p>첨부파일목록</p>
                        {fileList.map((file, index) => (
                            <div key={index}>
                                <Link
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handFileDownload(file.fileNo, file.fileOname);
                                    }}
                                >
                                    {file.fileOname}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="writeRow">
                    <div className="wrtieBtnBox">
                        {isAuthor && (
                            <>
                                <input type="submit" value={'수정'} onClick={modifyHandler} />
                                <input type="submit" value={'삭제'} onClick={deleteHandler} />
                            </>
                        )}
                        <input type="button" value={'목록'} onClick={listHandler} />
                    </div>
                </div>

                {/* 댓글 */}
                <div className="commentColumn" style={{borderTop:"1px solid #dadde6"}}>
                    <p style={{fontSize:"20px", margin:"20px 0"}}>답변 </p>
                    {/* 댓글 작성 */}
                    {getRoleValue(commentRole) <= userRoleValue && (
                        <div className="commentRow commentColumn">
                            <div>
                                <img src="../images/iconSample3.png" alt="" />
                                <textarea
                                    name="commentCnt"
                                    id="commentCnt"
                                    placeholder="답글입력"
                                    value={commentMessage.commentCnt || ''}
                                    onChange={commentChange}
                                ></textarea>
                            </div>
                            <div style={{ alignSelf: 'self-end' }}>
                                <button onClick={submitHandler}>답글등록</button>
                            </div>
                        </div>
                    )}

                    {/* 댓글 목록 */}
                    {comment ? (
                        comment.map((each, index) => (
                            <div className="commentRow commentColumn" key={index}>
                                <div>
                                    <div>
                                        <img src={`${RootUrl()}/images/${each.stfImg}`} alt="img" name="stfImg" />
                                    </div>
                                    <div className="commentContent">
                                        <div className="commentTitle">
                                            <p>{each.stfName}</p>
                                            <p>
                                                {/* 날짜 포맷(import 수동) / npm install moment --save */}
                                                {moment(each.commentRdate).format('YYYY-MM-DD HH:MM:DD')}
                                            </p>
                                        </div>
                                        <textarea
                                            readOnly={!each.isEditing}
                                            name=""
                                            id=""
                                            value={each.isEditing ? each.editedCommentCnt : each.commentCnt}
                                            onChange={(e) => handleCommentChange(e, index)}
                                        ></textarea>
                                    </div>
                                </div>

                                <div style={{ alignSelf: 'self-end' }}>
                                    {id === each.stfNo && (
                                        <>
                                            {each.isEditing ? (
                                                <button onClick={() => saveEditedComment(each.commentNo, index)}>
                                                    저장
                                                </button>
                                            ) : (
                                                <button onClick={() => toggleEditComment(index)}>수정</button>
                                            )}
                                            <button
                                                data-id={each.commentNo}
                                                onClick={() => deleteCommentHandler(each.commentNo)}
                                            >
                                                삭제
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="commentRow commentColumn">
                            <div>등록된 댓글이 없습니다.</div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default ViewPage;
