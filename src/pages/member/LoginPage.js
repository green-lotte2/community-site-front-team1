import React from 'react'
import MemberLayout from '../../layout/MemberLayout';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <MemberLayout>
    <section id="loginArea">
        <div className="loginBox">
            <div>
                <img className="loginImg" src="../images/zeroPieLogo.png" alt=""/>
            </div>

            <p>WelcomeBack</p>

            <div>
                <Link to="#" className="socialLogin">
                    <img src="../images/googleIcon.png" alt=""/>
                    <span>GoogleLogin</span>
                </Link>
            </div>

            <form action="#">
                <input type="text"/>
                <input type="password"/>
                <label for="">
                    <input type="checkbox"/> 아이디 저장
                </label>

                <input type="submit" value="로그인"/>
            </form>

            <div className="loginEtc">
                <Link to="/">아이디찾기</Link>
                <Link to="/">비밀번호찾기</Link>
                <Link to="/register">회원가입</Link>
            </div>
        </div>

        <div className="loginBox">
            <img src="../images/iconSample4.PNG" alt=""/>
        </div>
    </section>
    </MemberLayout>
  )
}

export default LoginPage