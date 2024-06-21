import React, { useEffect, useState } from 'react';
import { getDptList, getRnkList } from '../../api/AdminApi';

const UserSearchComponent = ({ onSearch }) => {
    const [dptList, setDptList] = useState(null);
    const [rnkList, setRnkList] = useState(null);
    const [searchParams, setSearchParams] = useState({
        stfStatus: null,
        rnkNo: '',
        dptNo: '',
        startDate2: '',
        endDate2: '',
        type: '',
        keyword: '',
        size: '10',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDptList();
                console.log('getDptList' + response);
                setDptList(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRnkList();
                console.log('rnkList' + response);
                setRnkList(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value === '' ? null : value,
        }));
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if (searchParams.keyword && !searchParams.type) {
            alert('검색 조건을 선택하세요.');
            return;
        }
        console.log('Search Params:', searchParams);
        onSearch(searchParams);
    };

    return (
        <div className="contentRow searchBox">
            <div className="searchColumn">
                <div className="searchRow">
                    <span className="searchTitle">상태</span>
                    <select name="stfStatus" id="stfStatus" onChange={handleInputChange}>
                        <option value="">상태 선택</option>
                        <option value="Active">재직</option>
                        <option value="Break">휴직</option>
                        <option value="Departed">퇴직</option>
                    </select>

                    <span className="space150"></span>

                    <span className="searchTitle">직책</span>
                    <select name="rnkNo" id="rnkNo" onChange={handleInputChange}>
                        <option value="">직책 선택</option>
                        {rnkList && rnkList.length > 0 ? (
                            rnkList.map((rnk, index) => (
                                <option key={index} value={rnk.rnkNo}>
                                    {rnk.rnkName}
                                </option>
                            ))
                        ) : (
                            <option value="">직급을 선택하세요</option>
                        )}
                    </select>

                    <span className="space150"></span>

                    <span className="searchTitle">부서</span>
                    <select name="dptNo" id="dptNo" onChange={handleInputChange}>
                        <option value="">부서 선택</option>
                        {dptList && dptList.length > 0 ? (
                            dptList.map((dpt, index) => (
                                <option key={index} value={dpt.dptNo}>
                                    {dpt.dptName}
                                </option>
                            ))
                        ) : (
                            <option value="">부서를 선택하세요</option>
                        )}
                    </select>

                    <span className="space150" />
                    <span className="searchTitle">목록 표시</span>
                    <select name="size" onChange={handleInputChange}>
                        <option value="10">10개</option>
                        <option value="20">20개</option>
                        <option value="50">50개</option>
                    </select>
                </div>

                <div className="searchRow">
                    <span className="searchTitle">입사일</span>
                    <input type="date" name="startDate2" onChange={handleInputChange} /> ~
                    <input type="date" name="endDate2" onChange={handleInputChange} />
                    <span className="space330"></span>
                    <select name="type" id="" onChange={handleInputChange}>
                        <option value="">검색조건 선택</option>
                        <option value="stfName">이름</option>
                        <option value="stfEmail">이메일</option>
                    </select>
                    <input
                        type="text"
                        name="keyword"
                        placeholder="검색어를 입력하세요"
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                searchHandler(e);
                            }
                        }}
                    />
                </div>
            </div>
            <div className="contentColumn">
                <div className="userSearchRow">
                    <input type="submit" value="검색" onClick={searchHandler} />
                </div>
            </div>
        </div>
    );
};

export default UserSearchComponent;
