import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArticleModify, fileDelete, fileUploads, uploadImage } from '../../api/ArticleApi';
import { RootUrl } from '../../api/RootUrl';

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
    const articleCateNo = queryParams.get('articleCateNo'); // 게시글 카테고리 번호
    const articleNo = queryParams.get('articleNo'); // 수정할 게시글의 ID
    const currentThumbnail = queryParams.get('articleThumb'); // 현재 썸네일을 가져옴

    const navigate = useNavigate();

    const editorRef = useRef();

    // 현재 페이지 번호 설정
    let pg = queryParams.get('pg');
    if (pg === null) {
        pg = 1;
    }

    /** 선택한 파일들을 보관하는 상태 */
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [delFileList, setDelFileList] = useState([]);

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };

    const submitHandler = async () => {
        let articleContents = editorRef.current.getInstance().getHTML();
        console.log('제출 데이터:', {
            articleTitle,
            articleContents,
            selectedFiles,
            delFileList,
        });

        try {
            // 파일 업로드
            if (selectedFiles.length > 0) {
                console.log('파일업로드', selectedFiles);
                const uploadedFiles = uploadFiles(articleNo);
                await fileUploads(uploadedFiles);
            }
            // 파일 삭제
            if (delFileList.length > 0) {
                console.log('파일삭제', delFileList);
                await fileDelete(delFileList);
            }

            // 이미지 URL을 포함한 articleContents를 수정하고 썸네일 설정
            const { updatedArticleContents, thumbnail } = await processImages(articleContents, currentThumbnail);

            console.log('수정된 게시글 내용:', updatedArticleContents);

            // 게시글 수정 요청
            const response = await ArticleModify({
                articleTitle,
                articleCnt: updatedArticleContents,
                articleCateNo,
                articleNo,
                articleThumb: thumbnail,  // 썸네일 추가
            });

            console.log('서버 응답:', response);

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

    /** 파일 선택 핸들러 */
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
                setDelFileList((prevFiles) => [...prevFiles, fileNo]);
                removeItemAtIndex(index);
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
        return fileData;
    };

    // 이미지 처리 함수
    const processImages = async (articleContents, currentThumbnail) => {
        const matchSrc = /<img[^>]+src="([^">]+)"/g;
        let srcMatch;
        const srcPull = [];
        const base64SrcPull = [];

        // articleContents에서 이미지 URL 추출
        while ((srcMatch = matchSrc.exec(articleContents)) !== null) {
            srcPull.push(srcMatch[1]);
            if (srcMatch[1].startsWith('data:image')) {
                base64SrcPull.push(srcMatch[1]);
            }
        }

        const newFileList = await uploadImages(base64SrcPull);

        let thumbnail = currentThumbnail; // 기존 썸네일을 기본값으로 설정
        if (srcPull.length > 0 && base64SrcPull.length > 0) {
            thumbnail = srcPull[0];
        }

        // 새로 추가된 이미지를 서버에 업로드하고 URL을 업데이트
        newFileList.forEach((file, i) => {
            const imageURL = `${RootUrl()}/images/orgArtImage/${file.name}`;
            articleContents = articleContents.replace(base64SrcPull[i], imageURL);
            if (i === 0) {
                thumbnail = file.name; // 첫 번째 이미지 파일을 썸네일로 설정
            }
        });

        return { updatedArticleContents: articleContents, thumbnail: thumbnail };
    };

    // Base64 문자열을 파일로 변환하는 함수
    const uploadImages = async (srcPull) => {
        const fileList = [];

        for (let i = 0; i < srcPull.length; i++) {
            const base64 = srcPull[i];
            const mime = base64.match(/data:(.*?);base64,/)[1];
            const extension = mime.split('/')[1];
            const fileName = `${btoa(base64).substring(0, 10)}.${extension}`;
            console.log(`Encoded Name: ${fileName}`);

            const file = base64ToFile(base64, fileName);

            // 업로드된 파일 URL 얻기
            const uploadedFile = await uploadImage(file);
            fileList.push(new File([file], uploadedFile.name, { type: file.type }));
        }

        return fileList;
    };

    // Base64 문자열을 파일로 변환하는 함수
    const base64ToFile = (base64String, fileName) => {
        const arr = base64String.split(',');
        const mime = arr[0].match(/data:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
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
