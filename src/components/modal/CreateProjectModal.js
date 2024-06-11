import React, { useEffect, useState } from 'react';
import { getDptAndStfList } from '../../api/AdminApi';
import GroupIconComponent from '../common/private/GroupIconComponent';
import GroupBodyComponent from '../common/private/GroupBodyComponent';

const CreateProjectModal = ({ handelColseModal }) => {
    const [groupInfo, setGroupInfo] = useState([]);
    const [accordions, setAccordions] = useState([]);
    const [step, setStep] = useState(1); // 단계 관리 상태 추가
    const handleNext = () => {
        setStep(2);
    };

    const handlePrevious = () => {
        setStep(1);
    };

    const handleAccordion = (index) => {
        setAccordions((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            for (let i = 0; i < newState.length; i++) {
                if (i !== index) {
                    newState[i] = false;
                }
            }
            return newState;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                console.log('getDptList', response);
                setGroupInfo(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="modlaBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>프로젝트 생성</p>
                    <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handelColseModal}>
                        X
                    </p>
                </div>
                {step === 1 && (
                    <>
                        <div className="modalColumn">
                            <div className="modalRow">
                                <div className="maR30">이름</div>
                                <div>
                                    <input type="text" placeholder="프로젝트 제목" />
                                </div>
                            </div>
                        </div>

                        <div className="modalColumn">
                            <div className="modalRow">
                                <div className="maR30">설명</div>
                                <div>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="modalRow">
                            <button className="modalClose" onClick={handelColseModal}>
                                취소
                            </button>
                            <button onClick={handleNext}>다음</button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className="modalColumn">
                            <div className="modalRow">
                                <div className="maR30">초대</div>
                                <div>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="modalRow">
                            <div className="modalGroup" style={{ width: '60%', padding: '0' }}>
                                <div className="groupHead" style={{ width: '100%' }}>
                                    {groupInfo &&
                                        groupInfo.map((group, index) => (
                                            <div key={index}>
                                                <p onClick={() => handleAccordion(index)}>
                                                    {/* 부서 아이콘 */}
                                                    <GroupIconComponent iconName={group.dptIcon} />
                                                    {/* 부서 이름 */}
                                                    {group.dptName}({group.member.length})
                                                </p>
                                                <div className={`accordion-content ${accordions[index] ? 'show' : ''}`}>
                                                    {group.member.map((member) => (
                                                        <GroupBodyComponent key={member.stfNo} member={member} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="modalColumn">
                                <div className="modalRow">
                                    <div className="inviteList">
                                        <span>홍길동</span>
                                        <span>김춘추</span>
                                        <span>김유신</span>
                                        <span>강감찬</span>
                                        <span>이순신</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modalRow">
                            <button onClick={handlePrevious}>이전</button>
                            <button>생성</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateProjectModal;
