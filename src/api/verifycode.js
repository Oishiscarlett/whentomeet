/**
 * verifycode模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/axios'; // 导入创建的axios实例

const verifycode = {    
    // post提交
    sendPhoneVerifyCode(params) {
        return axios.post(base.baseUrl + '/verifycode/phone', null, {
            params: params
        });
    },
    sendEmailVerifyCode(params) {
        return axios.post(base.baseUrl + '/verifycode/email', null, {
            params: params
        });
    },
    verifyPhoneAndCode(params) {
        return axios.post(base.baseUrl + '/verifycode/phone/code', null, {
            params: params
        });
    },
}

export default verifycode;