import React from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { Link } from 'react-router-dom'

const FindIdPage = () => {
  return (
    <MemberLayout>
      <div className="memberBack findIdBack">
          <div className="registerBox" >

            <div className="memberTitle">아이디 찾기</div>

            <div className='findPack'>
                <div>
                    <h2>회원가입시 등록한 이메일 인증을 통해 아이디를 찾을 수 있습니다.</h2>
                </div>
            </div>

            <div className='findPack'>
                <div>이름</div>
                <div>
                    <input type="text" required/>
                </div>
            </div>

            <div className='findPack'>
                <div>이메일</div>
                <div>
                    <input type="email" required/>
                    <button>인증</button>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>
                    <p>유효하지 않은 이메일입니다.</p>
                </div>
            </div>

            <div className='findPack'>
                <div>인증번호</div>
                <div>
                    <input type="email" required/>
                    <button>확인</button>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>
                    <p>인증번호가 일치하지 않습니다.</p>
                </div>
            </div>

            <div className='findPack'>
                <div>
                    홍길동 님의 아이디는 <span>abcd1234</span> 입니다.
                </div>
            </div>

            <div className='findPack'>
                <div>
                    <button className='btnColorW'>뒤로</button>
                    <button className='btnColorW'>로그인</button>
                </div>
            </div>


          </div>
      </div>
    </MemberLayout>
  )
}

export default FindIdPage