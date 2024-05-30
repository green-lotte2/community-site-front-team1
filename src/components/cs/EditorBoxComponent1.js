import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { postCsWrite } from '../../api/CsApi';

const EditorBoxComponent1 = ({csCate}) => {

  console.log("카테가 잘 들어오나?"+csCate);

    const navigate = useNavigate();

    // 게시글 제목 보관
    const [csTitle, setCsTitle] = useState('');

    // 게시글 내용 보관
    const editorRef = useRef();

    const onChange = () => {
      const data = editorRef.current.getInstance().getHTML();
      console.log(data);
    };

    const submitHandler = async () => {
    const csContent = editorRef.current.getInstance().getHTML();//글 내용과 함께 에디터가 저장이 됨

      // UUID 생성
    const stfNo = 'HR1403'; 

    try {
      const response = await postCsWrite({stfNo, csTitle, csContent,csCate});
      if (response === 1) {
        alert('글이 성공적으로 작성되었습니다.');
        navigate(`/csList`);
      } else {
        alert('글 작성에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Failed to write article:', error);
      alert('글 작성 중 오류가 발생하였습니다.');
    }
  };

    const cancelHandler = () => {
      navigate(`/csList`);
    };
  
  return (
    <>
        <input className='writeTitle' type="text" value={csTitle} onChange={(e) => setCsTitle(e.target.value)} placeholder='제목을 입력하세요.'/>

        <Editor
            initialValue=" "
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}//단축키 사용 설정
            plugins={[colorSyntax]}
            language="ko-KR"
            ref={editorRef}
            onChange={onChange}
            toolbarItems={[
              ['heading', 'bold', 'italic', 'strike'], // 굵게, 기울임꼴 등 텍스트 스타일링 옵션
              ['hr', 'quote'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'link'],
              ['code', 'codeblock'],
              ['scrollSync'],
            ]}
        />

        <div className='wrtieBtnBox'>
            <input type='button' value={"취소"} onClick={cancelHandler}/>   
            <input type='submit' value={"작성"} onClick={submitHandler}/>
        </div>
    </>
  )
}

export default EditorBoxComponent1;