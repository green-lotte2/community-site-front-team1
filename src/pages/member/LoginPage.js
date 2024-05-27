import React, { useState } from "react";
import MemberLayout from '../../layout/MemberLayout';
import { Link, useNavigate } from 'react-router-dom';


import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../slice/LoginSlice"; 


const initState = {
    uid: "",
    pass: "",
  };

const LoginPage = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginParam, setLoginParam] = useState({ ...initState });
  
    const changeHandler = (e) => {
        console.log("여기 일단 들어와?");
      //loginParam[e.target.name] = e.target.value;
      setLoginParam({ ...loginParam, [e.target.name]: e.target.value });
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      // 반드시 FormData로 생성해서 username, password로 선언해야 spring security 인증처리 됨
      const formData = new FormData();
      formData.append("username", loginParam.uid);
      formData.append("password", loginParam.pass);
      /*
      const formData = {
        username: loginParam.uid,
        password: loginParam.pass,
      };
      */
  
      axios
        .post("http://localhost:8080/onepie/login",formData)//loginParam
        .then((response) => {
          console.log("here1 : " + JSON.stringify(response.data));
  
          // redux 액션 실행
          dispatch(login(response.data));
  
          // 메인 이동
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };

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
                    <img src="/images/googleIcon.png" alt=""/>
                    <span>GoogleLogin</span>
                </Link>
            </div>

            <form onSubmit={submitHandler}>
                <input type="text" name = "uid" placeholder='아이디입력' value={loginParam.uid} onChange={changeHandler} />
                <input type="password" name="pass" placeholder='비밀번호입력' value={loginParam.pass} onChange={changeHandler}/>
                <label htmlFor="myInput">
                    <input type="checkbox"/> 아이디 저장
                </label>

                <input type="submit" value="로그인" className='btnLogin'/>
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