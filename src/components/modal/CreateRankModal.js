import React, { useState } from 'react';
import { insertRank } from '../../api/AdminApi';

const CreateRankModal = ({ handelCloseModal, setRankValue, rankValue }) => {
    const [newRankName, setNewRankName] = useState('');

    const handleCreateRank = async () => {
        // 새로운 직책 정보를 생성합니다.
        const newRank = {
            rnkName: newRankName,
            rnkIndex: rankValue.length + 1,
        };

        try {
            const response = await insertRank(newRank);
            // 새로운 직책 정보를 RankValue에 추가합니다.
            setRankValue((prevRankValue) => [...prevRankValue, response]);
        } catch (err) {
            console.log(err);
        }

        // 모달을 닫습니다.
        handelCloseModal();
    };

    return (
        <div className="modlaBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>직책 생성</p>
                    <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handelCloseModal}>
                        X
                    </p>
                </div>

                <div className="modalColumn">
                    <div className="modalRow">
                        <div className="maR30">이름</div>
                        <div>
                            <input type="text" value={newRankName} onChange={(e) => setNewRankName(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="modalRow">
                    <button className="modalClose" onClick={handelCloseModal}>
                        취소
                    </button>
                    <button onClick={handleCreateRank}>생성</button>
                </div>
            </div>
        </div>
    );
};

export default CreateRankModal;
