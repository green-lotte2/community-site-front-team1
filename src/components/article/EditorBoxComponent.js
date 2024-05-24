import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react'

const EditorBoxComponent = () => {
    // 게시글 제목 보관
    const [articleTitle, setArticleTitle] = useState('');
    // 게시글 내용 보관
    const editorRef = useRef();

    const onChange = () => {
      const data = editorRef.current.getInstance().getHTML();
      console.log(data);
    };

    const submitHandler = () => {
        alert("저장")
    }

    const cancelHandler = () => {
        alert("취소")
    }

  return (
    <>
        <input className='writeTitle' type="text" onChange={(e) => setArticleTitle(e.target.value)} placeholder='제목을 입력하세요.'/>

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
            <input type='submit' value={"작성"} onClick={submitHandler}/>
            <input type='button' value={"취소"} onClick={cancelHandler}/>
        </div>
    </>
  )
}

export default EditorBoxComponent;