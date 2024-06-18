import React, { useEffect, useState } from 'react';
import PagingComponent from '../../components/common/PagingComponent';
import TableListComponent from '../../components/article/TableListComponent';
import SearchComponent from '../../components/article/SearchComponent';
import MainLayout from '../../layout/MainLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserListComponent from '../../components/admin/UserListComponent';
import UserSearchComponent from '../../components/admin/UserSearchComponent';
import { getUserList, postUserList } from '../../api/AdminApi';
import UserModifyModal from '../../components/modal/UserModifyModal';
import ExcelForm from '../../components/admin/ExcelForm';

const UserListPage = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const [userList, setUserList] = useState(null);

    const navigate = useNavigate();

    let pg = queryParams.get('pg');
    if (pg === null) {
        pg = 1;
    }

    // pageNation 정보를 저장하는 useState
    const [pageRequest, setPageRequest] = useState({
        pg: pg,
        articleCateNo: 0,
        type: null,
        keyword: null,
        startDate: null,
        finalDate: null,
        status: null,
        rank: null,
        department: null,
        size: 10,
    });
    const fetchData = async () => {
        try {
            const response = await postUserList(pageRequest);
            console.log(response);
            setUserList(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageRequest]);

    // pg변경 함수 (페이징 버튼 클릭시)
    const changePage = (newPg) => {
        setPageRequest((prevPageRequest) => {
            const updatedRequest = { ...prevPageRequest, pg: newPg };
            const newParam = { pg: newPg };
            const searchParams = new URLSearchParams(newParam).toString();
            navigate(`?${searchParams}`);
            return updatedRequest;
        });
    };

    const handleSearch = async (searchParams) => {
        const newPageNation = { ...pageRequest, ...searchParams, pg: 1 };

        console.log('검색 옵션:', searchParams);
        console.log('검색 결과:', newPageNation);

        try {
            const response = await postUserList(newPageNation);
            setUserList(response);
            setPageRequest(newPageNation);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <div className="contentBox boxStyle7">
                <div className="contentTitle font30 alignL">회원 목록</div>

                <UserSearchComponent onSearch={handleSearch} />

                <div className="contentColumn">
                    <div className="adminUserRowTitle">
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

                    <UserListComponent userList={userList} setUserList={setUserList} />
                </div>
                <ExcelForm userList={userList} />
                <PagingComponent changePage={changePage} articleList={userList} />
            </div>
        </MainLayout>
    );
};

export default UserListPage;
