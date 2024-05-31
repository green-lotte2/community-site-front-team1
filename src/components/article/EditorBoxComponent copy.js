import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArticleWrite } from '../../api/ArticleApi';
import { uploadImage } from '../../api/ImageApi'; // 이미지 업로드 API를 호출하는 함수
import { RootUrl } from '../../api/RootUrl';

const EditorBoxComponent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const navigate = useNavigate();

    // 게시글 제목 보관
    const [articleTitle, setArticleTitle] = useState('');
    // 게시글 내용 보관
    const editorRef = useRef();
    const isChangingRef = useRef(false);

    // Base64 문자열을 파일 객체로 변환하는 유틸리티 함수
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

    // 이전 내용을 저장할 변수 추가
const prevContentRef = useRef("");

// 에디터 내용 변경 시 호출되는 함수
const getImages = async () => {
    if (isChangingRef.current) return;

    isChangingRef.current = true;

    try {
        // 에디터에서 HTML 내용을 가져옴
        const currentContent = editorRef.current.getInstance().getHTML();
        // 이전 내용과 현재 내용 비교하여 변경된 부분 확인
        const addedImages = findAddedImages(prevContentRef.current, currentContent);
        // 이전 내용 업데이트
        prevContentRef.current = currentContent;

        // 추가된 이미지만 처리
        for (let i = 0; i < addedImages.length; i++) {
            const base64 = addedImages[i];
            const file = base64ToFile(base64, `image${i + 1}.png`);
            console.log('변환된 파일 객체:', file);

            try {
                // 이미지 업로드 API 호출 (적절한 API 사용)
                const response = await uploadImage(file); // 업로드 후 URL 반환
                const newUrl = response.url; // 서버에서 반환된 이미지 URL
                console.log('새로운 이미지 URL:', newUrl);

                // HTML에서 원본 Base64 이미지를 새로운 URL로 치환
                currentContent = currentContent.replace(base64, `${RootUrl}/images/${newUrl}`);
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
            }
        }

        // 에디터 내용 갱신
        editorRef.current.getInstance().setHTML(currentContent);
    } finally {
        isChangingRef.current = false;
    }
};

// 이전 내용과 현재 내용을 비교하여 추가된 이미지 추출하는 함수
const findAddedImages = (prevContent, currentContent) => {
    // 추출된 이미지 태그들을 담을 배열
    const addedImages = [];
    const imgRegex = /<img[^>]+src="([^">]+)"/g;

    // 현재 내용에서 이미지 태그를 추출하고, 이전 내용에 없는 이미지만 배열에 추가
    let match;
    while ((match = imgRegex.exec(currentContent)) !== null) {
        const src = match[1];
        if (src.startsWith('data:image') && !prevContent.includes(src)) {
            addedImages.push(src);
        }
    }

    return addedImages;
};


    const submitHandler = async () => {
        const articleCnt = editorRef.current.getInstance().getHTML();

        const stfNo = 'HR1403';   // 로그인아이디 없어서 db stfNo로 직접 넣었음
        const writer = '테스터';

        getImages();

        try {
            const response = await ArticleWrite({ writer, stfNo, articleTitle, articleCnt, articleCateNo });
            if (response === 1) {
                alert('글이 성공적으로 작성되었습니다.');
                navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
            } else {
                alert('글 작성에 실패하였습니다.');
            }
        } catch (error) {
            console.error('Failed to write article:', error);
            alert('글 작성 중 오류가 발생하였습니다.');
        }
    };

    const cancelHandler = () => {
        navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
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
                
            />

            <div className='wrtieBtnBox'>
                <input type='button' value={"취소"} onClick={cancelHandler} />
                <input type='submit' value={"작성"} onClick={submitHandler} />
            </div>
        </>
    )
}

export default EditorBoxComponent;
