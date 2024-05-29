import React from 'react'
import MainLayout from '../../layout/MainLayout'
import EditorBoxComponent from '../../components/article/EditorBoxComponent';

const CsWritePage = () => {
    return (
        <MainLayout>
          <div className="contentBox boxStyle7">
            <div className="contentTitle font30" style={{justifyContent:"space-between"}}>
                글쓰기
                <div className="CsSelect">
                    <input type="radio" id="public" name='secret' checked/>
                    <label htmlFor="public">전체공개</label>
                    
                    <input type="radio" id="private" name='secret'/>
                    <label htmlFor="private">비밀글</label>

                    <select name="" id="">
                        <option value="">결재</option>
                        <option value="">CS카테고리</option>
                        <option value="">어떻게</option>
                        <option value="">나누면</option>
                        <option value="">좋지?</option>
                    </select>
                </div> 
            </div>
            
            

            <div className='writeRow'>
              <EditorBoxComponent></EditorBoxComponent>
            </div>
    
          </div>     
        </MainLayout>
      )
}

export default CsWritePage