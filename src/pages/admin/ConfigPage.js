import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout';
import DptConfigComponent from '../../components/admin/DptConfigComponent';
import RankConfigComponent from '../../components/admin/RankConfigComponent';

const ConfigPage = () => {

    const [dptValue, setDptValue] = useState('');
    const [rankValue, setRankValue] = useState('');

    // 부서 내용 변경 핸들러
    const handleChangeDpt = (event) => {
        setDptValue(event.target.value);
    };

    // 직책 내용 변경 핸들러
    const handleChangeRank = (event) => {
        setRankValue(event.target.value);
    };


  return (
    <MainLayout>
        <div className='chatBox'>

            <DptConfigComponent handleChangeDpt={handleChangeDpt} dptValue={dptValue}/>

            <RankConfigComponent handleChangeRank={handleChangeRank} rankValue={rankValue}/>
        </div>
    </MainLayout>
  )
}

export default ConfigPage;