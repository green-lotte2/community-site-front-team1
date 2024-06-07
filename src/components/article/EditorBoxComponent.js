import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleWrite, uploadImage } from '../../api/ArticleApi';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

const EditorBoxComponent = ({ articleCateNo }) => {
    const navigate = useNavigate();   // 페이지이동을 위한 hook 초기화
    const loginSlice = useSelector((state) => state.loginSlice);    // Redux 상태에서 로그인 정보를 가져오기

    const [articleTitle, setArticleTitle] = useState('');   // 게시글 제목을 관리하는 상태
    const editorRef = useRef();   // 에디터의 참조 객체를 관리하는 hook

    // 에디터 내용이 변경될 때 호출되는 함수
    const handleChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log('Editor content changed:', data);
    };

     // 작성 버튼 클릭 시 호출되는 함수
    const submitHandler = async () => {
        let articleContents = editorRef.current.getInstance().getHTML();
        console.log('Submit handler called with content:', articleContents);

        const formData = await prepareFormData(articleContents);      // 폼 데이터를 준비

        try {
            const response = await ArticleWrite(formData);          // 게시글 작성 API 호출
            console.log('Article written successfully:', response);
            alert('글이 성공적으로 작성되었습니다.');
            navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
        } catch (err) {
            console.error('Error writing article:', err);
            alert('글 작성에 실패하였습니다.');
        }
    };

    // 에디터 내용에서 이미지를 추출하고 업로드된 이미지 URL로 대체하는 함수
    const prepareFormData = async (articleContents) => {
        const matchSrc = /src="([^"]*)"/g;
        const srcPull = articleContents.match(matchSrc);
        console.log('Found images:', srcPull);

        let fileList = [];
        if (srcPull) {
            fileList = await uploadImages(srcPull);   // 이미지 업로드

            fileList.forEach((file, i) => {
                const imageURL = `${RootUrl()}/uploads/orgArtImage/${file.name}`;
                articleContents = articleContents.replace(srcPull[i].slice(5, -1), imageURL);   // 에디터 내용에서 이미지 URL 대체
            });
        }

        const formData = new FormData();
        formData.append("stfNo", loginSlice.userId);
        formData.append("articleTitle", articleTitle);
        formData.append("articleCnt", articleContents);
        formData.append("articleCateNo", articleCateNo);
        formData.append("articleThumb", fileList.length ? fileList[0].name : '');
        formData.append("writer", loginSlice.username);

        fileList.forEach((file) => {
            formData.append('files', file);
        });

        return formData;
    };

    // base64 문자열을 파일로 변환하고 업로드하는 함수
    const uploadImages = async (srcPull) => {
        const fileList = [];

        for (let i = 0; i < srcPull.length; i++) {
            const base64 = srcPull[i].slice(5, -1);
            const mime = base64.match(/data:(.*?);/)[1];
            const extension = mime.split('/')[1];
            const fileName = `${btoa(base64).substring(0, 10)}.${extension}`;
            console.log('Processing image with name:', fileName);

            const file = base64ToFile(base64, fileName);

            // 업로드된 파일 URL 얻기
            console.log('Uploading image:', file);
            const uploadedFile = await uploadImage(file);
            console.log('Uploaded image with response:', uploadedFile);

            fileList.push(new File([file], uploadedFile.name, { type: file.type }));
        }

        return fileList;
    };

    // base64 문자열을 파일 객체로 변환하는 함수
    const base64ToFile = (base64String, fileName) => {
        const arr = base64String.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        console.log('Converting base64 to file with name:', fileName);
        return new File([u8arr], fileName, { type: mime });
    };

    // 취소 버튼 클릭 시 호출되는 함수
    const cancelHandler = () => {
        navigate(-1);
    };

    return (
        <>
            <input className='writeTitle' type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder='제목을 입력하세요.' />
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
            <div className='wrtieBtnBox'>
                <input type='button' value={"취소"} onClick={cancelHandler} />
                <input type='submit' value={"작성"} onClick={submitHandler} />
            </div>
        </>
    );
};

export default EditorBoxComponent;
