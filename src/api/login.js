/**
 * login模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/axios'; // 导入创建的axios实例

const login = {    
    // post提交
    loginByPhone(params) {
        return axios.post(base.baseUrl + '/login/phone', params);
    },
    loginByEmail(params) {
        return axios.post(base.baseUrl + '/login/email', params);
    }
}

export default login;