import React, { useState } from 'react'
import MemberLayout from '../../layout/MemberLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl.js';
const rootURL = RootUrl();

const FindIdPage = () => {
    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [code,setCode] = useState("");
    const [savedCode,setsavedCode] = useState("");

    const [stf, setStf] = useState({
        stfName: "",
        stfEmail: "", 
    });



    //유효성 결과 알려주기
    const [emailMessage, setEmailMessage] = useState("");
    const [codeMessage, setCodeMessage] = useState("");
    
    //찾은 아이디값
    const [findId, setFindId] = useState("");
        
    //이메일 스피너
    const [isSendingEmail,setIsSendingEmail] = useState(false);




    const changeHandler = (e) => {
        setStf({ ...stf, [e.target.name]: e.target.value });
    };


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



    const handleSendEmail = (e) => {

        e.preventDefault();

        setIsSendingEmail(true);

        const name = stf.stfName;

        console.log("name을 출력해보자!!! : "+name);


        if (!stf.stfEmail) {
            alert('이메일을 입력하세요.');
            return;
        }

        axios
            .get(`${rootURL}/findIdAndSendEmail?email=${stf.stfEmail}&name=${name}`)
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
          })
          .catch((err) => {
            console.log(err);
          });

          console.log("이메일 : "+stf.stfEmail);
          console.log("이름 : "+stf.stfName);


          //여기는 인증이 끝나고 아이디를 찾는곳 
          axios.get(`${rootURL}/findId`, {
          params: {
            email: stf.stfEmail,
            name : stf.stfName
          }
        })
          .then((response) => {
            const result = response.data.result;
            console.log("result의 값이징(아이디가 나와야해-지금은 안뇽)"+result);
            setFindId(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      const goGoLogin = (e) => {
        navigate(`/login`);

      }

      const goGoFindPw= (e) => {
        navigate(`/FindPw`);

      }


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
                    <input type="text" name="stfName" required value={stf.stfName} onChange={changeHandler}/>
                </div>
            </div>

            <div className='findPack'>
                <div>이메일</div>
                <div>
                    <input type="email" name="stfEmail" value={stf.stfEmail} onChange={onChangeEmail} required/>

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

            <div className='findPack'>
                <div>
                    {stf.stfName} 님의 아이디는 <span>{findId}</span> 입니다.
                </div>
            </div>

            <div className='findPack'>
                <div>
                    <button className='btnColorW' onClick={goGoLogin}>로그인</button>
                    <button className='btnColorW bigBtn' onClick={goGoFindPw}>비밀번호찾기</button>
                </div>
            </div>


          </div>
      </div>
    </MemberLayout>
  )
}

export default FindIdPage