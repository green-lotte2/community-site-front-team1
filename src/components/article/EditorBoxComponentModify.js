import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArticleModify } from '../../api/ArticleApi';

const EditorBoxComponentModify = ({ articleTitle, setArticleTitle, articleCnt, setArticleCnt }) => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const articleCateNo = queryParams.get('articleCateNo');
  const articleNo = queryParams.get('articleNo'); // 수정할 게시글의 ID를 가져옵니다.

  const navigate = useNavigate();

  const editorRef = useRef();

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
        navigate(`/list?articleCateNo=${articleCateNo}&pg=1`);
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

  return (
    <>
      <input
        className='writeTitle'
        type="text"
        value={articleTitle}
        onChange={(e) => setArticleTitle(e.target.value)}
        placeholder={'제목을 입력하세요.'}
      />

      <div className='writeFile'>
        <input type='file' multiple></input>
        {/** 첨부한 파일명 불러와서 fileList에 표시
         *   새롭게 추가한 파일도 실시간으로 표시
         *   X span에 함수 걸어서 첨부파일 삭제하기 (이거 빢셈)
         */}
        <div className='fileList'>
          <span>첨부파일목록 <span>x</span></span>
          <span>2분기 실적보고서.txt <span>x</span></span>
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
      

      <div className='wrtieBtnBox'>
        <input type='button' value={"취소"} onClick={cancelHandler} />
        <input type='submit' value={"수정완료"} onClick={submitHandler} />
      </div>
    </>
  );
};

export default EditorBoxComponentModify;
