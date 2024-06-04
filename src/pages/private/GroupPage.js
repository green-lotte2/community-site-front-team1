import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import GroupHeadComponent from '../../components/common/private/GroupHeadComponent';
import { getDptAndStfList, getDptList, getUserInfo, getUserList } from '../../api/AdminApi';
import { RootUrl } from '../../api/RootUrl';

const GroupPage = () => {
    const [groupInfo, setGroupInfo] = useState([]);
    // 오른쪽 화면 (처음에는 안뜨고 회원 이름 클릭하면 서버에서 정보 받아와서 띄우기)
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptAndStfList();
                console.log('getDptList' + groupInfo);
                setGroupInfo(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleMemberClick = async (member) => {
        try {
            // 클릭된 멤버의 정보를 가져와서 userInfo를 설정
            const response = await getUserInfo(member.stfNo);
            setUserInfo(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MainLayout>
            <div className="chatBox">
                <div className="contentBox boxStyle9">
                    <div className="groupBox">
                        <GroupHeadComponent groupInfo={groupInfo} handleMemberClick={handleMemberClick} />
                    </div>
                </div>

                {userInfo && (
                    <div className="contentBox boxStyle5">
                        <div className="contentColumn">
                            <div className="groupRow">
                                {userInfo.stfImg && (
                                    <img src={`${RootUrl()}/images/${userInfo.stfImg}`} alt="sft" name="stfImg" />
                                )}
                                <div>
                                    <p>{userInfo.stfName}</p>
                                    <p>직 책: {userInfo.strRnkNo}</p>
                                    <p>부 서: {userInfo.strDptName}</p>
                                    <p>이메일: {userInfo.stfEmail}</p>
                                    <p>연락처: {userInfo.stfPh}</p>
                                </div>
                            </div>
                            <div className="groupColumn">
                                <div className='myPageRow'>
                                    <p>올해 휴가 일수</p>
                                    <p>사용한 휴가 일수</p>
                                    <p>남은 휴가 일수</p>
                                </div>
                                <div className='myPageRow'>
                                    <p>13</p>
                                    <p>5</p>
                                    <p>8</p>
                                </div>
                            </div>
                            <div className="groupRow">
                                <div className='memberBtn'>채팅하기</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default GroupPage;
