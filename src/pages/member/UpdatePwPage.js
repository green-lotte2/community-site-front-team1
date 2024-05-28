import React from 'react'
import MemberLayout from '../../layout/MemberLayout'

const UpdatePwPage = () => {
  return (
    <MemberLayout>
      <div className="memberBack findIdBack">
          <div className="registerBox" >

            <div className="memberTitle">비밀번호 재설정</div>

            <div className='findPack'>
                <div>
                    <h2>
                        회원님의 비밀번호를 초기화하고 재설정합니다.<br/>
                        숫자+영문자+특수문자 조합으로 8자리 이상
                    </h2>
                </div>
            </div>

            <div className='findPack'>
                <div style={{width: "160px"}}>새 비밀번호</div>
                <div>
                    <input type="password" required/>
                </div>
            </div>

            <div className='findPack'>
                <div style={{width: "160px"}}>비밀번호 확인</div>
                <div>
                    <input type="password" required/>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>
                    <p>유효하지 않은 비밀번호입니다.</p>
                </div>
            </div>


            <div className='findPack'>
                <div>
                    <button className='btnColorW'>뒤로</button>
                    <button className='bigBtn btnColorR'>비밀번호 재설정</button>
                </div>
            </div>

          </div>
      </div>
    </MemberLayout>
  )
}

export default UpdatePwPage