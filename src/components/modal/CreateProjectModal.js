import React, { useEffect, useState } from 'react';
import { getDptAndStfList } from '../../api/AdminApi';
import GroupIconComponent from '../common/private/GroupIconComponent';
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { RootUrl } from '../../api/RootUrl';
import { postKanban, postKanbanMember } from '../../api/KanbanApi';
import { useSelector } from 'react-redux';

const CreateProjectModal = ({ handelColseModal, kanbanData }) => {
    const [groupInfo, setGroupInfo] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    const [accordions, setAccordions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [kanbanTitle, setKanbanTitle] = useState('');
    const [kanbanInfo, setKanbanInfo] = useState('');
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

        if (loginSlice.userId) {
            setInviteList([{ stfNo: loginSlice.userId, stfName: loginSlice.username, stfImg: loginSlice.userImg }]);
        }
    }, []);

    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const createKanban = async (kanbanTitle, kanbanInfo) => {
        const newKanban = {
            kanbanName: kanbanTitle,
            kanbanInfo: kanbanInfo,
            kanbanStf: loginSlice.userId,
        };
        console.log(newKanban);
        return await postKanban(newKanban);
    };
    const addMember = async (kanbanId, inviteList) => {
        const memberPromises = inviteList.map((member) => {
            const newMember = {
                kanbanId: kanbanId,
                stfNo: member.stfNo,
            };
            console.log(newMember);
            return postKanbanMember(newMember);
        });
        return await Promise.all(memberPromises);
    };

    const handleCreate = async () => {
        try {
            const createdKanban = await createKanban(kanbanTitle, kanbanInfo);
            await addMember(createdKanban, inviteList);
            handelColseModal();
        } catch (err) {
            console.log(err);
        }
        kanbanData();
    };

    const handleMemberClick = async (member) => {
        setInviteList((prevInviteList) => {
            const isAlreadyInvited = prevInviteList.some((invite) => invite.stfNo === member.stfNo);
            if (isAlreadyInvited) {
                return prevInviteList.filter(
                    (invite) => invite.stfNo !== member.stfNo || invite.stfNo === loginSlice.userId
                );
            } else {
                return [...prevInviteList, member];
            }
        });
    };

    const handleRemoveInvite = (member) => {
        setInviteList((prevInviteList) =>
            prevInviteList.filter((invite) => invite.stfNo !== member.stfNo || invite.stfNo === loginSlice.userId)
        );
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term.trim() === '') {
            setFilteredMembers([]);
        } else {
            const filtered = groupInfo
                .flatMap((group) => group.member)
                .filter((member) => member.stfName.toLowerCase().includes(term.toLowerCase()));
            setFilteredMembers(filtered);
        }
    };

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
                                    <input
                                        type="text"
                                        placeholder="프로젝트 제목"
                                        value={kanbanTitle}
                                        onChange={(e) => setKanbanTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modalColumn">
                            <div className="modalRow">
                                <div className="maR30">설명</div>
                                <div>
                                    <input
                                        type="text"
                                        value={kanbanInfo}
                                        onChange={(e) => setKanbanInfo(e.target.value)}
                                    />
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
                                <div style={{ position: 'relative', width: '60%' }}>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="이름 검색"
                                    />
                                    {filteredMembers.length > 0 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                right: 0,
                                                background: 'white',
                                                border: '1px solid #ccc',
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                zIndex: 1000,
                                                marginLeft: '20px',
                                                width: '85%',
                                            }}
                                        >
                                            {filteredMembers.map((member) => (
                                                <div
                                                    key={member.stfNo}
                                                    onClick={() => handleMemberClick(member)}
                                                    style={{
                                                        padding: '10px',
                                                        borderBottom: '1px solid #ddd',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    {member.stfName} [{member.dptName} - ({member.rankNo})]
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                                                        <GroupBodyComponent
                                                            key={member.stfNo}
                                                            member={member}
                                                            onClick={() => handleMemberClick(member)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="modalColumn">
                                <div className="modalRow">
                                    <div className="inviteList">
                                        {inviteList.map((member, index) => (
                                            <span
                                                key={index}
                                                onClick={() => handleRemoveInvite(member)}
                                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                            >
                                                <img
                                                    src={`${RootUrl()}/images/${member.stfImg}`}
                                                    alt="sft"
                                                    name="stfImg"
                                                    style={{ width: '30px', borderRadius: '50%' }}
                                                />
                                                {member.stfName || member.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modalRow">
                            <button onClick={handlePrevious}>이전</button>
                            <button onClick={handleCreate}>생성</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateProjectModal;
