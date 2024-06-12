import { faBolt, faBriefcase, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { getDptAndStfList } from '../../api/AdminApi';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

const CreateCalendarModal = ({ handelColseModal, onCreate }) => {
    const [groupInfo, setGroupInfo] = useState([]);
    const [inviteList, setInviteList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [calendarTitle, setCalendarTitle] = useState("");
    const [step, setStep] = useState(1);

    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || "";
    const stfName = loginSlice.username || "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                setGroupInfo(response);

                // 로그인한 사용자를 초대 목록에 자동으로 추가
                setInviteList((prevInviteList) => {
                    if (!prevInviteList.some(invite => invite.stfNo === stfNo)) {
                        return [...prevInviteList, { stfNo, stfName }];
                    }
                    return prevInviteList;
                });
                console.log(`로그인 사용자: ${stfName} (ID: ${stfNo})`);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [stfNo, stfName]);

    const handleMemberClick = (member) => {
        console.log(`선택된 멤버: ${member.stfName} (ID: ${member.stfNo})`);
        // 로그인한 사용자가 선택되었을 때 경고 메시지 표시
        if (member.stfNo === stfNo) {
            alert('본인은 선택할 수 없습니다.');
            return;
        }

        setInviteList((prevInviteList) => {
            const isAlreadyInvited = prevInviteList.some(invite => invite.stfNo === member.stfNo);
            if (isAlreadyInvited) {
                return prevInviteList.filter(invite => invite.stfNo !== member.stfNo);
            } else {
                return [...prevInviteList, member];
            }
        });
    };

    const handleRemoveInvite = (member) => {
        if (member.stfNo === stfNo) {
            alert('본인은 초대 목록에서 제거할 수 없습니다.');
            return;
        }
        setInviteList((prevInviteList) => prevInviteList.filter(invite => invite.stfNo !== member.stfNo));
    };

    const [accordions, setAccordions] = useState([]);

    const handleAccordion = (index) => {
        setAccordions(prevState => {
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGroupInfo = groupInfo.map(group => ({
        ...group,
        member: group.member.filter(member => 
            member.stfName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }));

    const handleNext = () => {
        setStep(2);
    };

    const handlePrevious = () => {
        setStep(1);
    };

    const handleCreate = () => {
        const newCalendar = {
            title: calendarTitle,
            ownerStfNo: stfNo,
            members: inviteList // 초대된 멤버 리스트
        };

        // 캘린더를 생성하고, 생성된 캘린더를 calendars 상태에 추가하는 역할
        // 즉, 생성된 캘린더를 상태에 추가하고 UI를 업데이트하는 역할
        axios.post(`${RootUrl()}/calendars`, newCalendar)
            .then(response => {
                const createdCalendar = response.data;
                onCreate(createdCalendar);
                handelColseModal();
            })
            .catch(error => {
                console.error("There was an error creating the calendar!", error);
            });
    };

    return (
        <div className="modalBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>캘린더 생성</p>
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
                                        value={searchTerm} 
                                        onChange={handleSearchChange} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modalRow">
                            <div className="modalGroup" style={{ width: "60%", padding: "0" }}>
                                <div className="groupHead" style={{ width: '100%' }}>
                                    {filteredGroupInfo && filteredGroupInfo.map((group, index) => (
                                        <div key={index}>
                                            <p onClick={() => handleAccordion(index)}>
                                                {(group.dptName === "인사지원부") &&
                                                    <FontAwesomeIcon icon={faUserGear} style={{ fontSize: '18px', marginRight : "4px" }} />
                                                }
                                                {(group.dptName === "영업부") &&
                                                    <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '18px', marginRight: "4px" }} />
                                                }
                                                {(group.dptName === "전산부") &&
                                                    <FontAwesomeIcon icon={faBolt} style={{ fontSize: '18px', marginRight: "4px" }} />
                                                }
                                                {group.dptName}({group.member.length})
                                            </p>
                                            {accordions[index] && group.member.map((member) => (
                                                <GroupBodyComponent
                                                    key={member.stfNo}
                                                    member={member}
                                                    onClick={() => handleMemberClick(member)} />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modalRow">
                                <div className='inviteList'>
                                    {inviteList.filter(member => member.stfNo !== stfNo).map((member, index) => ( // 로그인한 사용자 제외
                                        <span
                                            key={index}
                                            onClick={() => handleRemoveInvite(member)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {member.stfName || member.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modalColumn"></div>

                        <div className="modalRow">
                            <button className="modalClose" onClick={handelColseModal}>취소</button>
                            <button onClick={handleNext}>다음</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="modalColumn">
                            <div className="modalRow">
                                <div className="maR30">캘린더 이름</div>
                                <div>
                                    <input 
                                        type="text" 
                                        value={calendarTitle} 
                                        onChange={(e) => setCalendarTitle(e.target.value)} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modalColumn"></div>

                        <div className="modalRow">
                            <button onClick={handlePrevious}>이전</button>
                            <button onClick={handleCreate}>생성</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CreateCalendarModal;
