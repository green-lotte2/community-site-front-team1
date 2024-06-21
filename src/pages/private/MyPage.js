import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useSelector } from 'react-redux';
import {
    saveStfAddrApi,
    saveStfEmailApi,
    saveStfPhApi,
    selectStfInfoApi,
    sendEmailCodeApi,
    updateProfileApi,
    updateStfApi,
} from '../../api/MainApi';
import { RootUrl } from '../../api/RootUrl';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { stfHpCheckApi } from '../../api/MemberApi';

const MyPage = () => {
    const loginSlice = useSelector((state) => state.loginSlice);
    const userId = loginSlice.userId;

    /** 수정 상태 관리 */
    const [updateFile, setUpdateFile] = useState(false);

    const [modifyPh, setModifyPh] = useState(false);
    const [modifyEmail, setModifyEmail] = useState(false);
    const [modifyAddr, setModifyAddr] = useState(false);
    const handleModify = (event) => {
        const input = event.target;

        if (input.value === 'stfPh') {
            setModifyPh(true);
            const inputStfPh = document.getElementsByClassName('inputStfPh')[0];
            inputStfPh.readOnly = false;
            inputStfPh.style.border = '1px solid #b0b0b0';
        } else if (input.value === 'stfEmail') {
            setModifyEmail(true);
            const inputStfEmail = document.getElementsByClassName('inputStfEmail')[0];
            inputStfEmail.readOnly = false;
            inputStfEmail.style.border = '1px solid #b0b0b0';
        } else if (input.value === 'stfAddr') {
            const inputStfAddr = document.getElementsByClassName('inputStfAddr');
            Array.from(inputStfAddr).forEach((each) => {
                each.readOnly = false;
                each.style.border = '1px solid #b0b0b0';
            });
            setModifyAddr(true);
        }
    };

    /** 수정 완료 */
    const handleSave = async (input) => {
        console.log('11111', input);
        if (input === 'stfPh') {
            setModifyPh(false);
            const inputStfPh = document.getElementsByClassName('inputStfPh')[0];
            inputStfPh.readOnly = true;
            inputStfPh.style.border = '0';
        } else if (input === 'stfEmail') {
            setModifyEmail(false);
            const inputStfEmail = document.getElementsByClassName('inputStfEmail')[0];
            inputStfEmail.readOnly = true;
            inputStfEmail.style.border = '0';
        } else if (input === 'stfAddr') {
            const inputStfAddr = document.getElementsByClassName('inputStfAddr');
            Array.from(inputStfAddr).forEach((each) => {
                each.readOnly = true;
                each.style.border = '0';
            });
            setModifyAddr(false);
        }
    };

    // 페이지 로드시 회원 정보 조회
    const [stfInfo, setStfInfo] = useState('');
    useEffect(() => {
        const selectStfInfo = async () => {
            try {
                const response = await selectStfInfoApi(userId);
                console.log('res', response);
                setStfInfo(response);
            } catch (error) {
                console.log(error);
            }
        };
        selectStfInfo();
    }, [updateFile]);

    /** 연락처 알림 */
    const [hpmsg, setHpmsg] = useState('');

    /** 연락처 유효성 & 중복 검사 */
    const [hpRed, setHpRed] = useState(false);
    const hpUseCheck = (e) => {
        const currentPhone = e.target.value;
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        setStfInfo((prev) => ({ ...prev, stfPh: currentPhone }));

        if (!phoneRegExp.test(currentPhone)) {
            setHpmsg('유효하지 않은 연락처입니다.');
            setHpRed(true);
        } else {
            const checkHpUse = async () => {
                try {
                    const response = await stfHpCheckApi(currentPhone);
                    console.log(response);
                    if (response > 0) {
                        setHpmsg('이미 사용중인 연락처입니다.');
                        setHpRed(true);
                    } else {
                        setHpmsg('');
                        setHpRed(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            checkHpUse();
        }
    };

    /** 연락처 저장 */
    const saveStfPh = async () => {
        if (!setHpRed) {
            alert('연락처가 유효하지 않습니다.');
            return;
        }

        try {
            const response = await saveStfPhApi(stfInfo.stfPh, stfInfo.stfNo);
            console.log(response);

            if (response > 0) {
                alert('연락처가 수정되었습니다.');
                handleSave('stfPh');
            }
        } catch (error) {
            console.log(error);
        }
    };

    /** 이메일 알림 */
    const [emailmsg, setEmailmsg] = useState('');

    /** 이메일 유효성 검사 */
    const [emailRed, setEmailRed] = useState(false);
    const emailUseCheck = (e) => {
        const currentEmail = e.target.value;
        const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        setStfInfo((prev) => ({ ...prev, stfEmail: currentEmail }));

        if (!emailRegExp.test(currentEmail)) {
            setEmailmsg('유효하지 않은 이메일입니다.');
            setEmailRed(true);
        } else {
            setEmailmsg('');
            setEmailRed(false);
        }
    };

    /** 이메일 인증번호 발송 */
    const [emailState, setEmailState] = useState(false);
    const [savedCode, setSavedCode] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const emailCheck = async () => {
        if (!emailRed) {
            setEmailState(!emailState);
            try {
                const response = await sendEmailCodeApi(stfInfo.stfEmail);
                setSavedCode(response.data.savedCode);
                setEmailmsg('인증코드가 전송되었습니다.');
            } catch (error) {
                console.log(error);
            }
        }
    };

    /** 이메일 인증번호 코드 확인 */
    const codeCheck = () => {
        let checkCode = (parseInt(emailCode) + parseInt(emailCode)) * parseInt(emailCode) - 1;

        if (parseInt(savedCode) === parseInt(checkCode)) {
            setEmailState(!emailState);
            setEmailRed(false);
            setEmailmsg('이메일이 인증되었습니다.');
            saveStfEmail();
        } else {
            setEmailRed(true);
            setEmailmsg('인증번호가 일치하지 않습니다.');
        }
    };

    /** 이메일 저장 */
    const saveStfEmail = async () => {
        if (!setEmailRed) {
            alert('이메일이 유효하지 않습니다.');
            return;
        }

        try {
            const response = await saveStfEmailApi(stfInfo.stfEmail, stfInfo.stfNo);
            console.log(response);

            if (response > 0) {
                alert('이메일이 수정되었습니다.');
                handleSave('stfEmail');
            }
        } catch (error) {
            console.log(error);
        }
    };

    //검색버튼을 클릭하면 주소창 팝업
    const openDaumPostcode = useDaumPostcodePopup();

    //우편주소
    const handlePostcode = () => {
        openDaumPostcode({
            onComplete: (data) => {
                setStfInfo({ ...stfInfo, stfZip: data.zonecode, stfAddr1: data.address });
            },
        });
    };

    /** 주소 저장 */
    const handleSaveAddr = async () => {
        const inputStfAddr = document.getElementsByClassName('inputStfAddr');
        Array.from(inputStfAddr).forEach((each) => {
            if (each.value === null) {
                alert('주소를 모두 입력해주세요.');
                return;
            }
        });

        const saveAddr = {
            stfNo: stfInfo.stfNo,
            stfZip: stfInfo.stfZip,
            stfAddr1: stfInfo.stfAddr1,
            stfAddr2: stfInfo.stfAddr2,
        };

        try {
            const response = await saveStfAddrApi(saveAddr);
            console.log(response);

            if (response > 0) {
                alert('주소정보가 수정되었습니다.');
                handleSave('stfAddr');
            }
        } catch (error) {
            console.log(error);
        }
    };

    /** 프로필 사진 저장 */
    const updateProfile = async (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('stfNo', stfInfo.stfNo);

        try {
            const response = await updateProfileApi(formData);
            console.log(response);
            if (response > 0) {
                alert('프로필 사진이 변경되었습니다.');
                setUpdateFile(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <div className="chatBox">
                <div className="contentBox boxStyle7">
                    <div className="myPage">
                        <div style={{ borderBottom: '1px solid #dddddd' }}>
                            <label htmlFor="" style={{ flexDirection: 'column' }}>
                                <img src={`${RootUrl()}/images/${stfInfo.stfImg}`} alt="" />
                                {updateFile && (
                                    <input
                                        type="file"
                                        name=""
                                        id=""
                                        onChange={(e) => updateProfile(e)}
                                        style={{ width: '210px', border: '1px solid rgb(176, 176, 176)' }}
                                    />
                                )}
                                {!updateFile && (
                                    <button
                                        onClick={() => setUpdateFile(true)}
                                        style={{ marginBottom: '10px', justifyContent: 'center' }}
                                    >
                                        프로필 사진 변경
                                    </button>
                                )}
                            </label>
                            <div className="myInfo">
                                <p>{stfInfo.stfName}</p>
                                <p>직책 : {stfInfo.strRnkNo}</p>
                                <p>부서 : {stfInfo.strDptName}</p>
                            </div>
                        </div>

                        <div className="myContent">
                            <div>
                                <p>연락처</p>
                                <label htmlFor="" style={{ alignItems: 'center', flexDirection: 'column' }}>
                                    <input
                                        className="inputStfPh"
                                        type="text"
                                        name="stfPh"
                                        readOnly
                                        value={stfInfo.stfPh}
                                        onChange={(e) => hpUseCheck(e)}
                                        style={{ width: '220px' }}
                                    />
                                    {modifyPh && <span style={{ color: hpRed ? 'red' : 'green' }}>{hpmsg}</span>}
                                </label>
                                {!modifyPh && (
                                    <button value="stfPh" className="sBtn" onClick={(e) => handleModify(e)}>
                                        수정
                                    </button>
                                )}
                                {modifyPh && (
                                    <button value="stfPh" className="sBtn" onClick={saveStfPh}>
                                        완료
                                    </button>
                                )}
                            </div>

                            <div>
                                <p>이메일</p>
                                <div style={{ alignItems: 'center', flexDirection: 'column' }}>
                                    <label htmlFor="" style={{ alignItems: 'center' }}>
                                        <input
                                            className="inputStfEmail"
                                            type="email"
                                            name="stfEmail"
                                            readOnly
                                            value={stfInfo.stfEmail}
                                            onChange={(e) => emailUseCheck(e)}
                                            style={{ width: '220px' }}
                                        />
                                        {!modifyEmail && (
                                            <button value="stfEmail" className="sBtn" onClick={(e) => handleModify(e)}>
                                                수정
                                            </button>
                                        )}
                                        {modifyEmail && (
                                            <button value="stfEmail" className="sBtn" onClick={emailCheck}>
                                                인증
                                            </button>
                                        )}
                                    </label>
                                    {emailState && (
                                        <label htmlFor="" style={{ alignItems: 'center' }}>
                                            <input
                                                className="update"
                                                type="text"
                                                name="code"
                                                onChange={(e) => setEmailCode(e.target.value)}
                                                style={{ width: '220px', border: '1px solid #b0b0b0' }}
                                            />
                                            {modifyEmail && (
                                                <button className="sBtn" onClick={codeCheck}>
                                                    확인
                                                </button>
                                            )}
                                        </label>
                                    )}
                                    {modifyEmail && (
                                        <span style={{ color: emailRed ? 'red' : 'green' }}>{emailmsg}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="myContent">
                            <div>
                                <p>주소</p>
                                <div style={{ flexDirection: 'column' }}>
                                    <label htmlFor="">
                                        <input
                                            className="inputStfAddr"
                                            type="text"
                                            name="stfZip"
                                            value={stfInfo.stfZip}
                                            style={{ width: '220px' }}
                                        />
                                        {!modifyAddr && (
                                            <button value="stfAddr" className="sBtn" onClick={(e) => handleModify(e)}>
                                                수정
                                            </button>
                                        )}
                                        {modifyAddr && (
                                            <button value="stfAddr" className="sBtn" onClick={handlePostcode}>
                                                검색
                                            </button>
                                        )}
                                        {modifyAddr && (
                                            <button value="stfAddr" className="sBtn" onClick={handleSaveAddr}>
                                                저장
                                            </button>
                                        )}
                                    </label>
                                    <label htmlFor="">
                                        <input
                                            className="inputStfAddr"
                                            type="text"
                                            name="stfAddr1"
                                            value={stfInfo.stfAddr1}
                                        />
                                        <input
                                            className="inputStfAddr"
                                            type="text"
                                            name="stfAddr2"
                                            value={stfInfo.stfAddr2}
                                            onChange={(e) =>
                                                setStfInfo((prev) => ({ ...prev, stfAddr2: e.target.value }))
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="myContent">
                            <div>
                                <p>가입일</p>
                                <input type="date" name="stfEnt" value={stfInfo.stfEnt} />
                            </div>
                            <div>
                                <p>상태</p>
                                {stfInfo.stfStatus === 'Active' && <input type="text" name="stfStatus" value="재직" />}
                                {stfInfo.stfStatus === 'Break' && <input type="text" name="stfStatus" value="휴직" />}
                                {stfInfo.stfStatus === 'Departed' && (
                                    <input type="text" name="stfStatus" value="퇴직" />
                                )}
                            </div>
                        </div>

                        <div className="myContent" style={{ borderBottom: '0' }}>
                            <div>
                                <p>권한</p>
                                <input type="text" name="stfRole" value={stfInfo.stfRole} />
                            </div>
                            <div>
                                <p>플랜</p>
                                {stfInfo.planNo === 1 && <input type="text" name="planStatusNo" value="BASIC" />}
                                {stfInfo.planNo === 2 && <input type="text" name="planStatusNo" value="STANDARD" />}
                                {stfInfo.planNo === 3 && <input type="text" name="planStatusNo" value="PREMIUM" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default MyPage;
