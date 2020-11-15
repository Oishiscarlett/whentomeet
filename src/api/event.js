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
<<<<<<< HEAD
    getEvent(params) {
        return axios.post(base.baseUrl + `/${eventCode}`, null, {
=======
    //提交参与者选择的时间与填写的信息
    //attendEvent
    attendEvent(eventCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/`, null, {
>>>>>>> 95e71ba98592bfb6908bc1f5a64e56a616ebd05e
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
<<<<<<< HEAD
    getResultByCode(params) {
        return axios.post(base.baseUrl + `/eventinfo/${hostCode}`, null, {
=======
    //参与者填写页面日历渲染
    getResultByCode(eventCode,params) {
        return axios.post(base.baseUrl + `/eventinfo/${eventCode}`, null, {
>>>>>>> 95e71ba98592bfb6908bc1f5a64e56a616ebd05e
            params: params
        });
    },
    // 提交最终时间
<<<<<<< HEAD
    selectFinalTime(params) {
        return axios.post(base.baseUrl + `${eventCode}/final/${hostCode}`, null, {
=======
    selectFinalTime(eventCode,hostCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/final/${hostCode}`, null, {
>>>>>>> 95e71ba98592bfb6908bc1f5a64e56a616ebd05e
            params: params
        });
    },

    /**
     *  最终结果页面相关
     */
    // 获取最终结果
<<<<<<< HEAD
    getFinalResult(params) {
        return axios.post(base.baseUrl + `${eventCode}/result/${hostCode}`, null, {
=======
    getFinalResult(eventCode,hostCode,params) {
        return axios.post(base.baseUrl + `/${eventCode}/result/${hostCode}`, null, {
>>>>>>> 95e71ba98592bfb6908bc1f5a64e56a616ebd05e
            params: params
        });
    }   
}

export default event;