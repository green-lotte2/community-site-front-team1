import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArticleModify } from '../../api/ArticleApi';

const EditorBoxComponentModify = ({
    articleTitle,
    setArticleTitle,
    articleCnt,
    setArticleCnt,
    fileList,
    removeItemAtIndex,
}) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const articleNo = queryParams.get('articleNo'); // 수정할 게시글의 ID를 가져옵니다.

    const navigate = useNavigate();

    const editorRef = useRef();

    let pg = queryParams.get('pg');
    if (pg === null) {
        pg = 1;
    }

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };

    const submitHandler = async () => {
        const articleCnt = editorRef.current.getInstance().getHTML();

        try {
            const response = await ArticleModify({ articleTitle, articleCnt, articleCateNo, articleNo });

            if (response === 1) {
                alert('글이 성공적으로 수정되었습니다.');
                navigate(`/view?articleNo=${articleNo}&articleCateNo=${articleCateNo}&pg=${pg}`);
            } else {
                alert('글 수정에 실패하였습니다.');
            }
        } catch (error) {
            console.error('Failed to modify article:', error);
            alert('글 수정 중 오류가 발생하였습니다.');
        }
    };

    const cancelHandler = () => {
        navigate(-1);
    };

    /** 선택한 파일들을 보관하는 상태 */
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [delFileList, setDelFileList] = useState([]);

    /**  파일 선택 핸들러 */
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };
    /** 파일 삭제 핸들러 */
    const removeFile = (index, type) => {
        const confirmed = window.confirm('첨부된 파일을 삭제 하시겠습니까?');
        if (confirmed) {
            if (type === 'fileList') {
                const fileNo = fileList[index].fileNo;
                removeItemAtIndex(index);
                fileList[index] = setDelFileList((prevFiles) => {
                    const newFiles = [...prevFiles];
                    newFiles.splice(index, 1);
                    return newFiles;
                });
                return fileNo;
            } else {
                setSelectedFiles((prevFiles) => {
                    const newFiles = [...prevFiles];
                    newFiles.splice(index, 1);
                    return newFiles;
                });
            }
        }
    };

    /** 파일 업로드 */
    const uploadFiles = (articleNo) => {
        const fileData = new FormData();
        selectedFiles.forEach((file) => {
            fileData.append('multiFileNames', file);
        });
        fileData.append('articleNo', articleNo);
        console.log(Array.from(fileData));
        return fileData;
    };
    return (
        <>
            <input
                className="writeTitle"
                type="text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder={'제목을 입력하세요.'}
            />

            <div className="writeFile">
                <input type="file" multiple onChange={handleFileChange}></input>

                <div className="fileList">
                    <span>첨부파일목록 </span>
                    {fileList.map((file, index) => (
                        <span key={index}>
                            {file.fileOname}
                            <span
                                onClick={() => {
                                    const fileNo = removeFile(index, 'fileList');
                                    console.log('Deleted fileNo:', fileNo);
                                }}
                            >
                                x
                            </span>
                        </span>
                    ))}
                    {selectedFiles &&
                        selectedFiles.map((file, index) => (
                            <span key={index}>
                                {file.name}
                                <span onClick={() => removeFile(index, 'selectedFiles')}>x</span>
                            </span>
                        ))}
                </div>
            </div>

            {articleCnt && (
                <Editor
                    initialValue={articleCnt}
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={false}
                    plugins={[colorSyntax]}
                    language="ko-KR"
                    ref={editorRef}
                    onChange={onChange}
                />
            )}

            <div className="wrtieBtnBox">
                <input type="button" value={'취소'} onClick={cancelHandler} />
                <input type="submit" value={'수정완료'} onClick={submitHandler} />
            </div>
        </>
    );
};

export default EditorBoxComponentModify;
