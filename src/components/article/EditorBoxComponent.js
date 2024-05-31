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
import { useSelector } from 'react-redux';

const EditorBoxComponent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const navigate = useNavigate();

    const loginSlice = useSelector((state) => state.loginSlice);

    // 게시글 제목 보관
    const [articleTitle, setArticleTitle] = useState('');

    // 게시글 내용 보관
    const editorRef = useRef();

    /** 작성한 게시글 내용 저장하는 핸들러 */
    const handleChange = () => {
      const data = editorRef.current.getInstance().getHTML();
      console.log(data);
    };


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

    /** 작성 버튼 클릭 핸들러 */
    const submitHandler = async () => {

      let articleContents = editorRef.current.getInstance().getHTML();

      const formData = pullBase64(articleContents);

      // 게시글 내용과 파일을 서버에 저장하는 함수 호출
      try {
        const response = await ArticleWrite(formData);
        console.log(response);

      }catch (err) {
        console.log(err);
      }

    }

    /** 작성한 게시글 내용에서 img태그 추출하는 함수 */
    const pullBase64 = (articleContents) => {
      let arrBase64 = [];
      const matchImg = /<img[^>]+>/g;
      const matchSrc = /src="([^"]*)"/g;
      // img 태그 추출
      const imgTagPull = articleContents.match(matchImg);

      // src 부분문 추출
      const srcPull = articleContents.match(matchSrc);

      const fileList = changeImageFile(srcPull);

      // 입력한 내용에서 img 태그 안의 src 내용 치환
      const imageNames = [];
      Array.from(fileList).forEach(function(each) {
        imageNames.push((each.name)+ '.' + each.type.split('/')[1]);
      })
      
      for (let i=0 ; i < srcPull.length ; i++) {
        articleContents = articleContents.replace(srcPull[i].slice(5, -1), RootUrl() + "/images/" + imageNames[i]);
      }
      console.log(imageNames)
      console.log(articleContents);

      // 내용과 file을 formdata에 담아서 리턴
      const formData = new FormData();
      formData.append("stfNo", loginSlice.userId);
      formData.append("articleTitle", articleTitle);
      formData.append("articleCnt", articleContents);
      formData.append("articleCateNo", articleCateNo);
      formData.append("articleThumb", imageNames[0]);
      formData.append("writer", loginSlice.username);

      fileList.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });

      return formData;
    }

    /** base64이미지를 일반 file 객체로 변경하는 함수 */
    const changeImageFile = (srcPull) => {
      const fileList = []
      for (let i=0 ; i < srcPull.length ; i++) {

        const base64 = srcPull[i].slice(5, -1);

        const { v4: uuidv4 } = require('uuid');

        // 랜덤 UUID 생성
        const randomUUID = uuidv4();

        const file = base64ToFile(base64, randomUUID)
        fileList.push(file);
      }
      console.log(fileList);
      return fileList;
    }

    /** 뒤로가기 */
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
                onChange={handleChange}
            />

            <div className='wrtieBtnBox'>
                <input type='button' value={"취소"} onClick={cancelHandler} />
                <input type='submit' value={"작성"} onClick={submitHandler} />
            </div>
        </>
    )
}

export default EditorBoxComponent;
