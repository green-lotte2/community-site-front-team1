import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import GroupHeadComponent from '../../components/common/private/GroupHeadComponent';
import { getDptAndStfList, getDptList, getUserList } from '../../api/AdminApi';

const GroupPage = () => {

    // 서버에서 받아온 정보를 GroupHeadComponent에 전달하면됨
    // 아래는 예시 실제로는 List의 인덱스 번호로 넘기면 될듯
    /*
    const [groupInfo, setGroupInfo] = useState([
        {
            department : "인사지원부",
            member : [
                { name: "홍길동", rank: "팀장" },
                { name: "강감찬", rank: "대리" },
                { name: "김유신", rank: "사원" },
                { name: "이순신", rank: "사원" }
            ]
        },
        {
            department : "영업부",
            member : [
                { name: "홍길동", rank: "팀장" },
                { name: "강감찬", rank: "대리" },
                { name: "김유신", rank: "사원" },
                { name: "이순신", rank: "사원" }
            ]
        },
        {
            department : "전산부",
            member : [
                { name: "홍길동", rank: "팀장" },
                { name: "강감찬", rank: "대리" },
                { name: "김유신", rank: "사원" },
                { name: "이순신", rank: "사원" }
            ]
        }
    ])
    */

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserList();
                console.log(response);
                setUserInfo(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);




  return (
    <MainLayout>
    <div className="contentBox boxStyle7">
      <div className="contentTitle font30 alignL">조직도</div>
    </div>

    <div className="contentBox boxStyle6">
        <div className='groupBox'>
            
            <GroupHeadComponent groupInfo={groupInfo}/>

        </div>
    </div>

    {userInfo && (
                <div className="contentBox boxStyle5">
                    <div className="contentColumn">
                        <div className="groupRow">
                            <img src="../images/iconSample3.png" alt="" />
                            <div>
                                <p>{userInfo.stfName}</p>
                                <p>직 책: {userInfo.rnkNo}</p>
                                <p>부 서: {userInfo.dptNo}</p>
                                <p>이메일: {userInfo.stfEmail}</p>
                                <p>연락처: {userInfo.stfPh}</p>
                            </div>
                        </div>

            <div className="groupRow">
                <div>
                    채팅하기
                </div>
            </div>

            아이디어가 없음..
        </div>
    </div>
    )}
    </MainLayout>
  )
}

export default GroupPage