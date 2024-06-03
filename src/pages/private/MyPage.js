import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'

const MyPage = () => {

    const [inputState, setInputState] = useState(false);
    const [inputName, setInputName] = useState({
        stfPh : "stfPh",
        stfEmail: "stfEmail",
        stfZip: "stfZip",
        stfAddr1: "stfAddr1",
        stfAddr2: "stfAddr2",
    })

    const handleModify = (event) => {
        setInputState(true);
    }

    useEffect (() => {
        if (inputState) {
            for (const key in inputName) {
                if (inputName.hasOwnProperty(key)) {
                    console.log(`${key}: ${inputName[key]}`);
                    // 여기서 각 키와 값을 처리할 수 있습니다.
                }
            }
        }
    }, [inputState])

  return (
    <MainLayout>
        <div className='chatBox'>
            <div className="contentBox boxStyle7">
                <div className='myPage'>
                    <div style={{borderBottom:"1px solid #dddddd"}}>
                        <img src="../images/iconSample3.PNG" alt="" />
                        <div className='myInfo'>
                            <p>홍길동</p>
                            <p>직책 : 대리</p>
                            <p>부서 : 인사지원부</p>
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>연락처</p> 
                            <input type='text' name='stfPh' value="010-1234-5678"/></div>
                        <div>
                            <p>이메일</p> 
                            <input type='email' name='stfEmail' value="abc1234@gmail.com"/></div>
                    </div>

                    <div className='myContent' style={{height:"70px"}}>
                        <div>
                            <p>주소</p> 
                            <div style={{flexDirection:"column"}}>
                                <input type='text' name='stfZip' value="12345"/>
                                <label htmlFor="">
                                    <input type='text' name='stfAddr1' value="부산시 부산진구 새싹로30"/>
                                    <input type='text' name='stfAddr2' value="12345"/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>가입일</p> 
                            <input type='text' name='stfEnt' value="24.05.06"/></div>
                        <div>
                            <p>상태</p> 
                            <input type="text" name='stfStatus' value="재직중"/>
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>권한</p> 
                            <input type='text' name='stfRole' value="USER"/></div>
                        <div>
                            <p>플랜</p> 
                            <input type="text" name='planStatusNo' value="제일싼거이용중~"/>
                        </div>
                    </div>

                    <div style={{justifyContent:"end"}}>
                        <button onClick={handleModify}>수정</button>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default MyPage