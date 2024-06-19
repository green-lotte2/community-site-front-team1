import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import GroupHeadComponent from '../../components/common/private/GroupHeadComponent';
import { getDptAndStfList, getDptList, getUserInfo, getUserList } from '../../api/AdminApi';
import { RootUrl } from '../../api/RootUrl';
import { useNavigate } from 'react-router-dom';
import { postCreateRoom } from '../../api/ChatApi';
import { getCookie } from '../../util/cookieUtil';
import axios from 'axios';

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

    const navigate = useNavigate();
    const auth = getCookie('auth');

    const [titleInfo, setTitleInfo] = useState({
        name: '',
        stfNo: auth?.userId,
    });
    const navigateToChatPage = async (userInfo) => {
        console.log(userInfo);
        const roomName = `${userInfo.stfName}님의 대화방`;
        const roomInfo = {
            name: roomName,
            stfNo: auth?.userId,
        };
        setTitleInfo(roomInfo);
        try {
            console.log('titleInfo', roomInfo);

            const createRoomResponse = await postCreateRoom(roomInfo);
            console.log('response', createRoomResponse.roomId);

            const newMember = [
                {
                    roomId: createRoomResponse.roomId,
                    stfNo: userInfo.stfNo,
                },
            ];
            console.log('newMember', newMember);
            const saveUserResponse = await axios.post(`${RootUrl()}/saveUser`, newMember);
            console.log('saveUserResponse', saveUserResponse);
            navigate('/chat');
        } catch (error) {
            console.error('Error creating chat room:', error);
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
                            <div className="groupRow">
                                <div className="memberBtn" onClick={() => navigateToChatPage(userInfo)}>
                                    채팅하기
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default GroupPage;
