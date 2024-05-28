import React, { useState } from 'react';
import UserModifyModal from '../modal/UserModifyModal';

const UserListComponent = ({ userList }) => {
    console.log(userList);

    // 모달창 활성화 여부 저장하는 useState
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 오픈 핸들러
    const handleModalOpen = () => {
        return setModalOpen(true);
    };
    // 모달창 닫는 핸들러
    const handleModalClose = (event) => {
        const modalClose = document.getElementsByClassName('modalClose');
        Array.from(modalClose).forEach(function (each) {
            if (event.target === each) {
                return setModalOpen(false);
            }
        });
    };

    const formData = (dateString) => {
        return dateString.substring(0, 10);
    };

    const rankMapping = {
        1: '사원',
        2: '대리',
        3: '과장',
        4: '차장',
        5: '부장',
        6: '이사',
        7: '상무',
        8: '전무',
        9: '사장',
    };

    const dptMapping = {
        1: '인사부',
        2: '영업부',
        3: '전산부',
        4: '네트워크관리부',
        5: 'SW 개발부',
        6: '고객 지원부',
        7: '기술지원부',
    };

    return (
        <>
            {userList && userList.dtoList.length > 0 ? (
                userList.dtoList.map((user, index) => (
                    <div className="adminUserRow">
                        <div>{userList.total - index}</div>
                        <div>{user.stfStatus === 'Break' ? '휴직' : user.stfStatus === 'Active' ? '재직' : '퇴직'}</div>
                        <div>{user.stfName}</div>
                        <div>{user.stfNo}</div>
                        <div>{rankMapping[user.rnkNo]}</div>
                        <div>{dptMapping[user.dptNo]}</div>
                        <div>{formData(user.stfEnt)}</div>
                        <div>{user.stfEmail}</div>
                        <div>
                            {/* 파라미터로 no값 들고 가기 */}
                            <span onClick={handleModalOpen}>수정</span>
                        </div>

                        {modalOpen && <UserModifyModal handleModalClose={handleModalClose}></UserModifyModal>}
                    </div>
                ))
            ) : (
                <div className="adminUserRow">없음</div>
            )}
        </>
    );
};

export default UserListComponent;
