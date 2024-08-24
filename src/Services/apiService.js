import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { createGetQuery, isValueExist } from '../utils/helper';

// Authentication pattern to call each api
var credentials = btoa('user:user@123');
var basicAuth = 'Basic ' + credentials;

// ******** token should be replace with dynamic one ********** //
const token = localStorage.getItem('token');
console.log('TOKEN -----------', token)
// const token = '123-POSSale-1-4-1-3c0a460f224e4991a9ce6d26d491687c-50142-4ed7d05f1d3f4162911792a21dc465be507e26bd9f9f44af8e23194cf75ead83P_i4EHFb3376FJh4Jsfc1rLE05kI0d7UqpDC2jYAUBq-hJ7tF3yqbFhn-X12MYGHjaUv408vObp4gl_iuF96T1boa0LYj8-e02w8Pj3jqaZ4BW8_7Oi63EzLn5n1CCDSE3r8T3evmItid2IA034ND18yz4j2t887P4m3pR26288NXFfDd8gde8MdaQq7xx7_KT7zJiRbilcmWTPaQpZo8Djh5jAvJEQR3Pm0gAUhYQyJE9t5jJ6DLmkaJPycDMyOVHtY4nNcr2rH32176KWzo218YJ_FYTKp5dv93EM0-7V0';

let headerObj = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': basicAuth,
    'channelType' : 2,
    'language' : 1,
    'usageType' : 1
}

headerObj = isValueExist(token) ? { ...headerObj, 'hand-pos-gd-authorization': token} : headerObj;

// load basic data for future axios use
let ApiInst = axios.create({
    baseURL: BASE_URL,
    headers: headerObj
});

export const getApi = async (url, query = {}) => {
    try{
        query = createGetQuery(query);
        const res = await ApiInst.get(`${url}${query !== '' ? `?${query}` : query}`);
        console.log('REsponsew', res)
        if(!res.status){
            const msg = `An error has occurred: ${res.message}`;
            throw msg;
        }
        return res.data;
     }
     catch(err){
         const msg = err?.message ? err?.message :  `Something went wrong.`;
         throw msg;
     }
}

export const postApi = async (url, data) => {
    try{
        const res = await ApiInst.post(url, data);
        if(!res.status){
            const msg = `An error has occurred: ${res.message}`;
            throw msg;
        }
        return res.data;
     }
     catch(err){
         const msg = err?.message ? err?.message :  `Something went wrong.`;
         throw msg;
     }
    // return await ApiInst.post(url, data).then(data => {
    //     return data?.data;
    // }).catch(err => {
    //     return err.message;
    // })
}

export const getApiById = async (url, id, query = {}) => {
    query = createGetQuery(query);
    await ApiInst.get(`${url}${query !== '' ? `?${query}` : query}/${id}`).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
}

export const putApi = async (url, id, data) => {
    await ApiInst.put(url, data).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
}

export const patchApi = async (url, id, data) => {
    await ApiInst.patch(url, data).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
}

export const deleteApi = async (url, id) => {
    await ApiInst.delete(`${url}/${id}`).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
}

export const deleteMultiApi = async (url, ids) => {
    await ApiInst.delete(url, ids).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
}