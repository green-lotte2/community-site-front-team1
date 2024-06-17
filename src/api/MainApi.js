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