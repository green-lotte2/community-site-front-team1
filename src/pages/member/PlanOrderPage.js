import React, { useState } from 'react'
import MemberLayout from '../../layout/MemberLayout';

const PlanOrderPage = () => {

    const [outputCheck, setOutputCheck] = useState(0);

    const countOutput = () => {
        setOutputCheck(1)
    }
    const checkOutput = () => {
        const checks = document.getElementsByClassName('check');
        let result = 0;
        Array.from(checks).forEach(function(each) {
            if (each.value.length >= 4) {
                result += 1;
            }
        })
        if (result === 4) {
            setOutputCheck(2);
        } else {
            setOutputCheck(1);
        }
    }

    /** 페이지 불러올때 사용자 정보 불러와서 이름 이메일 전화번호는 기입되게 해주세요 */

  return (
    <MemberLayout>
      <div className="memberBack planOrderBack">
        <div className="planOrderBox">

            <div className='planOrder'>

                <p>주문자 정보</p>

                <div>
                    <p>이름</p>
                    <input type="text" />
                </div>
                <div>
                    <p>이메일</p>
                    <input type="text" />
                </div>
                <div>
                    <p>연락처</p>
                    <input type="text" />
                </div>

                <p>결제 정보</p>

                <select name="" id="" onChange={countOutput}>
                    <option value="">카드종류1</option>
                    <option value="">카드종류2</option>
                    <option value="">카드종류3</option>
                </select>
                
                {outputCheck >= 1 && (
                    <div>
                        <p>카드번호</p>
                        <div>
                            <input className='check' type="text" onChange={checkOutput}/>
                            <input className='check' type="text" onChange={checkOutput}/>
                            <input className='check' type="text" onChange={checkOutput}/>
                            <input className='check' type="text" onChange={checkOutput}/>
                        </div>
                    </div>
                )}
                
                {outputCheck >= 2 && (
                    <div>
                        <p>유효기간</p>
                        <div>
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                )}
                
                    
            </div>

            <div className='planOrder orderInfo'>

                <p>상품 정보</p>

                <p>Team Plan Premium</p>
                <p>가격 <span>10,000</span>원/월</p>
                <div>
                    <p>예상 청구 비용</p>
                    <p>10,000 원 x <span>팀원수</span></p>
                    <p>= 월 100,000원</p>
                </div>

                <button>결제하기</button>

            </div>


        </div>
      </div>
    </MemberLayout>
  )
}

export default PlanOrderPage