import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import { useSelector } from 'react-redux';
import { selectStfInfoApi, sendEmailCodeApi } from '../../api/MainApi';
import { RootUrl } from '../../api/RootUrl';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { stfHpCheckApi } from '../../api/MemberApi';

const MyPage = () => {

    const loginSlice = useSelector((state) => state.loginSlice);
    const userId = loginSlice.userId;

    /** 수정 상태 관리 */
    const [inputState, setInputState] = useState(false);
    const handleModify = (event) => {
        setInputState(true);
        const updateInput = document.getElementsByClassName("update");

        Array.from(updateInput).forEach(each => {
            each.readOnly = false;
            each.style.border = "1px solid #b0b0b0"
            if (each.type === "email") {
                each.style.width = "220px";
            }
        });

    }

    /** 수정 완료 */
    const handleSave = () => {
        const updateInput = document.getElementsByClassName("update");
        setInputState(false);
        Array.from(updateInput).forEach(each => {
            each.readOnly = true;
            each.style.border = "0"
            if (each.type === "email") {
                each.style.width = "280px";
            }
        });
    }

    // 페이지 로드시 회원 정보 조회
    const [stfInfo, setStfInfo] = useState("");
    useEffect (() => {
        const selectStfInfo = async () => {
            try {
                const response = await selectStfInfoApi(userId);
                console.log("res",response);
                setStfInfo(response);
                
            } catch (error) {
                console.log(error);
            }
        }
        selectStfInfo();
    }, [])

    /** 연락처 알림 */
    const [hpmsg, setHpmsg] = useState("");

    /** 연락처 유효성 & 중복 검사 */
    const [hpRed, setHpRed] = useState(false);
    const hpUseCheck = (e) => {
        const currentPhone = e.target.value;
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        setStfInfo(prev => ({...prev, stfPh:currentPhone}));

        if (!phoneRegExp.test(currentPhone)) {
            setHpmsg("유효하지 않은 연락처입니다.");
            setHpRed(true);
        } else {
            const checkHpUse = async () => {
                try {
                    const response = await stfHpCheckApi(currentPhone);
                    console.log(response)
                    if (response > 0) {
                        setHpmsg("이미 사용중인 연락처입니다.");
                        setHpRed(true);
                    }else {
                        setHpmsg("");
                        setHpRed(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            checkHpUse();
        }
    }

    /** 이메일 알림 */
    const [emailmsg, setEmailmsg] = useState("");

    /** 이메일 유효성 검사 */
    const [emailRed, setEmailRed] = useState(false);
    const emailUseCheck = (e) => {
        const currentEmail = e.target.value;
        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        setStfInfo(prev => ({...prev, stfEmail:currentEmail}));

        if (!emailRegExp.test(currentEmail)) {
            setEmailmsg("유효하지 않은 이메일입니다.");
            setEmailRed(true);
        } else {
            setEmailmsg("");
            setEmailRed(false);
        }
    };

    /** 이메일 인증번호 발송 */
    const [emailState, setEmailState] = useState(false);
    const emailCheck = async () => {
        if (!emailRed) {
            setEmailState(!emailState);
            try {
                const response = await sendEmailCodeApi(stfInfo.stfEmail);
                console.log(response);
                setEmailmsg("인증코드가 전송되었습니다.");
            } catch (error) {
                console.log(error);
            }
        }
    }

    /** 이메일 인증번호 코드 확인 */
    const codeCheck = () => {
        try {
            const response = "gotoApi_checkCode";
            console.log(response);
            setEmailState(!emailState);
            setEmailmsg("이메일이 인증되었습니다.");
        } catch (error) {
            console.log(error);
        }
    }

    //검색버튼을 클릭하면 주소창 팝업
    const openDaumPostcode = useDaumPostcodePopup();

    //우편주소
    const handlePostcode = () => {
        openDaumPostcode({
            onComplete: (data) => {
                setStfInfo({ ...stfInfo, stfZip: data.zonecode, stfAddr1: data.address });
            }
        });
    };

    /** 이메일 코드 인증 중복 검사 주소 덮어쓰기 가입일 덮어쓰기 최종 DB 저장하기 남음 */

  return (
    <MainLayout>
        <div className='chatBox'>
            <div className="contentBox boxStyle7">
                <div className='myPage'>
                    <div style={{borderBottom:"1px solid #dddddd"}}>
                        <img src={`${RootUrl()}/images/${stfInfo.stfImg}`} alt="" />
                        <div className='myInfo'>
                            <p>{stfInfo.stfName}</p>
                            <p>직책 : {stfInfo.strRnkNo}</p>
                            <p>부서 : {stfInfo.strDptName}</p>
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>연락처</p>
                            <label htmlFor="" style={{alignItems:"center", flexDirection:"column"}}>
                                <input className='update' type='text' name='stfPh' 
                                    value={stfInfo.stfPh} 
                                    onChange={(e) => hpUseCheck(e)}
                                    style={{ border: hpRed ? '2px solid red' : '1px solid green' }}
                                    />
                                {inputState && <span style={{ color: hpRed ? 'red' : 'green' }} >{hpmsg}</span>}
                            </label>
                        </div>
                        <div>
                            <p>이메일</p> 
                            <div style={{alignItems:"center", flexDirection:"column"}}>
                                <label htmlFor="" style={{alignItems:"center"}}>
                                    <input className='update' type='email' name='stfEmail'
                                        value={stfInfo.stfEmail}
                                        onChange={(e) => emailUseCheck(e)}
                                        style={{ border: hpRed ? '2px solid red' : '1px solid green' }}
                                        />
                                    {inputState && <button className='sBtn' onClick={emailCheck}>인증</button>}
                                </label>
                                {emailState && 
                                    <label htmlFor="" style={{alignItems:"center"}}>
                                        <input className='update' type='text' name='code' style={{width:"220px", border:"1px solid #b0b0b0"}}/>
                                        {inputState && <button className='sBtn' onClick={codeCheck}>확인</button>}
                                    </label>
                                }
                                {inputState && <span style={{ color: emailRed ? 'red' : 'green' }}>{emailmsg}</span>}
                            </div>
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>주소</p> 
                            <div style={{flexDirection:"column"}}>
                                <label htmlFor="">
                                    <input className='update' type='text' name='stfZip' value={stfInfo.stfZip}/>
                                    {inputState && <button className='sBtn' onClick={handlePostcode}>검색</button>}
                                    
                                </label>
                                <label htmlFor="">
                                    <input className='update' type='text' name='stfAddr1' value={stfInfo.stfAddr1}/>
                                    <input className='update' type='text' name='stfAddr2' value={stfInfo.stfAddr2}/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>가입일</p> 
                            <input className='update' type='date' name='stfEnt' value={stfInfo.stfEnt}/></div>
                        <div>
                            <p>상태</p>
                            {stfInfo.stfStatus === "Active" && <input type="text" name='stfStatus' value="재직중"/>}
                            {stfInfo.stfStatus === "Break" && <input type="text" name='stfStatus' value="중단?"/>}
                            {stfInfo.stfStatus === "Departed" && <input type="text" name='stfStatus' value="탈퇴?"/>}
                            
                        </div>
                    </div>

                    <div className='myContent'>
                        <div>
                            <p>권한</p> 
                            <input type='text' name='stfRole' value={stfInfo.stfRole}/></div>
                        <div>
                            <p>플랜</p> 
                            {stfInfo.planNo === 1 && <input type="text" name='planStatusNo' value="BASIC"/>}
                            {stfInfo.planNo === 2 && <input type="text" name='planStatusNo' value="STANDARD"/>}
                            {stfInfo.planNo === 3 && <input type="text" name='planStatusNo' value="PREMIUM"/>}
                        </div>
                    </div>

                    <div style={{justifyContent:"end"}}>
                        {!inputState && <button onClick={handleModify} style={{marginTop:"10px"}}>수정</button>}
                        {inputState && <button onClick={handleSave} style={{marginTop:"10px"}}>완료</button>}
                        
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default MyPage