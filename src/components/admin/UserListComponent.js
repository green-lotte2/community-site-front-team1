import React, { useEffect, useState } from 'react';
import UserModifyModal from '../modal/UserModifyModal';
import { getDptList, getRnkList } from '../../api/AdminApi';

const UserListComponent = ({ userList, setUserList }) => {
    // 모달창 활성화 여부 저장하는 useState
    const [modalOpen, setModalOpen] = useState({});
    const [rnkList, setRnkList] = useState([]);
    const [dptList, setDptList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rnkResponse = await getRnkList();
                setRnkList(rnkResponse);
                const dptResponse = await getDptList();
                setDptList(dptResponse);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    // 모달창 오픈 핸들러
    const handleModalOpen = (index) => {
        setModalOpen((prev) => ({ ...prev, [index]: true }));
    };
    // 모달창 닫는 핸들러
    const handleModalClose = (index, modifiedData) => {
        setModalOpen((prev) => ({ ...prev, [index]: false }));
        window.location.reload();
    };

    return (
        <>
            {userList && userList.dtoList.length > 0 ? (
                userList.dtoList.map((user, index) => (
                    <div className="adminUserRow" key={user.stfNo}>
                        <div>{userList.startNo - index}</div>
                        <div>{user.stfStatus === 'Break' ? '휴직' : user.stfStatus === 'Active' ? '재직' : '퇴직'}</div>
                        <div>{user.stfName}</div>
                        <div>{user.stfNo}</div>
                        <div>{user.strRnkNo}</div>
                        <div>{user.strDptName}</div>
                        <div>{user.stfEnt}</div>
                        <div>{user.stfEmail}</div>
                        <div>
                            {/* 파라미터로 no값 들고 가기 */}
                            <span
                                onClick={() => handleModalOpen(index)}
                                style={{ cursor: 'pointer', fontSize: '16px' }}
                            >
                                수정
                            </span>
                        </div>

                        {modalOpen[index] && (
                            <UserModifyModal
                                userData={user}
                                rnkList={rnkList}
                                dptList={dptList}
                                handleModalClose={(modifiedData) => handleModalClose(index, modifiedData)}
                            ></UserModifyModal>
                        )}
                    </div>
                ))
            ) : (
                <div className="adminUserRow" style={{ padding: '10px', textAlign: 'center' }}>
                    검색결과가 없습니다.
                </div>
            )}
        </>
    );
};

export default UserListComponent;
