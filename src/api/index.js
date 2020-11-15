/** 
 * api接口的统一出口
 */

// 登录模块接口
import login from '@/api/login';
// 个人信息模块接口
import userinfo from '@/api/userinfo';
// 验证码模块接口
import verifycode from '@/api/verifycode';
// 事件模块接口
import event from '@/api/event';

import event from '@/api/event';


// 导出接口
export default {    
    login,
    userinfo,
    verifycode,
    event
}