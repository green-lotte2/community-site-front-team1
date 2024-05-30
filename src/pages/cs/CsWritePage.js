import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import EditorBoxComponent1 from '../../components/cs/EditorBoxComponent1';

const CsWritePage = () => {

  const [csCate, setCsCate] = useState(''); // 초기 값을 설정합니다.


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

                    <select name="csCate" id="private" value={csCate} onChange={(e) => setCsCate(e.target.value)}>
                        <option value="">카테고리</option>
                        <option value="결재관련">결재관련</option>
                        <option value="기타">기타</option>
                        <option value="일정관련">일정관련</option>
                        <option value="시스템사용관련">시스템사용관련</option>
                    </select>
                </div> 
            </div>
            
            <div className='writeRow'>
              <EditorBoxComponent1 csCate={csCate}></EditorBoxComponent1>
            </div>
    
          </div>     
        </MainLayout>
      )
}

export default CsWritePage