import React, { useState } from 'react';
import CreateRankModal from '../modal/CreateRankModal';

const RankConfigComponent = ({ rankValue, handleChangeRank }) => {
    /** 부서 생서 모달 */
    const [createRank, setCreateRank] = useState(false);

    const handelOpenModal = () => {
        setCreateRank(true);
    };

    const handelColseModal = () => {
        setCreateRank(false);
    };

    return (
        <div className="contentBox boxStyle4">
            <div className="contentTitle font30 alignL">직책 설정</div>
            <div className="contentInfo alignL">회사 내 직책 이름, 종류 변경 가능합니다.</div>

            <div className="scrollBox">
                {rankValue.map((rnk, index) => (
                    <div key={rnk.id} className="scrollRow configRow">
                        <div>{index + 1}</div>
                        <div>
                            <input type="text" value={rnk.rnkName} onChange={(e) => handleChangeRank(e, rnk.id)} />
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

            {createRank && <CreateRankModal handelColseModal={handelColseModal} />}
        </div>
    );
};

export default RankConfigComponent;
