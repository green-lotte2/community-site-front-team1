import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faGear, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddStfComponent from '../../AddStfComponent';
import { delKanban, deleteStf, getStfList, postKanbanMember } from '../../../../api/KanbanApi';
import LoginSlice from '../../../../slice/LoginSlice';
import { useSelector } from 'react-redux';

export default function Navbar({ switchTheme, selectedKanbanName, kanbanNo, kanbanStf }) {
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [inviteList, setInviteList] = useState([]);

    const handleAddMemberClick = () => {
        setShowAddMemberModal(!showAddMemberModal);
    };

    const handleCloseModal = () => {
        setShowAddMemberModal(false);
    };

    const handleAddMember = async (newInvite) => {
        try {
            newInvite.map((member) => {
                const newMember = {
                    kanbanId: kanbanNo,
                    stfNo: member.stfNo,
                };
                console.log('newmember', newMember);
                return postKanbanMember(newMember);
            });
            handleCloseModal();
            alert('멤버 추가가 완료되었습니다.');
        } catch (err) {
            console.log(err);
            alert('멤버 추가중 오류가 발생했습니다. 잠시후 다시 시도해주세요');
        }
    };

    const findStf = async () => {
        console.log('실행되니', kanbanNo);
        try {
            const stfList = await getStfList(kanbanNo);
            console.log(stfList);
            setInviteList(stfList);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (showAddMemberModal) {
            findStf();
        }
    }, [showAddMemberModal, kanbanNo]);

    // 설정 버튼
    const deleteKanban = async () => {
        const isRemove = window.confirm('칸반보드를 삭제하시겠습니까?');
        if (isRemove) {
            try {
                const response = await delKanban(kanbanNo);
                console.log(response);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };
    const loginSlice = useSelector((state) => state.loginSlice) || {};
    const userId = loginSlice.userId;
    // 나가기 버튼 클릭 핸들러
    const handleLeaveCalendar = async () => {
        const isRemove = window.confirm('프로젝트에서 나가시겠습니까?');
        if (isRemove) {
            try {
                const response = await deleteStf(userId, kanbanNo);
                console.log(response);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="navbar">
            <h2>{selectedKanbanName ? `${selectedKanbanName}` : 'Kanban Board'}</h2>

            <label htmlFor="" style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, marginRight: '30px' }}>
                <>
                    {kanbanStf === userId && (
                        <>
                            <span
                                style={{
                                    display: 'flex',
                                    fontSize: '16px',
                                    margin: '0 10px',
                                    alignSelf: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={handleAddMemberClick}
                            >
                                <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;멤버 추가
                            </span>
                            <span
                                style={{
                                    display: 'flex',
                                    fontSize: '16px',
                                    margin: '0 10px',
                                    alignSelf: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={deleteKanban}
                            >
                                <FontAwesomeIcon icon={faTrash} /> &nbsp;삭제
                            </span>
                        </>
                    )}
                </>
                <>
                    {kanbanStf !== userId && (
                        <span
                            onClick={handleLeaveCalendar}
                            style={{
                                display: 'flex',
                                fontSize: '16px',
                                margin: '0 10px',
                                alignSelf: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <FontAwesomeIcon icon={faDoorOpen} /> &nbsp;나가기
                        </span>
                    )}
                </>
            </label>

            <div>
                <input
                    type="checkbox"
                    className="checkbox"
                    id="checkbox"
                    style={{ transition: 'all 200ms' }}
                    onChange={switchTheme}
                />
                <label for="checkbox" class="label">
                    <i className="fas fa-moon fa-sm"></i>
                    <i className="fas fa-sun fa-sm"></i>
                    <div className="ball" />
                </label>
            </div>
            {/* <button>Switch theme</button> */}
            {showAddMemberModal && (
                <AddStfComponent onClose={handleCloseModal} addStf={handleAddMember} inviteList={inviteList} />
            )}
        </div>
    );
}
