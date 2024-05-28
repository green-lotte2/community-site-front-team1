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
          <div>웹사이트 서비스 이용 약관 (가제)</div>
          <div>
            <textarea name="" id="">웹사이트 서비스 이용 약관 (가제)</textarea>
          </div>

          <label htmlFor="agree1">동의
            <input type="checkbox" name="" id="agree1" />
          </label>
        </div>

        <div className='memberColumn termsColumn'>
          <div>개인 정보 동의 이용 약관 (가제)</div>
          <div>
            <textarea name="" id="">개인 정보 동의 이용 약관 (가제)</textarea>
          </div>

          <label htmlFor="agree1">동의
            <input type="checkbox" name="" id="agree1" />
          </label>
        </div>

        <div className='memberColumn'>
          <div className='memberRow'>
            <Link className='termsBtn' to="/">취소</Link>
            <input className='termsBtn' type="submit" value="회원가입"/>
          </div>
        </div>

      </div>
    </div>
    </MemberLayout>
  )
}

export default TermsPage