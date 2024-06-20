import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

const AdminMain = () => {
    const [dashboardInfo, setDashboardInfo] = useState({
        totalMembers: 0,
        activeMembers: 0,
        planName: ''
    });

    const [csStatus, setCsStatus] = useState({
        newInquiries: 0,
        pendingReplies: 0
    });

    // 리덕스에서 현재 로그인한 사용자의 stfNo를 가져옴
    const stfNo = useSelector(state => state.loginSlice.userId);

    useEffect(() => {
        const fetchDashboardInfo = async () => {
            try {
                console.log('Fetching dashboard info...');
                const response = await axios.get(`${RootUrl()}/admin/userListAndPlan`, {
                    params: { stfNo }
                });
                console.log('Dashboard info response:', response.data);
                setDashboardInfo(response.data);
            } catch (error) {
                console.error('Failed to fetch dashboard info', error);
            }
        };

        const fetchCsStatus = async () => {
            try {
                console.log('Fetching CS status...');
                const response = await axios.get(`${RootUrl()}/admin/cs/status`);
                console.log('CS status response:', response.data);
                setCsStatus(response.data);
            } catch (error) {
                console.error('Failed to fetch CS status', error);
            }
        };

        if (stfNo) {
            fetchDashboardInfo();
            fetchCsStatus();
        }
    }, [stfNo]);

    return (
        <MainLayout>
            <div className="contentBox boxStyle11" style={{ flexDirection: "row", alignItems: "center" }}>
                <Link to={`/groupPlan?stfNo=${stfNo}`}>
                    <div className='adminMain'>
                        <img src="/images/icon/users-between-lines-solid.svg" alt="회원 현황" />
                    </div>
                </Link>
                <div className='adminMain' style={{ flexDirection: "column", justifyContent: "center" }}>
                    <p>회원 현황</p>
                    <span>가입된 회원 : {dashboardInfo.totalMembers}</span>
                    <span>활동 회원 : {dashboardInfo.activeMembers}</span>
                    <span>사용 플랜 : {dashboardInfo.planName}</span>
                </div>
            </div>
            
            <div className="contentBox boxStyle11" style={{ flexDirection: "row", alignItems: "center" }}>
                <Link to="/csList">
                    <div className='adminMain'>
                        <img src="/images/icon/comments-regular.svg" alt="고객 문의 현황" />
                    </div>
                </Link>
                <Link to="/csList">
                    <div className='adminMain' style={{ flexDirection: "column", justifyContent: "center" }}>
                        <p>고객 문의 현황</p>
                        <span>신규 문의 : {csStatus.newInquiries} (최근 2일)</span>
                        <span>답변 대기 : {csStatus.pendingReplies}</span>
                    </div>
                </Link>
            </div>

            <div className="contentBox boxStyle12 adminImg">
                <Link to="/config">
                    <p>기본 설정 관리</p>
                    <img src="/images/icon/screwdriver-wrench-solid.svg" alt="기본 설정 관리" />
                </Link>
            </div>

            <div className="contentBox boxStyle12 adminImg">
                <Link to="/userList">
                    <p>회원 정보 관리</p>
                    <img src="/images/icon/user-gear-solid.svg" alt="회원 정보 관리" />
                </Link>
            </div>

            <div className="contentBox boxStyle12 adminImg">
                <Link to="/articleList">
                    <p>게시판 관리</p>
                    <img src="/images/icon/folder-open-solid.svg" alt="게시판 관리" />
                </Link>
            </div>
        </MainLayout>
    );
}

export default AdminMain;
