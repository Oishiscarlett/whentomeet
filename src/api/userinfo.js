/**
 * userinfo模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/axios'; // 导入创建的axios实例

const userinfo = {  
    // get
    getUserInfo () {        
        return axios.get(base.baseUrl + '/userinfo');    
    },   

    // post提交
    resetNickname(params) {
        return axios.post(base.baseUrl + '/userinfo/nickname', null, {
            params: params
        });
    },
    resetPsw(params) {
        return axios.post(base.baseUrl + '/userinfo/pwd', null, {
            params: params
        });
    },

    // patch
    resetEmail(params) {
        return axios.post(base.baseUrl + '/userinfo/email', null, {
            params: params
        });
    }
}

export default userinfo;