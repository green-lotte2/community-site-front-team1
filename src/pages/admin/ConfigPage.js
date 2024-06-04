import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import DptConfigComponent from '../../components/admin/DptConfigComponent';
import RankConfigComponent from '../../components/admin/RankConfigComponent';
import { getDptList, getRnkList } from '../../api/AdminApi';

const ConfigPage = () => {
    const [dptValue, setDptValue] = useState([]);
    const [rankValue, setRankValue] = useState([]);

    // 부서 내용 변경 핸들러
    const handleChangeDpt = (event) => {
        setDptValue(event.target.value);
    };

    // 직책 내용 변경 핸들러
    const handleChangeRank = (event) => {
        setRankValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rnkResponse = await getRnkList();
                const detResponse = await getDptList();

                setRankValue(rnkResponse);
                setDptValue(detResponse);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <MainLayout>
            <div className="chatBox">
                <DptConfigComponent handleChangeDpt={handleChangeDpt} dptValue={dptValue} />

                <RankConfigComponent handleChangeRank={handleChangeRank} rankValue={rankValue} />
            </div>
        </MainLayout>
    );
};

export default ConfigPage;
