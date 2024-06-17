import React, { memo, useEffect, useState } from 'react';
import { getDptAndStfList } from '../../api/AdminApi';
import GroupIconComponent from '../common/private/GroupIconComponent';
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

let count = 0;
let addStfCount = 0;
const AddStfComponent = ({ onClose, inviteList, addStf }) => {
    /** 회사 그룹 및 사원 리스트 저장 */
    const [groupInfo, setGroupInfo] = useState([]);

    /** 새로 초대된 사람 */
    const [newInvite, setNewInvite] = useState([]);

    /** 하위 스테이트는 신경X */
    const [accordions, setAccordions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState('');

    const loginSlice = useSelector((state) => state.loginSlice) || {};

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
        console.log(inviteList);
        count = inviteList.length;
        console.log('ww', count);

        if (loginSlice.planState === 1) {
            addStfCount = 5;
        } else if (loginSlice.planState === 2) {
            addStfCount = 10;
        } else if (loginSlice.planState === 3) {
            addStfCount = 1000;
        }
    }, [inviteList]);

    const handleMemberClick = async (member) => {
        if (member.stfNo === loginSlice.userId) {
            alert('본인은 선택할 수 없습니다.');
            return;
        }

        if (inviteList.some((inviteList) => inviteList.stfNo === member.stfNo)) {
            alert('이미 추가된 멤버입니다.');
            return;
        }

        if (count >= addStfCount) {
            alert('초대인원을 초과했습니다. 초대를 위해 이미 초대된 네임카드를 눌러 인원수를 조정해주세요.');
            return;
        }

        setNewInvite((prevInviteList) => {
            const isAlreadyInvited = prevInviteList.some((invite) => invite.stfNo === member.stfNo);
            if (isAlreadyInvited) {
                console.log('??');
                count--;
                console.log('ss', count);

                return prevInviteList.filter((invite) => invite.stfNo !== member.stfNo);
            } else {
                console.log('else');
                count++;
                console.log('ss', count);

                return [...prevInviteList, member];
            }
        });
    };

    const handleRemoveInvite = (member) => {
        console.log('handleRemoveInvite');
        setNewInvite((prevInviteList) =>
            prevInviteList.filter((invite) => invite.stfNo !== member.stfNo || invite.stfNo === loginSlice.userId)
        );
        count--;
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

    const isMemberInInviteList = (stfNo) => {
        return inviteList.some((invite) => invite.stfNo === stfNo);
    };

    const handleClose = () => {
        onClose();
    };
    const handleAdd = () => {
        addStf(newInvite);
    };

    return (
        <>
            <div className="modlaBack modalClose">
                <div className="modalBox">
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
                                                {group.member.map((member) => {
                                                    const isInInviteList = isMemberInInviteList(member.stfNo);
                                                    return (
                                                        <GroupBodyComponent
                                                            key={member.stfNo}
                                                            member={member}
                                                            onClick={() => !isInInviteList && handleMemberClick(member)}
                                                            className={isInInviteList ? 'disabled' : 'groupBody'}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="modalColumn">
                            <div className="modalRow">
                                <div className="inviteList">
                                    {newInvite.map((member, index) => (
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
                        <button onClick={handleClose}>취소</button>
                        <button onClick={handleAdd}>초대</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddStfComponent;
