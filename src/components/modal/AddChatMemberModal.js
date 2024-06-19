import { faBolt, faBriefcase, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import GroupBodyComponent from '../common/private/GroupBodyComponent';
import { getDptAndStfList } from '../../api/AdminApi';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';
import { audioBlockConfig } from '@blocknote/core';
import { getCount } from '../../api/ChatApi';
import { getCookie } from '../../util/cookieUtil';

const AddChatMemberModal = ({ roomId, handelColseModal, onAddMembers }) => {
    const [groupInfo, setGroupInfo] = useState([]); // 부서 및 직원 정보
    const [inviteList, setInviteList] = useState([]); // 초대된 직원 목록
    const [searchTerm, setSearchTerm] = useState(''); // 검색어
    const [filteredMembers, setFilteredMembers] = useState([]); // 필터링된 멤버 목록
    const [existingMembers, setExistingMembers] = useState([]); // 기존 멤버 목록

    // Redux에서 로그인된 사용자의 정보를 가져옴
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const stfNo = loginSlice.userId || '';
    const stfName = loginSlice.username || '';
    const auth = getCookie('auth');

    // 부서 및 직원 정보를 서버에서 불러오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                setGroupInfo(response);
                console.log(`로그인 사용자: ${stfName} (ID: ${stfNo})`);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [stfNo, stfName]);

    useEffect(() => {
        const fetchExistingMembers = async () => {
            //여기서 룸에 저장된 사용자를 조회
            try {
                const response = await axios.get(`${RootUrl()}/findUserList?roomId=${roomId}`);
                setExistingMembers(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchExistingMembers();
    }, [roomId]);

    // 멤버 클릭 시 초대 목록에 추가 또는 제거하는 함수
    const handleMemberClick = (member) => {
        if (member.stfNo === stfNo) {
            alert('본인은 선택할 수 없습니다.');
            return;
        }

        if (existingMembers.some((existingMember) => existingMember.stfNo === member.stfNo)) {
            alert('이미 추가된 멤버입니다.');
            return;
        }

        setInviteList((prevInviteList) => {
            const isAlreadyInvited = prevInviteList.some((invite) => invite.stfNo === member.stfNo);
            if (isAlreadyInvited) {
                return prevInviteList.filter((invite) => invite.stfNo !== member.stfNo);
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
        setInviteList((prevInviteList) => prevInviteList.filter((invite) => invite.stfNo !== member.stfNo));
    };

    // 아코디언 메뉴의 상태 관리
    const [accordions, setAccordions] = useState([]);

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

    // 멤버 추가 함수
    const handleAddMembers = async () => {
        console.log('roomId 좀 확인', roomId);

        const countUser = await getCount(roomId); //방에 있는 인원구하기

        console.log('방에 있었던 인원 수 : ', countUser);

        const addUser = inviteList.length; //추가하는 인원구해서 더하기

        console.log('추가하는 인원 수 : ', addUser);

        const number = countUser + addUser;

        const groupPlan = auth?.planState;

        console.log('추가하는 인원수 + 바엥 있었떤 인원수  :', number);

        console.log('구독하고 있는 플랜의 번호 : ', groupPlan); //그룹플랜이 어떤건지 구하기

        let Limit = 0;

        if (groupPlan == 0) {
            //플랜 가입이 안되어 있으면
            Limit = 5;
        } else if (groupPlan == 1) {
            //플랜 1번 : 5명 제한
            Limit = 5;
        } else if (groupPlan == 2) {
            //플랜 2번 : 10명 제한

            Limit = 10;
        } else if (groupPlan >= 3) {
            Limit = 50000;
        }

        const AlertNumber = Limit - countUser;

        if (number <= Limit) {
            //방을 만든자의 플랜을 확인하고 참여가능한 인원이면 추가

            try {
                const newMembers = inviteList.map((member) => ({
                    roomId: roomId,
                    stfNo: member.stfNo,
                }));
                console.log('newMembers', newMembers);
                const response = await axios.post(`${RootUrl()}/saveUser`, newMembers);
                console.log('이름 리스트', response.data);

                onAddMembers(response.data); // 추가된 멤버를 부모 컴포넌트에 전달
                handelColseModal(); // 모달 닫기
            } catch (error) {
                console.error('멤버를 추가하는 중 오류가 발생했습니다!', error);
            }
        } else {
            //아니면 추가 할 수 있는 멤버보다 많다고 띄우기

            alert('추가 할 수 있는 멤버수를 넘겼습니다. 추가 가능한 수 = ' + AlertNumber);
        }
    };

    return (
        <div className="modalBack modalClose">
            <div className="modalBox">
                <div className="modalHeader">
                    <p>멤버 추가</p>
                    <p className="modalClose" style={{ cursor: 'pointer' }} onClick={handelColseModal}>
                        X
                    </p>
                </div>

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
                                        width: '100%',
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
                                            {group.dptName === '인사지원부' && (
                                                <FontAwesomeIcon
                                                    icon={faUserGear}
                                                    style={{ fontSize: '18px', marginRight: '4px' }}
                                                />
                                            )}
                                            {group.dptName === '영업부' && (
                                                <FontAwesomeIcon
                                                    icon={faBriefcase}
                                                    style={{ fontSize: '18px', marginRight: '4px' }}
                                                />
                                            )}
                                            {group.dptName === '전산부' && (
                                                <FontAwesomeIcon
                                                    icon={faBolt}
                                                    style={{ fontSize: '18px', marginRight: '4px' }}
                                                />
                                            )}
                                            {group.dptName}({group.member.length})
                                        </p>
                                        {accordions[index] &&
                                            group.member.map((member) => (
                                                <GroupBodyComponent
                                                    key={member.stfNo}
                                                    member={member}
                                                    onClick={() => handleMemberClick(member)}
                                                />
                                            ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="modalRow">
                        <div className="inviteList">
                            {inviteList
                                .filter((member) => member.stfNo !== stfNo)
                                .map(
                                    (
                                        member,
                                        index // 로그인한 사용자 제외
                                    ) => (
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
                                    )
                                )}
                        </div>
                    </div>
                </div>

                <div className="modalColumn"></div>

                <div className="modalRow">
                    <button className="modalClose" onClick={handelColseModal}>
                        취소
                    </button>
                    <button onClick={handleAddMembers}>추가</button>
                </div>
            </div>
        </div>
    );
};

export default AddChatMemberModal;
