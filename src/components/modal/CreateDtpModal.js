import React, { useState } from 'react'
import DptIconOptionComponent from '../admin/DptIconOptionComponent';

const CreateDtpModal = ({handelColseModal}) => {
    
    /** 커스텀 select 박스 */
    const [selectedOption, setSelectedOption] = useState("");
    const [optionState, setOptionState] = useState(false);

    const openOption = (event) => {
        if (event.target.className === "custOption") {
            return;
        }else if (event.target.className === "option") {
            return;
        }else {
            setOptionState(!optionState);
        }
    }

    /** 커스텀 option 박스 */
    const selectOption = (event) => {
        const icon = event.target.closest('p').id;
        console.log(icon);
        setSelectedOption(icon);


        setOptionState(!optionState);
    }
    
  return (
    <div className="modlaBack modalClose">
        <div className="modalBox">
            <div className="modalHeader">
                <p>부서 생성</p>
                <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handelColseModal}>
                    X
                </p>
            </div>

            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">이름</div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
            </div>

            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30">아이콘</div>
                    <div className='custSelect' onClick={openOption}>
                        <span>
                            {selectedOption ? selectedOption : "아이콘 선택"}
                        </span>
                        <span>▼</span>
                        {optionState && <DptIconOptionComponent selectOption={selectOption}/>}
                    </div>
                </div>
            </div>

            <div className="modalRow">
                <button className="modalClose" onClick={handelColseModal}>취소</button>
                <input type="submit" value="생성"/>
            </div>
        </div>
    </div>
  )
}

export default CreateDtpModal