import React, { useState } from 'react'
import MemberLayout from '../../layout/MemberLayout'
import FileUpload from '../../api/FileuploadApi';
import axios from 'axios';


const initState = {
    stfName: "",
    stfPass: "",
    stfPh: "",
    stfZip: "",
    stfAddr1: "",
    stfAddr2: "",
    stfEmail: "",
    stfEnt: "",
    stfQut: "",
    stfImg: "",
    stfRole: "",
    dptNo: "",
    rnkNo: "",
    planStatusNo:""
  };



const RegisterPage = () => {

    const navigate = useState();
    const [stf,setStf] = useState({...initState});

    const submitHandler = (e) => {
        e.preventDefault();

        axios
        .post("http://localhost:8080/onepie/register",stf)
        .then((response)=>{
            console.log(response.data);

            navigate("/zeropie/login");
        })
        .catch((err)=>{
            console.log(err);
        });
    };

    //입력 필드 변경시 상태 업데이트
    const changeHandler = (e) => {
        e.preventDefault();
        setStf({...stf,[e.target.name]:e.target.value});
    };

  return (
    <MemberLayout>
    <section id="loginArea">
        <form className="loginBox">
            <div className="registerTitle">회원가입</div>   
            <div className="registerRow">
                <div>사진</div>
                <div className="imageBox">
                     <FileUpload/>
                </div>
            </div>

            <div className="registerbox">
                <div className="registerRow">
                    <div>이름</div>
                    <div>
                        <input type="text" name="stfName" value={stf.stfName} onChange={changeHandler} required/>
                    </div>
                </div>

                
                <div className="registerRow">
                    <div>입사일</div>
                    <div>
                        <input type="date" name="stfEnt" value={stf.stfEnt} onChange={changeHandler} required/>
                    </div>
                </div>
            </div>
            <div className="registerbox">
                <div className="registerRow">
                    <div>비밀번호</div>
                    <div>
                        <input type="password" name="stfPass" value={stf.stfPass} onChange={changeHandler} required/>
                    </div>
                    <span>올바르지 않은 비밀번호입니다.</span>
                </div>

                <div className="registerRow">
                    <div>비밀번호 확인</div>
                    <div>
                        <input type="password" name="stfPass2" required/>
                    </div>
                    <span>비밀번호가 일치하지않습니다.</span>
                </div>
            </div>
            

            <div className="registerbox">
                <div className="registerRow">
                    <div>부서</div>
                    <div>
                        <select name="dptNo" id="department" value={stf.dptNo} onChange={changeHandler}>
                            <option value="1팀">1팀</option>
                            <option value="2팀">2팀</option>
                            <option value="3팀">3팀</option>
                            <option value="4팀">4팀</option>
                        </select>
                    </div>
                </div>
                <div className="registerRow">
                    <div>직급</div>
                    <div>
                        <select name="rnkNo" id="grade" value={stf.rnkNo} onChange={changeHandler}>
                            <option value="사원">사원</option>
                            <option value="대리">대리</option>
                            <option value="팀장">팀장</option>
                            <option value="과장">과장</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="registerbox">
                <div className="registerRow">
                    <div>이메일</div>
                    <div>
                        <input type="email" name="stfEmail" value={stf.stfEmail} onChange={changeHandler} required/>
                        <button>인증</button>
                    </div>
                    <span>중복된 이메일입니다.</span>

                </div>

                <div className="registerRow">
                    <div>휴대폰</div>
                    <div> 
                        <input type="tel" name="hstfPh" value={stf.stfPh} onChange={changeHandler} required/>
                    </div>
                    <span>중복된 전화번호입니다.</span>

                </div>
            </div>

            <div className="registerRow">
                <div>주소</div>
                <div>
                    <input type="text" name="stfZip" value={stf.stfZip} onChange={changeHandler} required/>
                    <button>검색</button>
                </div>
                <div>
                    <input type="text" name="stfAddr1" value={stf.stfAddr1} onChange={changeHandler} required/>
                </div>
                <div>
                    <input type="text" name="stfAddr2" value={stf.stfAddr2} onChange={changeHandler} required/>
                </div>
            </div>

            <input type="submit" value="회원가입"/>
        </form>

        <div className="loginBox">
            <img src="../images/iconSample4.PNG" alt=""/>
        </div>
    </section>
    </MemberLayout>
  )
}

export default RegisterPage