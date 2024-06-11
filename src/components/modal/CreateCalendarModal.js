import { faBolt, faBriefcase, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { getDptAndStfList, getUserInfo } from '../../api/AdminApi';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                setGroupInfo(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleMemberClick = async (member) => {
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
            ownerStfNo: stfNo
        };

        axios.post(`${RootUrl()}/calendars`, newCalendar)
            .then(response => {
                const createdCalendar = response.data;
                const memberPromises = inviteList.map(member => {
                    const newMember = {
                        calendarId: createdCalendar.calendarId,
                        stfNo: member.stfNo
                    };
                    return axios.post(`${RootUrl()}/calendarMembers`, newMember);
                });
                Promise.all(memberPromises).then(() => {
                    onCreate(createdCalendar);
                    handelColseModal();
                });
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
                                    {inviteList.map((member, index) => (
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
