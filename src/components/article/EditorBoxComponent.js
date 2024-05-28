import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getArticleCate, writeArticle } from '../../api/ArticleApi';

const EditorBoxComponent = () => {

  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    const articleNo = queryParams.get('articleNo');

  const navigate = useNavigate();
    // 게시글 제목 보관
    const [articleTitle, setArticleTitle] = useState('');
    // 게시글 내용 보관
    const editorRef = useRef();

    const onChange = () => {
      const data = editorRef.current.getInstance().getHTML();
      console.log(data);
    };

    const submitHandler = async () => {
      const articleContent = editorRef.current.getInstance().getHTML();
      const stfNo = '0000'; // 가정한 stfNo 값
      try {
        const response = await writeArticle({ stfNo, articleTitle, articleCnt: articleContent });
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
        <input className='writeTitle' type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder='제목을 입력하세요.'/>

        <Editor
            initialValue=" "
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            plugins={[colorSyntax]}
            language="ko-KR"
            ref={editorRef}
            onChange={onChange}
        />

        <div className='wrtieBtnBox'>
            <input type='button' value={"취소"} onClick={cancelHandler}/>   
            <input type='submit' value={"작성"} onClick={submitHandler}/>
        </div>
    </>
  )
}

export default EditorBoxComponent;