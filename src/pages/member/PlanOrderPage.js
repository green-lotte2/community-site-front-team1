import React, { useEffect, useState } from 'react'
import MemberLayout from '../../layout/MemberLayout';
import { useLocation } from 'react-router-dom';
import { getPlan,getUserInfo } from '../../api/MemberApi'
import { getCookie} from "../../util/cookieUtil";


const PlanOrderPage = () => {

    const [outputCheck, setOutputCheck] = useState(0);
    const [cost,setCost] = useState('');
    const [auth, setAuth] = useState(getCookie("auth"));


    //const auth = getCookie("auth");
    //const id = auth?.userId;
    //const name = auth?.usename;


    const [stf, setStf] = useState({
        stfNo:'',
        stfName: '',
        stfEmail: '',
        stfPh: '',
        card:''
    });

    const { stfNo, stfName, stfEmail, stfPh,card } = stf; //비구조화 할당????



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const planType = queryParams.get('planType');
    
    useEffect(()=>{
       

        //이름, 이메일, 연락처 먼저 띄우기

        //상품정보 불러오기(타입만 주소로 보냄)
        const fetchData = async()=>{
  
            const response = await getPlan();
            
            response.map((plan)=>{

                if(plan.planName==planType){
                    //맞는 타입에 들어왔으면 
                    const planCost = plan.planCost;
                    setCost(planCost);
                }
            })

            const cookieAuth = getCookie('auth');
            setAuth(cookieAuth);

            if (cookieAuth) {

                console.log("아이디값 : ",cookieAuth.userId);
                console.log("이름 : ",cookieAuth.username);

                setStf({
                stfNo: cookieAuth.userId || ''
                });

            }

            const userInfo = await getUserInfo(cookieAuth.userId);

            setStf({
                stfName:userInfo.stfName,
                stfEmail:userInfo.stfEmail,
                stfPh:userInfo.stfPh
            })

        }
        fetchData();
    },[planType]);

    const countOutput = (e) => {

        setOutputCheck(1)

        setStf({ ...stf, [e.target.name]: e.target.value });
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


    //필요한 것 : 시작날짜(결제하는 당일의 날짜), 끝날짜(시작날짜+30일), 주문자 정보
    const submitOrder = () =>{
    
        console.log("내가 쓴 이름 : ",stf.stfName);
        console.log("내가 쓴 이메일 : ",stf.stfEmail);
        console.log("내가 쓴 핸드폰 : ",stf.stfPh);
        console.log("내가 선택한 카드 : ",card);

        if(card==null|| card==''){
            alert("카드를 선택해주세요");
        }
        else if(outputCheck==1){

            alert("카드번호를 입력해주세요");
            console.log("카드번보를 입력해주세요 칸 : ",outputCheck);
        }
        else if(outputCheck==2){
            alert("유효기간을 입력해주세요");
            console.log("유효기간을 입력해주세요 칸 : ",outputCheck);
        }else if(outputCheck==0){
            alert("이제 됐다!")
            console.log("이제됐다! 칸 : ",outputCheck);
        }

    }



    const changeHandler = (e) => {

        setStf({ ...stf, [e.target.name]: e.target.value });
        
    };
  

  return (
    <MemberLayout>
      <div className="memberBack planOrderBack">
        <div className="planOrderBox">

            <div className='planOrder'>

                <p>주문자 정보</p>

                <div>
                    <p>이름</p>
                    <input type="text" name="stfName" value={stf.stfName} onChange={changeHandler} />
                </div>
                <div>
                    <p>이메일</p>
                    <input type="text" name="stfEmail" value={stf.stfEmail} onChange={changeHandler} />
                </div>
                <div>
                    <p>연락처</p>
                    <input type="text" name="stfPh" value={stf.stfPh} onChange={changeHandler}/>
                </div>

                <p>결제 정보</p>

                <select name="card" id="card" onChange={countOutput}>
                    <option value="">카드선택</option>
                    <option value="삼성카드">삼성카드</option>
                    <option value="신한카드">신한카드</option>
                    <option value="현대카드">현대카드</option>
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
                            <input type="text" onChange={checkOutput}  />
                            <input type="text" onChange={checkOutput} />
                        </div>
                    </div>
                )}
                
                    
            </div>

            <div className='planOrder orderInfo'>

                <p>상품 정보</p>

                <p>{planType}</p>
                <p>가격 <span>{cost}</span>원/월</p>
                <div>
                    <p>예상 청구 비용</p>
                    <p>10,000 원 x <span>팀원수</span></p>
                    <p>= 월 100,000원</p>
                </div>

                <button type='button' onClick={submitOrder}>결제하기</button>

            </div>


        </div>
      </div>
    </MemberLayout>
  )
}

export default PlanOrderPage