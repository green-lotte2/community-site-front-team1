import axios from "axios";
import { RootUrl } from "./RootUrl";

// 메인 페이지 회원 정보 조회
export const mainInfoApi = async (userId) => {
    const response = await axios.post(`${RootUrl()}/main`, {userId}, {
        headers : {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};

// 마이 페이지 회원 정보 조회
export const selectStfInfoApi = async (userId) => {
    const response = await axios.post(`${RootUrl()}/myPage`, {userId}, {
        headers : {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

// 마이페이지 이메일 인증번호
export const sendEmailCodeApi = async (data) => {
    const response = await axios.get(`${RootUrl()}/sendEmail?email=${data}`);
    return response;
};