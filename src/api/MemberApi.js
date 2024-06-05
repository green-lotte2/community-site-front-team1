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