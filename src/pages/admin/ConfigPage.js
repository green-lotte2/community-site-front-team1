import React, { useState } from 'react'
import MainLayout from '../../layout/MainLayout';

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

            <div className='contentBox boxStyle4'>
                <div className="contentTitle font30 alignL">부서 설정</div>
                <div className="contentInfo alignL">회사 내 부서 이름, 종류 변경 가능합니다.</div>

                <div className='scrollBox'>
                    <div className='scrollRow configRow'>
                        <div>1</div>
                        <div>
                            <input type="text" value={dptValue} onChange={handleChangeDpt}/>
                        </div>
                    </div>
                    <div className='scrollRow configRow'>
                        <div>2</div>
                        <div>
                            <input type="text" value="인사부" onChange={handleChangeDpt}/>
                        </div>
                    </div>
                    <div className='scrollRow configRow'>
                        <div>3</div>
                        <div>
                            <input type="text" value="개발부" onChange={handleChangeDpt}/>
                        </div>
                    </div>
                </div>

                <div className='contentRow'>
                    <button className='nomalBtn'>취소</button>
                    <button className='nomalBtn'>변경</button>
                </div>
            </div>  

            <div className='contentBox boxStyle4'>
                <div className="contentTitle font30 alignL">직책 설정</div>
                <div className="contentInfo alignL">회사 내 직책 이름, 종류 변경 가능합니다.</div>

                <div className='scrollBox'>
                    <div className='scrollRow configRow'>
                        <div>1</div>
                        <div>
                            <input type="text" value={dptValue} onChange={handleChangeRank}/>
                        </div>
                    </div>
                    <div className='scrollRow configRow'>
                        <div>2</div>
                        <div>
                            <input type="text" value="인사부" onChange={handleChangeRank}/>
                        </div>
                    </div>
                    <div className='scrollRow configRow'>
                        <div>3</div>
                        <div>
                            <input type="text" value="개발부" onChange={handleChangeRank}/>
                        </div>
                    </div>
                </div>

                <div className='contentRow'>
                    <button className='nomalBtn'>취소</button>
                    <button className='nomalBtn'>변경</button>
                </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default ConfigPage;