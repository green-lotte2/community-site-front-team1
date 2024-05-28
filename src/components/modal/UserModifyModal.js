import React from 'react'

const UserModifyModal = ({ handleModalClose }) => {
  return (
    <div className="modlaBack modalClose" onClick={handleModalClose}>
        <div className="modalBox">
            <div className="modalHeader">
                <p>회원 정보 관리</p>
                <p className="modalClose" onClick={handleModalClose} style={{cursor: "pointer"}}>
                    X
                </p>
            </div>
            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">
                        <img src="../images/iconSample3.png" alt="" />
                    </div>
                    <div className="modalColumn">
                        <div className="modalDouble">이름 : 홍길동</div>
                        <div className="modalDouble">사원번호 : TT1222</div>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30">직책</div>
                    <div>
                        <select name="" id="">
                            <option value="">사원</option>
                            <option value="">대리</option>
                        </select>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30">부서</div>
                    <div>
                        <select name="" id="">
                            <option value="">1팀</option>
                            <option value="">2팀</option>
                        </select>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30">권한</div>
                    <div>
                        <select name="" id="">
                            <option value="">USER</option>
                            <option value="">ADMIN</option>
                        </select>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30">상태</div>
                    <div>
                        <select name="" id="">
                            <option value="">재직</option>
                            <option value="">퇴직</option>
                        </select>
                    </div>
                </div>
                <div className="modalRow">
                    <button className="modalClose" onClick={handleModalClose}>
                        취소
                    </button>
                    <input type="submit" value="변경" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserModifyModal