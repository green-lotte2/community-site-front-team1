import React, { useState } from 'react';
import DptIconOptionComponent from '../admin/DptIconOptionComponent';
import { postDpt } from '../../api/AdminApi';

const CreateDtpModal = ({ handelCloseModal, dptValue }) => {
    /** 커스텀 select 박스 */
    const [selectedOption, setSelectedOption] = useState('');
    const [optionState, setOptionState] = useState(false);
    const [formData, setFormData] = useState({
        dptName: '',
        dptCode: '',
        iconName: '',
    });

    const openOption = (event) => {
        if (event.target.className === 'custOption' || event.target.className === 'option') {
            return;
        } else {
            setOptionState(!optionState);
        }
    };

    /** 커스텀 option 박스 */
    const selectOption = (event) => {
        const icon = event.target.closest('p').id;
        console.log(icon);
        setSelectedOption(icon);
        setFormData((prevData) => ({ ...prevData, iconName: icon }));
        setOptionState(!optionState);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'dptCode' ? value.toUpperCase() : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isDuplicate = dptValue.some((dpt) => dpt.dptCode === formData.dptCode);
        if (isDuplicate) {
            alert('부서 코드가 중복됩니다. 다른 코드를 입력해주세요.');
            return;
        }
        console.log(formData);
        postDpt(formData);
        handelCloseModal(formData);
    };

    return (
        <div className="modlaBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>부서 생성</p>
                    <p className="modalClose" style={{ cursor: 'pointer' }} onClick={() => handelCloseModal(null)}>
                        X
                    </p>
                </div>

                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">이름</div>
                        <div>
                            <input
                                type="text"
                                name="dptName"
                                value={formData.dptName}
                                onChange={handleInputChange}
                                placeholder="부서 이름 입력"
                            />
                        </div>
                    </div>
                </div>

                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">부서 코드</div>
                        <div>
                            <input
                                type="text"
                                name="dptCode"
                                value={formData.dptCode}
                                onChange={handleInputChange}
                                placeholder="3글자 이내 영어로 적어주세요"
                            />
                        </div>
                    </div>
                </div>

                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">아이콘</div>
                        <div className="custSelect" onClick={openOption} style={{width:"201px", margin:"0 50px"}}>
                            <span>{selectedOption ? selectedOption : '아이콘 선택'}</span>
                            <span>▼</span>
                            {optionState && <DptIconOptionComponent selectOption={selectOption} />}
                        </div>
                    </div>
                </div>

                <div className="modalRow">
                    <button className="modalClose" onClick={() => handelCloseModal(null)}>
                        취소
                    </button>
                    <input type="submit" value="생성" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default CreateDtpModal;
