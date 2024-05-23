import React from 'react'
import MemberLayout from '../../layout/MemberLayout'

const RegisterPage = () => {
  return (
    <MemberLayout>
    <section id="loginArea">
        <form  action="#" className="loginBox">
            <div className="registerTitle">회원가입</div>

            <div className="registerRow">
                <div>사진</div>
                <div className="imageBox">
                    <img src="../images/iconSample3.PNG" alt=""/>
                    <label for="">
                        <input type="file" name="profile" required/>
                    </label>
                </div>
            </div>

            <div className="registerbox">
                <div className="registerRow">
                    <div>이름</div>
                    <div>
                        <input type="text" name="name" required/>
                    </div>
                </div>

                
                <div className="registerRow">
                    <div>입사일</div>
                    <div>
                        <input type="date" name="" required/>
                    </div>
                </div>
            </div>
            <div className="registerbox">
                <div className="registerRow">
                    <div>비밀번호</div>
                    <div>
                        <input type="password" name="pass1" required/>
                    </div>
                    <span>올바르지 않은 비밀번호입니다.</span>
                </div>

                <div className="registerRow">
                    <div>비밀번호 확인</div>
                    <div>
                        <input type="password" name="pass1" required/>
                    </div>
                    <span>비밀번호가 일치하지않습니다.</span>
                </div>
            </div>
            

            <div className="registerbox">
                <div className="registerRow">
                    <div>부서</div>
                    <div>
                        <select name="department" id="">
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
                        <select name="grade" id="">
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
                        <input type="email" name="email" required/>
                        <button>인증</button>
                    </div>
                    <span>중복된 이메일입니다.</span>

                </div>

                <div className="registerRow">
                    <div>휴대폰</div>
                    <div>
                        <input type="tel" name="hp" required/>
                    </div>
                    <span>중복된 전화번호입니다.</span>

                </div>
            </div>

            <div className="registerRow">
                <div>주소</div>
                <div>
                    <input type="text" name="zip" required/>
                    <button>검색</button>
                </div>
                <div>
                    <input type="text" name="addr1" required/>
                </div>
                <div>
                    <input type="text" name="addr2" required/>
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