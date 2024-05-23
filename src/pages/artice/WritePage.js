import React from 'react'
import MainLayout from '../../layout/MainLayout';
import EditorBoxComponent from '../../components/article/EditorBoxComponent';


const WritePage = () => {
  return (
    <MainLayout>
      <div className="contentBox boxStyle7">
        <div className="contentTitle font30 alignL">ㅁㅁㅁ 게시판</div>
          
        <div className='writeRow'>
          <EditorBoxComponent></EditorBoxComponent>
        </div>

      </div>     
    </MainLayout>
  )
}

export default WritePage;