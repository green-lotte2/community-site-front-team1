import React, { useState } from 'react';
import CreateDtpModal from '../modal/CreateDtpModal';
import GroupIconComponent from '../common/private/GroupIconComponent';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { deleteDpt, updateDpt } from '../../api/AdminApi';

const DptConfigComponent = ({ dptValue, handleChangeDpt, addNewDpt, fetchData }) => {
    /** 부서 생성 모달 */
    const [createDpt, setCreateDpt] = useState(false);

    const handelOpenModal = () => {
        setCreateDpt(true);
    };

    const handelCloseModal = (newDpt) => {
        setCreateDpt(false);
        if (newDpt) {
            addNewDpt(newDpt);
            window.location.reload();
        }
    };

    console.log('dptValue:', dptValue);

    const handleDptDelete = async (index) => {
        if (dptValue[index].member.length > 0) {
            alert('소속된 사원이 0명이어야 삭제 가능합니다.');
            return;
        }
        const confirmDel = window.confirm('삭제하시겠습니까?');
        if (confirmDel) {
            await deleteDpt(dptValue[index].dptNo);
            fetchData();
        }
    };

    const handelUpdate = async (index) => {
        console.log(dptValue[index]);
        const confirm = window.confirm('수정 하시겠습니까?');
        if (confirm) {
            try {
                updateDpt(dptValue[index]);
                fetchData();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="contentBox boxStyle4">
            <div className="contentTitle font30 alignL">부서 설정</div>
            <div className="contentInfo alignL">회사 내 부서 이름, 종류 변경 가능합니다.</div>

            <div className="scrollBox">
                {dptValue.map((dpt, index) => (
                    <div key={dpt.dptNo} className="scrollRow configRow">
                        <div>{index + 1}</div>
                        <div>
                            <GroupIconComponent iconName={dpt.dptIcon} />
                        </div>
                        <div>
                            <div className="dptCode">{dpt.dptCode}</div>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={dpt.dptName}
                                onChange={(event) => handleChangeDpt(index, event)}
                            />
                            <span> [사원 : {(dpt.member || []).length}]</span>
                        </div>
                        <div className="configBtn">
                            <button onClick={() => handelUpdate(index)}>수정</button>
                            <button onClick={() => handleDptDelete(index)}>삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="configBtn">
                <button onClick={handelOpenModal}>생성</button>
            </div>

            {createDpt && <CreateDtpModal handelCloseModal={handelCloseModal} dptValue={dptValue} />}
        </div>
    );
};

export default DptConfigComponent;
