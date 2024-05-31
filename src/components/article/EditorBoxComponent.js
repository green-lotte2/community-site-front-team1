import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ArticleWrite } from '../../api/ArticleApi';
//import { uploadImage } from './api/imageApi'; // 이미지 업로드 API를 호출하는 함수

const EditorBoxComponent = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleCateNo = queryParams.get('articleCateNo');
    
    const navigate = useNavigate();

    // 게시글 제목 보관
    const [articleTitle, setArticleTitle] = useState('');

    // 게시글 내용 보관
    const editorRef = useRef();

    //const [thumbnailUrl, setThumbnailUrl] = useState('');

    const onChange = () => {
      const data = editorRef.current.getInstance().getHTML();
      console.log(data);
    };

    const submitHandler = async () => {
    const articleCnt = editorRef.current.getInstance().getHTML();

/*
    const handleImageUpload = async (file) => {
      try {
          const imageUrl = await uploadImage(file); // 이미지를 업로드하고 URL을 받아옴
          setThumbnailUrl(imageUrl); // 업로드된 이미지 URL을 저장
      } catch (error) {
          console.error('Failed to upload image:', error);
      }
  };
*/

      // UUID 생성
    const stfNo = 'HR1403';   // 로그인아이디 없어서 db stfNo로 직접 넣었음
    const writer = '테스터';

    try {
      const response = await ArticleWrite({writer, stfNo, articleTitle, articleCnt, articleCateNo });
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
            placeholder= "내용을 입력해 주세요."

            //hooks= {{
            //  async addImageBlobHook(blob, callback) { // 이미지 업로드 로직 커스텀
            //      try {
            //          /*
            //           * 1. 에디터에 업로드한 이미지를 FormData 객체에 저장
            //           *    (이때, 컨트롤러 uploadEditorImage 메서드의 파라미터인 'image'와 formData에 append 하는 key('image')값은 동일해야 함)
            //           */
            //          const formData = new FormData();
            //          formData.append('image', blob);
  //
            //          // 2. FileApiController - uploadEditorImage 메서드 호출
            //          const response = await fetch('/tui-editor/image-upload', {
            //              method : 'POST',
            //              body : formData,
            //          });
  //
            //          // 3. 컨트롤러에서 전달받은 디스크에 저장된 파일명
            //          const filename = await response.text();
            //          console.log('서버에 저장된 파일명 : ', filename);
  //
            //          // 4. addImageBlobHook의 callback 함수를 통해, 디스크에 저장된 이미지를 에디터에 렌더링
            //          const imageUrl = `/tui-editor/image-print?filename=${filename}`;
            //          callback(imageUrl, 'image alt attribute');
  //
            //      } catch (error) {
            //          console.error('업로드 실패 : ', error);
            //      }
            //  }
            //}}

            /*
            hooks={{
              addImageBlobHook: async (file, callback) => {
                  try {
                      const imageUrl = await uploadImage(file); // 이미지 업로드
                      callback(imageUrl, 'alt text'); // 콜백 함수를 호출하여 이미지 삽입
                  } catch (error) {
                      console.error('Failed to upload image:', error);
                  }
              },
          }}
          */
        />
        {/*
        {thumbnailUrl && <img src={thumbnailUrl} alt="Thumbnail" />} 
        */}{/* 썸네일 렌더링 */}

        <div className='wrtieBtnBox'>
            <input type='button' value={"취소"} onClick={cancelHandler}/>   
            <input type='submit' value={"작성"} onClick={submitHandler}/>
        </div>
        
    </>
  )
}

export default EditorBoxComponent;