import React, { useState } from 'react';
import { RootUrl } from '../../api/RootUrl';
import { modifyUserLank } from '../../api/AdminApi';

const UserModifyModal = ({ userData, rnkList, dptList, handleModalClose }) => {
    const initialRnk = rnkList.find((rnk) => rnk.rnkName === userData.strRnkNo);
    const initialDpt = dptList.find((dpt) => dpt.dptName === userData.strDptName);

    const [modalData, setModalData] = useState({
        stfName: userData.stfName,
        stfNo: userData.stfNo,
        rnkNo: initialRnk ? initialRnk.rnkNo : userData.rnkNo,
        strRnkNo: userData.strRnkNo,
        dptNo: initialDpt ? initialDpt.dptNo : userData.dptNo,
        strDptName: userData.strDptName,
        stfRole: userData.stfRole,
        stfStatus: userData.stfStatus,
        stfImg: userData.stfImg,
        stfEnt: userData.stfEnt,
        stfEmail: userData.stfEmail,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(modalData);
        modifyUserLank(modalData);
        handleModalClose(modalData);
    };

    return (
        <div className="modlaBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>회원 정보 관리</p>
                    <p className="modalClose" onClick={() => handleModalClose(modalData)} style={{ cursor: 'pointer' }}>
                        X
                    </p>
                </div>
                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">
                            {userData.stfImg && (
                                <img src={`${RootUrl()}/images/${userData.stfImg}`} alt="sft" name="stfImg" />
                            )}
                        </div>
                        <div className="modalColumn" style={{ border: '0' }}>
                            <div className="modalDouble" name="stfName">
                                이름 : {userData.stfName}
                            </div>
                            <div className="modalDouble" name="stfNo">
                                사원번호 : {userData.stfNo}
                            </div>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">직책</div>
                        <div>
                            <select name="rnkNo" value={modalData.rnkNo} onChange={handleChange}>
                                {rnkList.map((rnk) => (
                                    <option key={rnk.rnkNo} value={rnk.rnkNo}>
                                        {rnk.rnkName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">부서</div>
                        <div>
                            <select name="dptNo" value={modalData.dptNo} onChange={handleChange}>
                                {dptList.map((dpt) => (
                                    <option key={dpt.dptNo} value={dpt.dptNo}>
                                        {dpt.dptName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">권한</div>
                        <div>
                            <select name="stfRole" value={modalData.stfRole} onChange={handleChange}>
                                <option value="USER">USER</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>

                    <div className="modalRow">
                        <div className="maR30">상태</div>
                        <div>
                            <select name="stfStatus" value={modalData.stfStatus} onChange={handleChange}>
                                <option value="Active">재직</option>
                                <option value="Break">휴직</option>
                                <option value="Departed">퇴직</option>
                            </select>
                        </div>
                    </div>
                    <div className="modalRow">
                        <button className="modalClose" onClick={() => handleModalClose(modalData)}>
                            취소
                        </button>
                        <input type="submit" value="변경" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModifyModal;
