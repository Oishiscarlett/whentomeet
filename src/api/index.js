/** 
 * api接口的统一出口
 */

// 登录模块接口
import login from '@/api/login';
// 个人信息模块接口
import userinfo from '@/api/userinfo';


// 导出接口
export default {    
    login,
    userinfo
}