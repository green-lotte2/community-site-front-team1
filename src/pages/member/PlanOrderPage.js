import React, { useEffect, useState } from 'react'
import MemberLayout from '../../layout/MemberLayout';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getPlan,getUserInfo,getCountUser,postPay,savePlan} from '../../api/MemberApi'
import { getCookie} from "../../util/cookieUtil";


const PlanOrderPage = () => {

    const [outputCheck, setOutputCheck] = useState(0);
    const [beforecost,setBeforeCost] = useState('');
    const [count,setCount] = useState(0);
    const [auth, setAuth] = useState(getCookie("auth"));


    //const auth = getCookie("auth");
    //const id = auth?.userId;
    //const name = auth?.usename;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const planType = queryParams.get('planType');
    const user = queryParams.get('stfNo');

    const navigate = useNavigate();



    const [stf, setStf] = useState({
        stfNo:user,
        stfName: '',
        stfEmail: '',
        stfPh: '',
        paymentMethod:'',
        cost:'',
        planNo:''

    });

    const { stfNo, stfName, stfEmail, stfPh,paymentMethod,cost,planNo} = stf; //비구조화 할당????


    
    useEffect(()=>{
       

        //이름, 이메일, 연락처 먼저 띄우기

        //상품정보 불러오기(타입만 주소로 보냄)

        //stf테이블에서 Break,Active 상태인 회원들 수를 세기
        const fetchData = async()=>{
  
            const response = await getPlan();
            
            response.map((plan)=>{

                if(plan.planName==planType){
                    //맞는 타입에 들어왔으면 
                    const planCost = plan.planCost;
                    setBeforeCost(planCost);
                }
            })

 
            const userInfo = await getUserInfo(user);

            setStf({
                stfName:userInfo.stfName,
                stfEmail:userInfo.stfEmail,
                stfPh:userInfo.stfPh,
                planNo:queryParams.get('planNo')
            })

            const countUser = await getCountUser();
            setCount(countUser);

            console.log("총 몇명인가?",countUser);
            
        }
        fetchData();
    },[planType]);


    const countOutput = (e) => {//
        changeHandler(e);

        checkOutput();

        if(outputCheck>=2){
            validHandler();
        }
    }
    
    const validHandler = ()=>{//유효성 검사(2자리 잘 입력이 되었는지 체크)
        const valid = document.getElementsByClassName('valid');
        const valid1 = document.getElementsByClassName('valid1');
        let validResult = 0;

        console.log("OutputCheck....1 : ",outputCheck);

        Array.from(valid).forEach(function(each) {
            if (each.value.length >= 2) {


                validResult += 1;
            }
        })

        console.log("OutputCheck....2 : ",outputCheck);

        Array.from(valid1).forEach(function(each) {
            if (each.value.length >= 2) {

                validResult += 1;
            }
        })

        console.log("OutputCheck....3 : ",outputCheck);
    
        if (validResult === 2) {

            setOutputCheck(3);

            console.log("OutputCheck.....4 : ",outputCheck);
        } else {

            setOutputCheck(2);

            console.log("OutputCheck.....5 : ",outputCheck);
        }


    }

    const checkOutput = () => {//카드유효성 검사(자릿수 잘 입력했는지만 체크)

        const checks = document.getElementsByClassName('check');
        let result = 0;
        Array.from(checks).forEach(function(each) {
            if (each.value.length >= 4) {//몇개의 숫자를 입력하는지 체크
                result += 1;
            }
        })
        if (result === 4) {
            setOutputCheck(2);
        } else {
            setOutputCheck(1);
        }
        
    }

    //필요한 것 : 시작날짜(결제하는 당일의 날짜), 끝날짜(시작날짜+30일), 주문자 정보
    const submitOrder = async () =>{
    
        console.log("내가 쓴 이름 : ",stf.stfName);
        console.log("내가 쓴 이메일 : ",stf.stfEmail);
        console.log("내가 쓴 핸드폰 : ",stf.stfPh);
        console.log("내가 선택한 카드 : ",paymentMethod);

        if(paymentMethod==null|| paymentMethod==''){
            alert("카드를 선택해주세요");
        }
        else if(outputCheck===1){

            alert("카드번호를 입력해주세요");
            console.log("카드번보를 입력해주세요 칸 : ",outputCheck);
        }
        else if(outputCheck===2){
            alert("유효기간을 입력해주세요");
            console.log("유효기간을 입력해주세요 칸 : ",outputCheck);

        }else if(outputCheck===3){

            alert("결제가 완료되었습니다.")
            console.log("이제됐다! 칸 : ",outputCheck);    

            const planNo = await postPay(stf);

            console.log("플랜 프라이머리 키 : ",planNo);

            const data={
                user:user,
                planNo : planNo
            }

            await savePlan(data);                     

            navigate("/complete", {state: { user: user }});


        }
    }



    const changeHandler = (e) => {

        setStf({ ...stf, [e.target.name]: e.target.value });
        
    };

    const calculatedTotal = beforecost*count;
    stf.cost=calculatedTotal;//총 비용

    console.log("총 합 : ",calculatedTotal);

  
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

                <select name="paymentMethod" id="paymentMethod" onChange={countOutput}>
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
                            <input type="text" className="valid" onChange={countOutput} />
                            <input type="text" className="valid1" onChange={countOutput} />
                        </div>
                    </div>
                )}
                
                    
            </div>

            <div className='planOrder orderInfo'>

                <p>상품 정보</p>

                <p>{planType}</p>
                <p>가격 <span>{beforecost}</span>원/월</p>
                <div>
                    <p>예상 청구 비용</p>
                    <p>{beforecost.toLocaleString()} 원 x <span>{count}</span>명</p>
                    <p>= 월 {stf.cost.toLocaleString()}</p>
                </div>

                <button type='button' onClick={submitOrder}>결제하기</button>
            </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default PlanOrderPage