import { faBolt, faBriefcase, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { getDptAndStfList } from '../../api/AdminApi';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

const CreateCalendarModal = ({ handelColseModal, onCreate }) => {
    const [groupInfo, setGroupInfo] = useState([]); // 부서 및 직원 정보
    const [inviteList, setInviteList] = useState([]); // 초대된 직원 목록
    const [searchTerm, setSearchTerm] = useState(""); // 검색어
    const [filteredMembers, setFilteredMembers] = useState([]); // 필터링된 멤버 목록
    const [calendarTitle, setCalendarTitle] = useState(""); // 캘린더 제목
    const [step, setStep] = useState(1); // 현재 단계 (1: 멤버 선택, 2: 캘린더 제목 입력)

    // Redux에서 로그인된 사용자의 정보를 가져옴
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || "";
    const stfName = loginSlice.username || "";

    // 부서 및 직원 정보를 서버에서 불러오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                setGroupInfo(response);

                // 로그인한 사용자를 초대 목록에 자동으로 추가
                setInviteList((prevInviteList) => {
                    if (!prevInviteList.some(invite => invite.stfNo === stfNo)) {
                        return [...prevInviteList, { stfNo, stfName, stfImg: loginSlice.userImg }];
                    }
                    return prevInviteList;
                });
                console.log(`로그인 사용자: ${stfName} (ID: ${stfNo})`);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [stfNo, stfName, loginSlice.userImg]);

    // 멤버 클릭 시 초대 목록에 추가 또는 제거하는 함수
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

    // 초대 목록에서 멤버 제거하는 함수
    const handleRemoveInvite = (member) => {
        if (member.stfNo === stfNo) {
            alert('본인은 초대 목록에서 제거할 수 없습니다.');
            return;
        }
        setInviteList((prevInviteList) => prevInviteList.filter(invite => invite.stfNo !== member.stfNo));
    };

    // 아코디언 메뉴의 상태 관리
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

    // 검색어 변경 처리
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

    // 다음 단계로 이동
    const handleNext = () => {
        setStep(2);
    };

    // 이전 단계로 이동
    const handlePrevious = () => {
        setStep(1);
    };

    // 캘린더 생성 함수
    const handleCreate = () => {
        const newCalendar = {
            title: calendarTitle,
            ownerStfNo: stfNo,
            members: inviteList // 초대된 멤버 리스트
        };

        // 캘린더를 생성하고, 생성된 캘린더를 부모 컴포넌트에 전달
        axios.post(`${RootUrl()}/calendars`, newCalendar)
            .then(response => {
                const createdCalendar = response.data;
                onCreate(createdCalendar); // 생성된 캘린더를 부모 컴포넌트에 전달
                handelColseModal(); // 모달 닫기
            })
            .catch(error => {
                console.error("캘린더 생성 중 오류가 발생했습니다!", error);
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
                                <div style={{ position: 'relative', width: '60%' }}>
                                    <input 
                                        type="text" 
                                        value={searchTerm} 
                                        onChange={handleSearchChange} 
                                        placeholder="이름 검색"
                                    />
                                    {filteredMembers.length > 0 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            background: 'white',
                                            border: '1px solid #ccc',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            zIndex: 1000,
                                            width: '100%',
                                        }}>
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
                            <div className="modalGroup" style={{ width: "60%", padding: "0" }}>
                                <div className="groupHead" style={{ width: '100%' }}>
                                    {groupInfo && groupInfo.map((group, index) => (
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
                                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <img
                                                src={`${RootUrl()}/images/${member.stfImg}`}
                                                alt="sft"
                                                name="stfImg"
                                                style={{ width: '30px', borderRadius: '50%', marginRight: '5px' }}
                                            />
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
