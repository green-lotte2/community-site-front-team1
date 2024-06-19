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

// 마이페이지 연락처 수정 저장
export const saveStfPhApi = async (stfPh, stfNo) => {
    const response = await axios.get(`${RootUrl()}/myPage/stfPhSave?stfPh=${stfPh}&stfNo=${stfNo}`);
    return response.data;
};

// 마이페이지 이메일 수정 저장
export const saveStfEmailApi = async (stfEmail, stfNo) => {
    const response = await axios.get(`${RootUrl()}/myPage/stfEmailSave?stfEmail=${stfEmail}&stfNo=${stfNo}`);
    return response.data;
};

// 마이페이지 주소 수정 저장
export const saveStfAddrApi = async (data) => {
    const response = await axios.post(`${RootUrl()}/myPage/stfAddrSave`, data);
    return response.data;
};


// 마이페이지 프로필 사진 수정 저장
export const updateProfileApi = async (formData) =>{
    const response = await axios.post(`${RootUrl()}/myPage/stfProfileSave`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
}

// todo 완료
export const todoCompleteApi = async (todoNo) => {
    const response = await axios.get(`${RootUrl()}/todo/complete?todoNo=${todoNo}`);
    return response.data;
};

// todo 등록
export const createTodoApi = async (data) => {
    const response = await axios.post(`${RootUrl()}/todo/create`, data);
    return response.data;
};