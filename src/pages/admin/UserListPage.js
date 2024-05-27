import React, { useEffect, useState } from 'react';
import PagingComponent from '../../components/common/PagingComponent';
import TableListComponent from '../../components/article/TableListComponent';
import SearchComponent from '../../components/article/SearchComponent';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';
import UserListComponent from '../../components/admin/UserListComponent';
import UserSearchComponent from '../../components/admin/UserSearchComponent';
import { getUserList } from '../../api/AdminApi';

const UserListPage = () => {
    const [userList, setUserList] = useState(null);

    // pageNation 정보를 저장하는 useState
    const [pageNation, setPageNation] = useState({
        pg: 1,
        articleCateNo: 0,
        type: null,
        keyword: null,
        startDate: null,
        finalDate: null,
        status: null,
        rank: null,
        department: null,
    });

    // 페이지를 변경하는 함수 -> 자식컴포넌트(PagingComponent)로 전달해 pg값 변경 감지
    const handlePageChange = async (newPage) => {
        // 새로운 페이지 정보 가져오기
        const newPageNation = { ...pageNation, pg: newPage };

        try {
            // 새로운 페이지 정보로 데이터 가져오기
            const response = await getUserList;
            console.log(response);
            setUserList(response);
            // 페이지 정보 업데이트
            setPageNation(newPageNation);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserList(pageNation);
                setUserList(response);
                console.log('페이지로드' + response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">회원 목록</div>

                <UserSearchComponent></UserSearchComponent>

                <div className="contentColumn">
                    <div className="adminUserRow">
                        <div>NO</div>
                        <div>상태</div>
                        <div>이름</div>
                        <div>사원번호</div>
                        <div>직책</div>
                        <div>부서</div>
                        <div>입사일</div>
                        <div>이메일</div>
                        <div>관리</div>
                    </div>

                    <UserListComponent userList={userList}></UserListComponent>
                </div>

                <PagingComponent onPageChange={handlePageChange} />
            </div>
        </MainLayout>
    );
};

export default UserListPage;
