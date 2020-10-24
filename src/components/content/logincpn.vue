<template>
  <div>
    <!-- 框 -->
    <div class="base">

    <!-- 账号密码登录 -->
    <div class="title1" style="cursor: pointer" @click="cur = 0" :class="{ active: cur == 0 }">
      <div class="text">
        <p>
          <span>账号密码登录</span>
        </p>
      </div>
    </div>

    <!-- 免密码登录 -->
    <div class="title2" style="cursor: pointer" @click="cur = 1" :class="{ active: cur == 1 }">
      <div class="text">
        <p>
          <span>免密码登录/注册</span>
        </p>
      </div>
    </div>

    <!-- 账号密码登录框 -->
    <div class="loginWithPwd" v-show="cur == 0">
      <el-form
        ref="loginWithPwdForm"
        :model="loginWithPwdForm"
        :rules="loginWithPwdRules"
      >
        <!-- ref为表单的实例对象 -->
        <el-form-item
          class="phone_email"
          label="手机号/邮箱"
          prop="phoneOrEmail"
        >
          <el-input
            placeholder="请输入手机号码或邮箱"
            class="p_e_input"
            v-model.trim="loginWithPwdForm.phoneOrEmail"
          ></el-input>
        </el-form-item>

        <el-form-item class="pwd" label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            class="pwd_input"
            type="password"
            v-model.trim="loginWithPwdForm.password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="btn_login"
            type="primary"
            @click="submitForm('loginWithPwdForm')"
            style="font-size: 30px"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 忘记密码 -->
      <div class="pwd_forgot" style="cursor: pointer">
        <div class="text">
          <p @click="itemClick('/resetpsw')">忘记密码?</p>
        </div>
      </div>
    </div>

    <!-- 免密码登录框 -->
    <div class="register" v-show="cur == 1">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
        <el-form-item class="phoneNumber" label="手机号" prop="phoneNumber">
          <el-input
            placeholder="请输入手机号码"
            class="phoneNumberInput"
            v-model="registerForm.phoneNumber"
          ></el-input>
        </el-form-item>

        <el-form-item class="vCode" label="验证码" prop="vCode">
          <el-input
            placeholder="请输入验证码"
            class="vCodeInput"
            v-model="registerForm.vCode"
          >
            <el-button
              class="getVCode"
              type="primary"
              slot="append"
              v-if="setVCode"
              @click="getVCode"
              >{{ setVCode }}</el-button
            >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="btn_register"
            type="primary"
            @click="register('registerForm')"
            style="font-size: 30px"
            >注册/登录</el-button
          >
        </el-form-item>
      </el-form>

      <div class="tip">
        <p>
          <span> 未注册手机验证后自动登录 </span>
        </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginCpn",
  data() {
    var checkPhoneOrEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      const regPhone = /[0-9]{11}/;
      if (value.indexOf("@") > 0) {
        if (regEmail.test(value)) {
          //合法
          return callback();
        }
        callback(new Error("请输入正确的邮箱地址"));
      } else if (regPhone.test(value)) {
        //合法
        return callback();
      }
      callback(new Error("请输入正确的手机号码"));
    };

    var checkPhoneNumber = (rule, value, callback) => {
      const regPhone = /[0-9]{11}/;
      if (regPhone.test(value)) {
        //合法
        return callback();
      }
      callback(new Error("请输入正确的手机号码"));
    };

    return {
      //当前展示表单
      cur: 0,
      setVCode: "获取短信验证码",
      //表单数据绑定对象
      loginWithPwdForm: {
        phoneOrEmail: "",
        password: "",
      },
      registerForm: {
        phoneNumber: "",
        vCode: "",
      },

      //表单验证规则对象
      loginWithPwdRules: {
        phoneOrEmail: [
          { required: true, message: "请输入手机号或邮箱", trigger: "blur" },
          { validator: checkPhoneOrEmail, trigger: "blur" },
        ],

        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },

      registerRules: {
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhoneNumber, trigger: "blur" },
        ],

        vCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //忘记密码跳转
    itemClick(path) {
      this.$router.push(path);
    },

    // 获取短信验证码
    getVCode() {
      var regPhone = /[0-9]{11}/;
      if (regPhone.test(this.registerForm.phoneNumber)) {
        this.validateBtn();
        this.$api.verifycode.sendPhoneVerifyCode({
          phoneNumber:this.registerForm.phoneNumber
        }).then(res => {
          //console.log(res.data)
          if(res.data.code == 200){
            this.registerForm.vCode = res.data.data
          }else{
            alert('获取验证码失败!')
          }
        }).catch(error => {
            console.log(error);
        });
      }
      
    },

    //短信验证码倒计时
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.setVCode = "获取短信验证码";
        } else {
          this.setVCode = time + "秒后重新获取";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },

    //获取输入框的内容
    getInput(str){
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      const regPhone = /[0-9]{11}/;
      str = this.loginWithPwdForm.phoneOrEmail
     if(regEmail.test(str)){
        return true;
      } else {
        return false;
      }
    },    

    //账号密码登录
    submitForm(loginWithPwdForm) {
      this.$refs[loginWithPwdForm].validate((valid) => {
        if (valid) {
          if(this.getInput(this.loginWithPwdForm.phoneOrEmail)){
            this.$api.login.loginByEmail( {
              
                email: this.loginWithPwdForm.phoneOrEmail, // 登录名
                password: this.loginWithPwdForm.password, // 登录密码
              
            })
            .then(res => {
              //console.log(res.data)
              if (res.data.code == 200) {
                this.$router.push('/home');
                //alert('登陆成功');
              }else{
                alert('登录失败')
              }
            }).catch(error => {
              //alert('账号或密码错误');
              console.log(error);
            });
          } else {
            this.$api.login.loginByPhone( {
              
                phoneNumber: this.loginWithPwdForm.phoneOrEmail, // 登录名
                password: this.loginWithPwdForm.password, // 登录密码
              
            })
            .then(res => {
              //console.log(res.data)
              if (res.data.code == 200) {
                this.$router.push('/home');
                //alert('登录成功');
              }else{
                alert('登录失败')
              }
            }).catch(error => {
              //alert('登录失败！');
              console.log(error);
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    register(registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if(valid){
          this.$api.verifycode.verifyPhoneAndCode({
            phoneNumber: this.registerForm.phoneNumber,
            verifyCode: this.registerForm.vCode
          }).then(res => {
              console.log(res.data)
              if (res.data.code == 200) {
                this.$router.push('/home');
              }else{
                alert('请求失败')
              }
          }).catch(error => {
             //alert('请求失败！');
             console.log(error);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less">
.base {
  border-width: 0px;
  position: relative;
  //left: 400px;
  //top: 130px;
  width: 750px;
  height: 600px;
  display: flex;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  margin: 180px auto
}

.title1 {
  border-width: 0px;
  position: absolute;
  //left: 450px;
  //top: 150px;
  margin: 20px 0px 0px 20px;
  width: 310px;
  height: 63px;
  /*  background: inherit;
  background-color: rgba(255, 255, 255, 1); */
  box-sizing: border-box;
  /* border-bottom-width: 6px;
  border-style: solid;
  border-color: rgba(9, 109, 217, 1); */
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  text-align: center;
}

.title1 .text {
  position: absolute;
  text-align: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}

.title1 .text p {
  margin: 5px;
  //text-rendering: optimizeLegibility;
  //font-feature-settings: "kern" 1;
  //-webkit-font-feature-settings: "kern";
  //-moz-font-feature-settings: "kern";
  //-moz-font-feature-settings: "kern=1";
  //font-kerning: normal;
  color: #333333;
}

.title2 {
  border-width: 0px;
  position: absolute;
  //left: 790px;
  //top: 150px;
  margin: 20px 0px 0px 400px;
  width: 310px;
  height: 63px;
  box-sizing: border-box;
  //border-bottom-width: 6px;
  /*  border-style: solid;
  border-color: rgba(9, 109, 217, 1); */
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 30px;
  text-align: center;
}

.title2 .text {
  position: absolute;
  text-align: center;
  padding: 2px 2px 2px 2px;
  box-sizing: border-box;
  width: 100%;
}

.title2 .text p {
  margin: 5px;
  color: #333333;
}

.active {
  border-bottom-width: 6px;
  border-style: solid;
  border-color: rgba(9, 109, 217, 1);
}

.SocialAccountsLogin {
  border-width: 0px;
  position: absolute;
  left: 600px;
  top: 820px;
  width: 170px;
  height: 30px;
  display: flex;
  font-family: "Arial Normal", "Arial";
  font-weight: 500;
  font-style: normal;
  font-size: 26px;
  letter-spacing: 2px;
  color: rgba(85, 85, 85, 0.596078431372549);
}

.WechatLogo {
  border-width: 0px;
  position: absolute;
  left: 825px;
  top: 825px;
  width: 34px;
  height: 34px;
  display: flex;
}

.wechat {
  border-width: 0px;
  position: absolute;
  left: 870px;
  top: 830px;
  width: 170px;
  height: 30px;
  display: flex;
  font-family: "Arial Normal", "Arial";
  font-weight: 500;
  font-style: normal;
  font-size: 20px;
  letter-spacing: 2px;
  color: rgba(85, 85, 85, 0.596078431372549);
}

.loginWithPwd,
.register {
  border-width: 0px;
  position: absolute;
  //left: 450px;
  //top: 250px;
  margin: 100px 0px 0px 45px;
  width: 794px;
  height: 467px;
  display: flex;
}

.phone_email,
.phoneNumber {
  position: absolute;
  left: 23px;
  top: 47px;
  width: 190px;
  height: 34px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  font-size: 25px;
  text-align: center;
}

.p_e_input,
.phoneNumberInput {
  position: absolute;
  left: 200px;
  top: 0px;
  width: 400px;
  height: 73px;
}

.p_e_input .el-input__inner,
.phoneNumberInput .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 400px;
}

.phone_email .el-form-item__error,
.phoneNumber .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 50px;
  left: 190px;
  width: 150px;
}

.pwd,
.vCode {
  position: absolute;
  left: 23px;
  top: 190px;
  width: 120px;
  height: 34px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  font-size: 30px;
  text-align: center;
}

.phone_email .el-form-item__label,
.pwd .el-form-item__label,
.phoneNumber .el-form-item__label,
.vCode .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 25px;
  color: #333333;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}

.pwd_input,
.vCodeInput {
  position: absolute;
  left: 200px;
  top: 0px;
  width: 400px;
  height: 73px;
}

.pwd_input .el-input__inner,
.vCodeInput .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 400px;
}

.pwd .el-form-item__error,
.vCode .el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 50px;
  left: 166px;
  width: 150px;
}

.el-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  height: 40px;
  border-collapse: separate;
  border-spacing: 0;
}

.el-input-group__append,
.el-input-group__prepend {
  left: -142px;
}

.btn_login,
.btn_register {
  position: absolute;
  left: 180px;
  top: 350px;
  width: 300px;
  height: 50px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  font-size: 25px;
  text-align: center;
}

.pwd_forgot {
  border-width: 0px;
  position: absolute;
  left: 550px;
  top: 280px;
  width: 125px;
  height: 21px;
  display: flex;
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-style: normal;
  color: #515050;
  text-decoration: none;
}

.tip {
  border-width: 0px;
  position: absolute;
  left: 250px;
  top: 320px;
  width: 200px;
  height: 21px;
  display: flex;
  font-family: "Arial Normal", "Arial";
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  color: #606266;
  text-decoration: none;
}
</style>