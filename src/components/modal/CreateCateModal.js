import React, { useState } from 'react'
import { modifyArticleCate } from '../../api/AdminApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTableCells, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';

const CreateCateModal = ({ handleModalClose }) => {

    const [selectedRadio, setSelectedRadio] = useState('');

    /** 라디오박스 체크 핸들러 */
    const handleRadioChange = (event) => {
        if (event.target.closest('input').value === "list") {
            setSelectedRadio("list");
            setFormData((prev) => ({...prev, articleCateOutput:"list"}));
        } else {
            setSelectedRadio("card");
            setFormData((prev) => ({...prev, articleCateOutput:"card"}));

        }
    };

    const [formData, setFormData] = useState({
        articleCateName : "",
        articleCateOutput : selectedRadio,
        articleCateStatus : "",
        articleCateVRole : "",
        articleCateWRole : "",
        articleCateCoRole : ""
    });

    /** input태그 변화 감지하는 핸들러 */
    const inputFormData = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]:value}));
        console.log(formData);
    }

    /** 만들기 핸들러 */
    const handleSubmit = () => {
        alert("제출");
        handleModalClose();
    }

  return (
    <div className="modlaBack modalClose">
        <div className="modalBox">
            <div className="modalHeader">
                <p>게시판 관리</p>
                <p className="modalClose" onClick={() => handleModalClose(formData)} style={{ cursor: 'pointer' }}>
                    X
                </p>
            </div>
            <div className="modalColumn">
                <div className="modalRow">
                    <div className="maR30" style={{width:"150px"}}>게시판 이름</div>
                    <div>
                        <input
                            type="text"
                            name="articleCateName"
                            value={formData.articleCateName}
                            onChange={inputFormData}
                        />
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30" style={{width:"150px"}}>게시판 유형</div>
                    <div className='outputCheck'>
                        <input
                                name='articleCateOutput'
                                value="list"
                                id='list'
                                type="radio"
                                checked={selectedRadio === 'list'} 
                                onChange={handleRadioChange}
                            />
                        <label htmlFor="list">
                            <FontAwesomeIcon icon={faList} />
                            <span>리스트형</span>
                        </label>

                        <input 
                            name='articleCateOutput'
                            value="card"
                            id='card'
                            type="radio"
                            checked={selectedRadio === 'card'}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor="card">
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                            <span>카드형</span>
                        </label>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30" style={{width:"150px"}}>사용 여부</div>
                    <div>
                        <select
                            name="articleCateStatus"
                            value={formData.articleCateStatus}
                            onChange={inputFormData}
                        >
                            <option value="1">활성화</option>
                            <option value="0">비활성화</option>
                        </select>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30" style={{width:"150px"}}>읽기 권한</div>
                    <div>
                        <select
                            name="articleCateVRole"
                            value={formData.articleCateVRole}
                            onChange={inputFormData}
                        >
                            <option value="USER">USER</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30" style={{width:"150px"}}>쓰기 권한</div>
                    <div>
                        <select
                            name="articleCateWRole"
                            value={formData.articleCateWRole}
                            onChange={inputFormData}
                        >
                            <option value="USER">USER</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>

                <div className="modalRow">
                    <div className="maR30" style={{width:"150px"}}>댓글 권한</div>
                    <div>
                        <select
                            name="articleCateCoRole"
                            value={formData.articleCateCoRole}
                            onChange={inputFormData}
                        >
                            <option value="USER">USER</option>
                            <option value="MANAGER">MANAGER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                </div>
                <div className="modalRow">
                    <button className="modalClose" onClick={() => handleModalClose(formData)}>
                        취소
                    </button>
                    <input type="submit" value="생성" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateCateModal