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
    editEvent(eventCode,hostCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/edit/${hostCode}`, null, {
            params: params
        });
    },


    /* 
        选择时间页面相关
    */
    // 获取事件的相关信息
    //提交参与者选择的时间与填写的信息
    //attendEvent
    attendEvent(eventCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/`, null, {
            params: params
        });
    },
    // 重新选择时间获取上一次的信息
    getPartnerInfo(idCode,params) {
        return axios.get(base.baseUrl + `/eventinfo/partner/${idCode}`, {
            params: params
        });
    },
    // 重新选择时间
    updateTimeSelected(eventCode,idCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/update/${idCode}`, null, {
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
    //参与者填写页面日历渲染
    getResultByCode(eventCode,params) {
        return axios.post(base.baseUrl + `/eventinfo/${eventCode}`, null, {
            params: params
        });
    },
    // 提交最终时间
    selectFinalTime(eventCode,hostCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/final/${hostCode}`, null, {
            params: params
        });
    },
    getTimeDetail(eventCode,hostCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/result/${hostCode}`, null, {
            params: params
        });
    },
    //删除回应
    deletePartnerResponse(eventCode,hostCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/result/${hostCode}/delete`, null, {
            params: params
        });
    },
    //发送重新填写邮件
    sendUpdateEmail(eventCode,idCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/result/${idCode}/email`, null, {
            params: params
        });
    },

    /**
     *  最终结果页面相关
     */
    // 获取最终结果
    getFinalResult(eventCode,params) {
        return axios.get(base.baseUrl + `/${eventCode}/final`, {
            params: params
        });
    },

    //导入日历
    exportToCalendar(eventCode,params) {
        return axios.get(base.baseUrl + `/${eventCode}/final/export`, null, {
            params: params,
            responseType: 'blob'
        });
    }
}

export default event;