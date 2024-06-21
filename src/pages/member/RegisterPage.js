import React, { useEffect, useState } from 'react';
import MemberLayout from '../../layout/MemberLayout';
import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { useCookies } from 'react-cookie';
import { RootUrl } from '../../api/RootUrl.js';
import { getPlanStatusNo } from '../../api/MemberApi.js';
const rootURL = RootUrl();




const RegisterPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');//일반 유저인지, 관리자인지

    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null); // 파일을 상태로 관리onst [file, setFile] = useState(null);
    const [email, setEmail] = useState('');


    const profileHandler = (files) => {
        const selectedFile = files[0];
        setFile(selectedFile);

        // 선택한 프로필 사진 보기 - setFile 이후의 file 값을 사용해야 함
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview);

        // stf 상태 업데이트
        setStf((prevStf) => ({
            ...prevStf,
            thumbFile: selectedFile
        }));
    };

    const navigate = useNavigate();

    const [stf, setStf] = useState({
        stfName: "",
        stfPass: "",
        stfPh: "",
        stfZip: "",
        stfAddr1: "",
        stfAddr2: "",
        stfEmail: "",
        stfBirth: "",
        stfEnt: "",
        stfRole: type,
        dptNo: "",
        rnkNo: "",
        thumbFile: null,
        planStatusNo:"",//최고 관리자가 선택한 요금제를 따라가기
    });

    const [loading, setLoading] = useState(true);
    const [positions, setPositions] = useState([]);
    const [deps, setDeps] = useState([]);
    const [showVerification, setShowVerification] = useState(false); // 인증 코드 입력 필드 표시 여부
    const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 입력 값   
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태
    const [savedCode , setsavedCode] = useState(null);

    //유효성 결과 보여주기
    const [passwordMessage, setPasswordMessage] = useState(false);
    const [emailMessage, setEmailMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [verificationMessage, setVerificationMessage] = useState(""); // 인증 결과 메시지
    const [passMatchMessage,setPassMatchMessage] = useState(false);
    
    //이메일 스피너
    const [isSendingEmail,setIsSendingEmail] = useState(false);



    useEffect(() => {
        // 모든 필드가 채워졌는지 확인
        const isAllFieldsFilled = Object.values(stf).every((value) => value !== "");
        const isPasswordValid = passwordMessage === true;
        const isEmailValid = emailMessage === "성공";
        const isPhoneValid = phoneMessage === true;
        const isEmailCodeValid = verificationMessage === "성공";
        const isPasswordMatch = stf.stfPass === stf.stfPass2;
        const isFileUploaded = stf.thumbFile !== null;
        setIsFormValid(isAllFieldsFilled && isPasswordValid && isEmailValid && isPhoneValid && isPasswordMatch && isFileUploaded&&isEmailCodeValid);
    }, [stf, passwordMessage, emailMessage, phoneMessage]);



    const [cookies, setCookie, removeCookie] = useCookies(['Terms']);

    // 컴포넌트가 렌더링될 때(마운트)
    useEffect(() => {
        console.log("컴포넌트가 렌더링될 때(마운트)");

        if (!cookies.Terms) {
            alert("유효하지 않은 접근입니다.");
            navigate('/login');
            return
        }
        /*
        const data = ['사원','대리','과장','차장','부장']
        setPositions(data);    
        */

        axios.get(`${rootURL}/findPosition`)
            .then((data) => {
                setPositions(data.data.result)
                console.log(data.data.result)
            }).catch((err) => {
                console.log(err);
            });

        axios.get(`${rootURL}/findRnk`)
            .then((data) => {
                setDeps(data.data.result)
                console.log("어떤 값이 있는지 찍어봅시다 : ",data.data.result)
            }).catch((err) => {
                console.log(err);
            });

            findPlanStatusNo();

        return () => {
            removeCookie('Terms', { path: '/' });
        }

    }, []);


        //최고 관리자의 요금제 구하기
        const findPlanStatusNo = async () =>{        
        
            const result = await getPlanStatusNo();
            
            setStf(prevStf => ({ ...prevStf, planStatusNo: result }));
            
            console.log("요금제 : ",result);
        }




    useEffect(() => {
        console.log("stf thumbFile 찍어보기 : ", stf.thumbFile);
    }, [stf.thumbFile, file]); // file 상태도 감지하여 변경되면 useEffect가 호출되도록 설정

    //검색버튼을 클릭하면 주소창 팝업
    const openDaumPostcode = useDaumPostcodePopup();




    //우편주소
    const handlePostcode = () => {
        openDaumPostcode({
            onComplete: (data) => {
                setStf({ ...stf, stfZip: data.zonecode, stfAddr1: data.address });
            }
        });
    };



    //이메일 보내기
    const handleSendEmail = (e) => {

        e.preventDefault();


        if (!stf.stfEmail) {
            alert('이메일을 입력하세요.');
            return;
        }

        setIsSendingEmail(true);

        axios
            .get(`${rootURL}/sendEmail?email=${stf.stfEmail}`)
            .then((response) => {
                const result = response.data.result;
                const receivedCode = response.data.savedCode;
                console.log("이게 결과값?" + result);
                setEmailMessage(result); // 서버에서 받은 결과를 상태로 관리
                setsavedCode(receivedCode);

                setIsSendingEmail(false);

                if (result === '성공') { // 인증 코드 입력 필드 표시
                    alert('이메일을 성공적으로 보냈습니다');
                    console.log("시스템에서 생성했던 code번호 : "+receivedCode);
                    setShowVerification(true);
                }else{
                    alert("이미 가입되어 있는 이메일 주소입니다");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };





    //확인 코드 보내기
    const handleVerifyCode = (e) => {

        console.log("savedCode : "+savedCode);

        e.preventDefault();

        axios.get(`${rootURL}/verifyCode`, {
          params: {
            email: stf.stfEmail,
            code: verificationCode,
            scode: savedCode
          },
          //withCredentials: true // 세션 쿠키 포함(사용안함:세션사용안함)
        })
          .then((response) => {
            const result = response.data.result;
            setVerificationMessage(result); // 서버에서 받은 인증 결과를 상태로 관리
          })
          .catch((err) => {
            console.log(err);
          });
      };

      console.log("isPasswordValid"+passwordMessage);
      console.log("isEmailValid"+emailMessage);
      console.log("isPhoneValid"+phoneMessage);
      console.log("isEmailCodeValid"+verificationMessage);
      console.log("isPasswordMatch"+stf.stfPass === stf.stfPass2);
      console.log("isFileUploaded"+stf.thumbFile !== null);
  



    //회원가입버튼 클릭(post전송)
    const submitHandler = (e) => {
        e.preventDefault();

        alert("회원가입이 완료되었습니다");

        const formData = new FormData();
        // 기존 stf 필드들 추가
        Object.keys(stf).forEach((key) => {
            formData.append(key, stf[key]);
        });

        // 파일 필드 추가
        formData.append("file", file);

        console.log("직급 찍어보기 : ",stf.rnkNo);
        console.log("부서 찍어보기 : ",stf.dptNo);

        console.log("formData에 있는것들 찍어보기 : ", formData);


       
        axios
            .post(`${rootURL}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("결과물 이건 data : "+response.data.stfNo);

                if(type=="ADMIN"){
                    navigate(`/groupPlan?stfNo=${response.data.stfNo}`);
                }else{
                    navigate("/complete", {state: { user: response.data.stfNo }});
                }
            })
            .catch((err) => {
                console.log(err);
            });
            

    };

    const changeHandler = (e) => {
        setStf({ ...stf, [e.target.name]: e.target.value });
    };

    //패스워드 읽어와서 비밀번호 유효성검사
    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setStf({ ...stf, stfPass: currentPassword });
        const passwordRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setPasswordMessage(
                false
                //"숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            );
        } else {
            setPasswordMessage(
                true
                //"안전한 비밀번호 입니다."
            );
        }
    };


    //이메일 유효성 검사
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setStf({ ...stf, stfEmail: currentEmail });
        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage(false);
        } else {
            setEmailMessage(true);
        }
    };


    //핸드폰 유효성(정규표현식 수정완료)
    const onChangePhone = (e) => {
        const currentPhone = e.target.value;
        setStf({ ...stf, stfPh: currentPhone });
        const phoneRegExp = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage(false);
        } else {
            setPhoneMessage(true);
        }
    };

    return (
        <MemberLayout>
            <div className='memberBack registerBack'>
                <form className="registerBox" onSubmit={submitHandler}>
                    
                    <div className="memberTitle" style={{margin:"10px 0 0 0"}}>회원가입</div>

                    <div className="registerPack">
                        <div className="registerRow">
                            <div className="imageBox">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Dropzone onDrop={profileHandler}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div style={{ width: 100, height: 100, border: '1px solid lightgray', display: 'flex', alignSelf: 'center' }}
                                                {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                {preview ? (<img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) :
                                                    (<p style={{ color: 'lightgray', fontSize: '40px', margin: '20% 32%' }}>+</p>)}
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                                <div style={{paddingLeft: "10px"}}>사진을 등록해주세요.</div>
                            </div>
                        </div>
                        <div className="registerRow"></div>
                    </div>

                    <div className="registerPack">
                        <div className="registerRow">
                            <div>이름</div>
                            <div>
                                <input
                                    type="text"
                                    name="stfName"
                                    value={stf.stfName}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        </div>

                        <div className="registerRow">
                            <div>입사일</div>
                            <div>
                                <input
                                    type="date"
                                    name="stfEnt"
                                    value={stf.stfEnt}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="registerPack">
                        <div className="registerRow">
                            <div>비밀번호</div>
                            <div>
                                <input
                                    type="password"
                                    name="stfPass"
                                    value={stf.stfPass}
                                    onChange={onChangePassword}
                                    required
                                />
                            </div>
                            {passwordMessage ? (
                                <span style={{color: "rgb(152, 198, 163)"}}>사용가능</span>
                            ) : (
                                <span style={{color: "rgb(255, 181, 181)"}}>사용 불가능</span>
                            )}


                            <span>{passwordMessage}</span>
                        </div>

                        <div className="registerRow">
                            <div>비밀번호 확인</div>
                            <div>
                                <input
                                    type="password"
                                    name="stfPass2"
                                    value={stf.stfPass2}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            {stf.stfPass !== stf.stfPass2 && <span style={{color : "rgb(255, 181, 181)"}}>비밀번호가 일치하지 않습니다.</span>}
                            {stf.stfPass === stf.stfPass2 && <span style={{color : "rgb(152, 198, 163)"}}>비밀번호가 일치합니다.</span>}
                        </div>
                    </div>

                    <div className="registerPack">
                        <div className="registerRow">
                            <div>부서</div>
                            <div>
                                <select
                                    name="dptNo"
                                    id="department"
                                    value={stf.dptNo}
                                    onChange={changeHandler}
                                >
                                    <option value="">부서 선택</option>
                                    {positions.map((data, index) => (
                                        <option value={data.dptNo}key={index}>{data.dptName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="registerRow">
                            <div>직급</div>
                            <div>
                                <select name="rnkNo" id="grade" value={stf.rnkNo} onChange={changeHandler}>
                                    <option value="">직급 선택</option>
                                    
                                    {deps.map((data, index) => (
                                        <option value={data.rnkNo} key={index}>{data.rnkName}</option>
                                    ))}
                                    
                
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="registerPack">
                        <div className="registerRow">
                            <div>휴대폰</div>
                            <div>
                                <input
                                    type="tel"
                                    name="stfPh"
                                    value={stf.stfPh}
                                    onChange={onChangePhone}
                                    required
                                />
                            </div>
                            {phoneMessage ? (
                                <span style={{color: "rgb(152, 198, 163)"}}>사용가능</span>
                            ) : (
                                <span style={{color: "rgb(255, 181, 181)"}}>사용 불가능</span>
                            )}
                        </div>

                        <div className="registerRow">
                            <div>이메일</div>
                            <div>
                                <input
                                    type="email"
                                    name="stfEmail"
                                    value={stf.stfEmail}
                                    onChange={onChangeEmail}
                                    required
                                />
                                 <button onClick={handleSendEmail} disabled={isSendingEmail}>
                                {isSendingEmail ? <div className="spinner"></div> : '인증'}
                                    
                                </button>
                            </div>
                            {emailMessage ? (
                                <span style={{color: "rgb(152, 198, 163)"}}>사용가능</span>
                            ) : (
                                <span style={{color: "rgb(255, 181, 181)"}}>사용 불가능</span>
                            )}
                        </div>
                    </div>

                    <div className="registerPack">
                        <div className="registerRow">
                            <div>생년월일</div>
                            <div>
                                <input
                                    type="date"
                                    name="stfBirth"
                                    value={stf.stfBirth}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        </div>

                        <div className="registerRow">
                            {showVerification && (
                                <div className="registerRow" style={{margin: "4px 0"}}>
                                    <div>인증 코드</div>
                                    <div>
                                        <input
                                            type="text"
                                            name="verificationCode"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                        />
                                        <button onClick={handleVerifyCode}>확인</button>
                                    </div>
                                    {verificationMessage ? (
                                <span style={{color: "rgb(152, 198, 163)"}}>사용가능</span>
                            ) : (
                                <span style={{color: "rgb(255, 181, 181)"}}>사용 불가능</span>
                            )}
                                 
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="registerRow" style={{marginTop: "4px"}}>
                        <div style={{paddingLeft:"20px"}}>주소</div>
                        <div style={{paddingLeft:"20px"}}>
                            <input
                                type="text"
                                name="stfZip"
                                value={stf.stfZip}
                                onChange={changeHandler}
                                required
                            />
                            <button onClick={handlePostcode}>검색</button>
                        </div>
                        <div className='registerPack' style={{paddingLeft:"0"}}>
                            <div style={{paddingLeft:"20px"}}>
                                <input
                                    style={{width: "366px"}}
                                    type="text"
                                    name="stfAddr1"
                                    value={stf.stfAddr1}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="stfAddr2"
                                    value={stf.stfAddr2}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className='memberRow'>
                        <Link className='registerBtn' to="/login">취소</Link>
                        <input className='registerBtn' type="submit" value="회원가입" disabled={!isFormValid} />
                    </div>
                </form>
            </div>
        </MemberLayout>
    );
};

export default RegisterPage;