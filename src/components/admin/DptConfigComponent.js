import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DptIconOptionComponent from './DptIconOptionComponent';
import CreateDtpModal from '../modal/CreateDtpModal';
import { getDptList } from '../../api/AdminApi';
import GroupIconComponent from '../common/private/GroupIconComponent';

const DptConfigComponent = ({ dptValue, handleChangeDpt }) => {
    /** 부서 생서 모달 */
    const [createDpt, setCreateDpt] = useState(false);

    const handelOpenModal = () => {
        setCreateDpt(true);
    };

    const handelColseModal = () => {
        setCreateDpt(false);
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
                            <GroupIconComponent iconName={dpt.iconName} />
                        </div>
                        <div>
                            <input type="text" value={dpt.dptName} onChange={handleChangeDpt} />
                        </div>
                        <div className="configBtn">
                            <button>수정</button>
                            <button>삭제</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="configBtn">
                <button onClick={handelOpenModal}>생성</button>
            </div>

            {createDpt && <CreateDtpModal handelColseModal={handelColseModal} />}
        </div>
    );
};

export default DptConfigComponent;
