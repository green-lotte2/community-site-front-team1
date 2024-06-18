import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();


//이메일 보내기
export const getEmail = async (data) =>{

    const response = await axios.get(`${rootURL}/sendEmail?email=${data}`);

    return response;
}

//부서 찾기
export const getFindPostion = async ()=>{

    const response = await axios.get(`${rootURL}/findPosition`);

    return response;

}

//직급 찾기
export const getFindRnk = async ()=>{
    const response = await axios.get(`${rootURL}/findRnk`);

    return response;
}

//코드 확인하기
export const getVeriftyCode = async (params)=>{
    const response = await axios.get(`${rootURL}/verifyCode`,{
        params: params
    });

    return response;
}

//db에 있는 플랜테이블에서 어떤 플랜이 있는지 가져오기
export const getPlan = async ()=>{
    const response = await axios.get(`${rootURL}/getPlan`);
    return response.data;
}

//플랜에 쓸 유저 정보가져오기
export const getUserInfo = async (data)=>{
    console.log("유저 아이디로 검색",data);
    const response = await axios.get(`${rootURL}/getUserInfo?stfNo=${data}`);
    return response.data;
}


//플랜결제에 필요한 유저 수 
export const getCountUser = async ()=>{
    console.log("유저 수 구하기");
    const response = await axios.get(`${rootURL}/getCountUser`);
    return response.data;
}



//플랜결제
export const postPay= async (data)=>{
    console.log("결제하기",data);
    const response = await axios.post(`${rootURL}/postPay`,data);
    return response.data;
}



//가입후에 플랜 다시 저장
export const savePlan= async (data)=>{
    console.log("플랜 결제후에 플랜 타입을 저장",data);
    const response = await axios.get(`${rootURL}/savePlan?user=${data.user}&planNo=${data.planNo}`);
    return response.data;
}


//무료고객은 플랜 따로 저장
export const freePlan= async (data)=>{

    console.log("무료고객 플랜 저장 - 아이디 : ",data);
    const response = await axios.get(`${rootURL}/freePlan?stfNo=${data}`);
    return response.data;
}


//최고관리자가 결제한 요금제 들고 오기
export const getPlanStatusNo= async ()=>{

    console.log("최고 관리자의 요금제 들고오기 : ");
    const response = await axios.get(`${rootURL}/getPlanStatusNo`);
    return response.data;
}


// 전화번호 중복 검사
export const stfHpCheckApi = async (stfPh) => {
    const response = await axios.post(`${RootUrl()}/checkPh`, {stfPh}, {
        headers : {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

