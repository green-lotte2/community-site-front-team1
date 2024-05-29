import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();



export const getEmail = async (data) =>{

    const response = await axios.get(`${rootURL}/sendEmail?email=${data}`);

    return response;
}

export const getFindPostion = async ()=>{

    const response = await axios.get(`${rootURL}/findPosition`);

    return response;

}

export const getFindRnk = async ()=>{
    const response = await axios.get(`${rootURL}/findRnk`);

    return response;
}

export const getVeriftyCode = async (params)=>{
    const response = await axios.get(`${rootURL}/verifyCode`,{
        params: params
    });

    return response;
}