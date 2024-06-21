import React, { useEffect, useState } from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl.js';
const rootURL = RootUrl();


const FindPwPage = () => {

    const navigate = useNavigate();
    
    const [code,setCode] = useState("");
    const [savedCode,setsavedCode] = useState("");

    const [stf, setStf] = useState({
        stfNo: "",
        stfEmail: "", 
    });




    const [showResetButton, setShowResetButton] = useState(false);
    const [verifySuccess, setVerifySuccess] = useState(false);


    //유효성 결과 알려주기
    const [emailMessage, setEmailMessage] = useState("");
    const [idMessage,setIdMessage] = useState("");
    const [codeMessage, setCodeMessage] = useState("");

    //이메일 스피너
    const [isSendingEmail,setIsSendingEmail] = useState(false);


    //이메일 유효성 검사
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setStf({ ...stf, stfEmail: currentEmail });
        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다!");
        } else {
            setEmailMessage("사용 가능한 이메일 입니다.");
        }
    };

    // 아이디 유효성 검사
    const onChangeId = (e) => {
    const currentId = e.target.value;
    setStf({ ...stf, stfNo: currentId });
    
    // 아이디가 영문자와 숫자로만 구성되어야 함
    const idRegExp = /^[A-Za-z0-9]{4,12}$/; // 예시: 영문자와 숫자로 이루어진 4자 이상 12자 이하

    if (!idRegExp.test(currentId)) {
        setIdMessage("아이디는 영문자와 숫자로만 구성되어야 하며, 4자 이상 12자 이하여야 합니다.");
    } else {
        setIdMessage("사용 가능한 아이디입니다.");
    }
};



    const handleSendEmail = (e) => {

        e.preventDefault();

        setIsSendingEmail(true);

        if (!stf.stfEmail) {
            alert('이메일을 입력하세요.');
            return;
        }

        axios
            .get(`${rootURL}/findPassAndSendEmail?email=${stf.stfEmail}&id=${stf.stfNo}`)
            .then((response) => {
                const result = response.data.result;
                const receivedCode = response.data.savedCode;
                console.log("이게 결과값?" + result);
                setEmailMessage(result); // 서버에서 받은 결과를 상태로 관리
                setsavedCode(receivedCode);

                setIsSendingEmail(false);

                if (result === '성공') { // 인증 코드 입력 필드 표시
                    alert('이메일을 성공적으로 보냈습니다');
                }else{
                    alert("가입이 되어있지 않은 이메일 주소입니다. 가입을 먼저 해주세요");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };




    const handleVerifyCode = (e) => {

        e.preventDefault();

        //여기는 인증번호 확인하는 곳
        axios.get(`${rootURL}/verifyCode`, {
          params: {
            email: stf.stfEmail,
            code: code,
            scode: savedCode
          }
        })
          .then((response) => {
            const result = response.data.result;
            setCodeMessage(result); // 서버에서 받은 인증 결과를 상태로 관리
            console.log("아니 왜 실패로 뜨는거야!!!"+result);

            if(result ==='성공'){

                setVerifySuccess(true);
                setShowResetButton(true); // 버튼 보이기
            
            }else{
                
                setVerifySuccess(false); // 인증 실패 시 상태 변수 업데이트
                setShowResetButton(false); // 버튼 숨기기
            }
          })
          .catch((err) => {
            console.log(err);
          });

          console.log("이메일 : "+stf.stfEmail);
          console.log("아이디 : "+stf.stfNo);

        }
      
      const goGoLogin = () => {
        navigate(`/login`);

      }

      const goPwChage = () => {

        navigate(`/updatePw`, { state: { user: stf.stfNo} });

      }


  return (
    <MemberLayout>
      <div className="memberBack findIdBack">
          <div className="registerBox" >

            <div className="memberTitle">비밀번호 찾기</div>

            <div className='findPack'>
                <div>
                    <h2>회원가입시 등록한 이메일 인증을 통해 비밀번호를 찾을 수 있습니다.</h2>
                </div>
            </div>

            <div className='findPack'>
                <div>아이디</div>
                <div>
                    <input type="text" required value={stf.stfNo} onChange={onChangeId}/>
                </div>
            </div>

            <div className='findPack'>
                <div>이메일</div>
                <div>
                    <input type="email" required value={stf.stfEmail} onChange={onChangeEmail}/>
                    <button onClick={handleSendEmail} disabled={isSendingEmail}>
                      {isSendingEmail ? <div className="spinner"></div> : '인증'}          
                    </button>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>
                    <p>{emailMessage}</p>
                </div>
            </div>

            <div className='findPack'>
                <div>인증번호</div>
                <div>
                    <input type="email" required value={code} onChange={(e) => setCode(e.target.value)}/>
                    <button onClick={handleVerifyCode}>확인</button>
                </div>
            </div>

            <div className='findPack'>
                <div></div>
                <div>
                    <p>{codeMessage}</p>
                </div>
            </div>

            {showResetButton &&(
                        <div className='findPack'>
                            <div>
                                <button className='bigBtn btnColorR' onClick={goPwChage}>비밀번호 재설정</button>
                            </div>
                        </div>
                    )}

            <div className='findPack'>
                <div>
                    <button onClick={goGoLogin} className='btnColorW'>로그인</button>
                </div>
            </div>
          </div>
      </div>
    </MemberLayout>
  )
}

export default FindPwPage