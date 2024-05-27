import React from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { Link } from 'react-router-dom'

const TermsPage = () => {
  return (
    <MemberLayout>
    <div className='memberBack termsBack'>
      <div className='memberBox'>
        <div className='memberTitle'>이용약관</div>

        <div className='memberColumn termsColumn'>
          <div>이용약관1</div>
          <div>
            <textarea name="" id="">약관내용1</textarea>
          </div>

          <label htmlFor="agree1">동의
            <input type="checkbox" name="" id="agree1" />
          </label>
        </div>

        <div className='memberColumn termsColumn'>
          <div>이용약관2</div>
          <div>
            <textarea name="" id="">약관내용2</textarea>
          </div>

          <label htmlFor="agree1">동의
            <input type="checkbox" name="" id="agree1" />
          </label>
        </div>

        <div className='memberColumn'>
          <div className='memberRow'>
            <Link to="/">취소</Link>
            <input type="submit" value="회원가입"/>
          </div>
        </div>

      </div>
    </div>
    </MemberLayout>
  )
}

export default TermsPage