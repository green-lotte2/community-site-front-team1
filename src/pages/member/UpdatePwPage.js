import React, { useEffect, useState } from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl.js';
const rootURL = RootUrl();


const UpdatePwPage = () => {


    const location = useLocation();
    const user = location.state?.user;
    console.log("아이디가 이걸로 들어왔네? : "+user);//사용자 아이디가 들어있음

    
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(false); // 같은 패스워드가 맞는지 확인
    const [passwordMessage, setPasswordMessage] = useState("");

    const [stf, setStf] = useState({
        stfNo: user,
        stfPass: ""
    });


   

    useEffect(() => {
        // 모든 필드가 채워졌는지 확인
        const isPasswordValid = passwordMessage === "안전한 비밀번호 입니다.";
        const isPasswordMatch = stf.stfPass === stf.stfPass2;
        setIsUpdate(isPasswordValid && isPasswordMatch);
    }, [stf, passwordMessage]);


    console.log("update값 : "+isUpdate);


    //패스워드 읽어와서 비밀번호 유효성검사
    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setStf({ ...stf, stfPass: currentPassword });
        const passwordRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            );
        } else {
            setPasswordMessage("안전한 비밀번호 입니다.");
        }
    };

    const changeHandler = (e) => {
        setStf({ ...stf, [e.target.name]: e.target.value });
    };

    const passUpdate = (e) =>{

        e.preventDefault();

        const formData = new FormData();
        // 기존 stf 필드들 추가
        Object.keys(stf).forEach((key) => {
            formData.append(key, stf[key]);
        });

        axios
            .post(`${rootURL}/updatePass`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("완료쓰");
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });

    }





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
                    <input type="password" name="stfPass" value={null} onChange={onChangePassword} required/>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>
                    <p>{passwordMessage}</p>
                </div>
            </div>

            <div className='findPack'>
                <div style={{width: "160px"}}>비밀번호 확인</div>
                <div>
                    <input type="password" name="stfPass2" value={stf.stfPass2} onChange={changeHandler}required/>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>                   
                    {stf.stfPass !== stf.stfPass2 && <span>비밀번호가 일치하지 않습니다.</span>}
                    {stf.stfPass === stf.stfPass2 && <span>비밀번호가 일치합니다.</span>}
                </div>
            </div>




            <div className='findPack'>
                <div>
                    <button className='btnColorW'>뒤로</button>
                    <button onClick={passUpdate} disabled={!isUpdate} className='bigBtn btnColorR'>비밀번호 재설정</button>
                </div>
            </div>

          </div>
      </div>
    </MemberLayout>
  )
}

export default UpdatePwPage