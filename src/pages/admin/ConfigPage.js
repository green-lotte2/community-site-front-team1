import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import DptConfigComponent from '../../components/admin/DptConfigComponent';
import RankConfigComponent from '../../components/admin/RankConfigComponent';
import { getDptAndStfList, getDptList, getRnkList } from '../../api/AdminApi';

const ConfigPage = () => {
    const [dptValue, setDptValue] = useState([]);
    const [rankValue, setRankValue] = useState([]);

    // 부서 내용 변경 핸들러
    const handleChangeDpt = (index, event) => {
        const newValue = [...dptValue];
        newValue[index].dptName = event.target.value;
        setDptValue(newValue);
    };
    // 부서 추가 핸들러
    const addNewDpt = (newDpt) => {
        setDptValue((prevState) => [...prevState, newDpt]);
    };

    // 직책 내용 변경 핸들러
    const handleChangeRank = (index, event) => {
        const newValue = [...rankValue];
        newValue[index].rnkName = event.target.value;
        setRankValue(newValue);
    };

    const addNewRank = (newRank) => {
        setDptValue((prevState) => [...prevState, newRank]);
    };

    const fetchData = async () => {
        try {
            const detResponse = await getDptAndStfList();
            console.log(detResponse);
            setDptValue(detResponse);
        } catch (err) {
            console.log(err);
        }
    };

    const rnkFetchData = async () => {
        try {
            const rnkResponse = await getRnkList();
            console.log(rnkResponse);
            setRankValue(rnkResponse);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
        rnkFetchData();
    }, []);

    return (
        <MainLayout>
            <div className="chatBox">
                <DptConfigComponent
                    handleChangeDpt={handleChangeDpt}
                    dptValue={dptValue}
                    addNewDpt={addNewDpt}
                    fetchData={fetchData}
                />

                <RankConfigComponent
                    handleChangeRank={handleChangeRank}
                    rankValue={rankValue}
                    setRankValue={setRankValue}
                    addNewRank={addNewRank}
                    rnkFetchData={rnkFetchData}
                />
            </div>
        </MainLayout>
    );
};

export default ConfigPage;
