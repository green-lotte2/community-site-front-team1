import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleWrite, fileUploads, uploadImage } from '../../api/ArticleApi';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

const EditorBoxComponent = ({ articleCateNo }) => {
    const navigate = useNavigate();
    const loginSlice = useSelector((state) => state.loginSlice);

    const [articleTitle, setArticleTitle] = useState('');
    const editorRef = useRef();

    /** 선택한 파일들을 보관하는 상태 */
    const [selectedFiles, setSelectedFiles] = useState([]);

    /**  파일 선택 핸들러 */
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

        console.log('고른파일' + selectedFiles);
    };

    const handleChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };

    const submitHandler = async () => {
        let articleContents = editorRef.current.getInstance().getHTML();
        const formData = await prepareFormData(articleContents);
        try {
            const response = await ArticleWrite(formData);
            const articleNo = response;
            if (selectedFiles.length > 0) {
                const uploadedFiles = uploadFiles(articleNo);
                const fileUpload = await fileUploads(uploadedFiles);
            }

            console.log(response);
            alert('글이 성공적으로 작성되었습니다.');
            navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
        } catch (err) {
            console.log(err);
            alert('글 작성에 실패하였습니다.');
        }
    };

    const uploadFiles = (articleNo) => {
        const fileData = new FormData();
        selectedFiles.forEach((file) => {
            fileData.append('multiFileNames', file);
        });
        fileData.append('articleNo', articleNo);
        console.log(Array.from(fileData));
        return fileData;
    };

    const prepareFormData = async (articleContents) => {
        const matchSrc = /src="([^"]*)"/g;
        const srcPull = articleContents.match(matchSrc);

        let fileList = [];
        if (srcPull) {
            fileList = await uploadImages(srcPull);

            fileList.forEach((file, i) => {
                const imageURL = `${RootUrl()}/images/orgArtImage/${file.name}`;
                //const imageURL = `${RootUrl()}/uploads/orgArtImage/${file.name}`;
                articleContents = articleContents.replace(srcPull[i].slice(5, -1), imageURL);
            });
        }

        const formData = new FormData();
        formData.append('stfNo', loginSlice.userId);
        formData.append('articleTitle', articleTitle);
        formData.append('articleCnt', articleContents);
        formData.append('articleCateNo', articleCateNo);
        formData.append('articleThumb', fileList.length ? fileList[0].name : '');
        formData.append('writer', loginSlice.username);

        fileList.forEach((file) => {
            formData.append('files', file);
        });

        return formData;
    };

    const uploadImages = async (srcPull) => {
        const fileList = [];

        for (let i = 0; i < srcPull.length; i++) {
            const base64 = srcPull[i].slice(5, -1);
            const mime = base64.match(/data:(.*?);/)[1];
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

    const base64ToFile = (base64String, fileName) => {
        const arr = base64String.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    };

    const cancelHandler = () => {
        navigate(-1);
    };

    return (
        <>
            <input
                className="writeTitle"
                type="text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="제목을 입력하세요."
            />
            <form>
                <div className="writeFile">
                    <input type="file" multiple onChange={handleFileChange}></input>
                    <div className="fileList">
                        <span>첨부파일목록</span>
                        {selectedFiles && selectedFiles.map((file, index) => <span key={index}>{file.name}</span>)}
                    </div>
                </div>
            </form>
            <Editor
                initialValue=" "
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                plugins={[colorSyntax]}
                language="ko-KR"
                ref={editorRef}
                onChange={handleChange}
            />
            <div className="wrtieBtnBox">
                <input type="button" value={'취소'} onClick={cancelHandler} />
                <input type="submit" value={'작성'} onClick={submitHandler} />
            </div>
        </>
    );
};

export default EditorBoxComponent;
