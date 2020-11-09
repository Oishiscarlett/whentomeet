/**
 * event模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/axios'; // 导入创建的axios实例

const event = {    
    /* 
        创建事件页面相关
    */
    // 创建事件
    creatEvent(params) {
        return axios.post(base.baseUrl + '/createinfo', null, {
            params: params
        });
    },
    // 重新编辑事件
    editEvent(params) {
        return axios.post(base.baseUrl + `/${eventCode}/edit/${hostCode}`, null, {
            params: params
        });
    },


    /* 
        选择时间页面相关
    */
    // 获取事件的相关信息
    getEvent(params) {
        return axios.post(base.baseUrl + `/${eventCode}`, null, {
            params: params
        });
    },
    // 重新选择时间
    updateTimeSelected(params) {
        return axios.post(base.baseUrl + `${eventCode}/update/${idCode}`, null, {
            params: params
        });
    },


    /* 
        结果码页面相关
    */
    // 验证结果码
    verifyResultCode(params) {
        return axios.post(base.baseUrl + '/EnterResultsCode', null, {
            params: params
        });
    },

    /**
     *  结果页面相关
     */
    // 获取结果页面的相关信息
    getResultByCode(params) {
        return axios.post(base.baseUrl + `/eventinfo/${hostCode}`, null, {
            params: params
        });
    },
    // 提交最终时间
    selectFinalTime(params) {
        return axios.post(base.baseUrl + `${eventCode}/final/${hostCode}`, null, {
            params: params
        });
    },

    /**
     *  最终结果页面相关
     */
    // 获取最终结果
    getFinalResult(params) {
        return axios.post(base.baseUrl + `${eventCode}/result/${hostCode}`, null, {
            params: params
        });
    }   
}

export default event;