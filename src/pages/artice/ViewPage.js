import React from 'react'
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import MainLayout from '../../layout/MainLayout'

const ViewPage = () => {

    const data =
    '# 테스트<p>테스트 글쓰기 테스트</p><p>줄바꿈 테스트</p><p><span style="color: #a1b56c">색깔 들어간 텍스트</span></p><p><del>밑줄 텍스트 테스트</del></p><ul><li><p>글머리기호1</p></li><li><p>글머리기호2</p></li></ul>';

    const modifyHandler = () => {
      alert("수정")
  }

  const deleteHandler = () => {
      alert("삭제")
  }

  const listHandler = () => {
    alert("목록")
  }

  return (
    <MainLayout>
        <div className="contentBox boxStyle7">
            <div className="contentTitle font30 alignL">ㅁㅁㅁ 게시판</div>
            
            <div className='writeRow'>
                <p>게시글 제목입니다.</p>
                <Viewer initialValue={data}/>
            </div>

            <div className='writeRow'>
              <div className='wrtieBtnBox'>
                <input type='submit' value={"수정"} onClick={modifyHandler}/>
                <input type='submit' value={"삭제"} onClick={deleteHandler}/>
                <input type='button' value={"목록"} onClick={listHandler}/>
              </div>
            </div>

        </div>     
    </MainLayout>
  )
}

export default ViewPage;