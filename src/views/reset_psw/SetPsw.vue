<template>
    <div id="reset-psw">
      <page-tab-bar/>
      <reset-psw :process='process'>
        <div class="form-box">
          <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px" class="phone-form">
            <el-form-item label="密码:" prop="pass">
              <el-input type="password" v-model.trim="passwordForm.pass" autocomplete="off" placeholder="请输入包含6-16位数字或字母的密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
              <el-input type="password" v-model.trim="passwordForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <div class="phone-number-wrapper">
              <span class="phone-label">手机号码:</span>
              <span class="phone-number">{{ phone }}</span>
              <router-link to='/resetpsw/verify'>修改</router-link>
            </div>
            <el-form-item class="verifycode" label="验证码:" prop="phoneVerifyCode" >
              <el-input  v-model.trim="passwordForm.phoneVerifyCode" placeholder="请输入手机验证码" maxlength="6"></el-input>
              <el-button type="primary" @click="getCode" class="getcode" v-show="show">获取验证码</el-button>
              <el-button type="primary" class="regetcode" v-show="!show" disabled="disabled">{{count}}秒后获取</el-button>
            </el-form-item>
            <div class="submit-wrapper">
              <el-button type="primary" @click="submitForm('passwordForm')">确认</el-button>
            </div>
          </el-form>
        </div>
      </reset-psw>
    </div>
</template>

<script>
import PageTabBar from 'components/content/tabbar/PageTabBar'
import ResetPsw from 'components/common/reset_psw/ResetPsw'

export default {
    name: 'SetPsw',
    components: {
        PageTabBar,
        ResetPsw,
        phoneVerifyCode: ''
    },
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value !== this.passwordForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        process: 2,
        phone: '',
        count: '',
        timer: null,
        show: true,
        passwordForm: {
          pass: '',
          checkPass: '',
          phoneVerifyCode: ''
        },
        rules: {
          pass: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { pattern: /^[0-9A-Za-z]{6,16}$/, message: '请输入包含6-16位数字或字母的密码', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          phoneVerifyCode: [
            { required: true, message: '请输入手机验证码', trigger: 'blur' },
        ],
        }
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields(); //消除表单验证提示 + 初始化表单数据
      },
      openAlert(message,title,formName){
        this.$alert(message, title, {
          confirmButtonText: '确定',
          callback: action => {
            this.resetForm(formName);
          }
        });
      },
      submitForm(passwordForm) {
        this.$refs[passwordForm].validate((valid) => {
          if (valid) {
            // 发送手机号和验证码给后端
            this.$api.verifycode.verifyPhoneAndCode({
              phoneNumber: this.phone,
              verifyCode: this.passwordForm.phoneVerifyCode
            }).then(res => {
              // 验证码正确
              if(res.data.code === 200){
                // 发送新设置的密码给后端
                this.$api.userinfo.resetPsw({
                  password: this.passwordForm.pass
                }).then(res => {
                  console.log(res.data);
                  // 重置成功，页面跳转
                  if (res.data.code === 200){
                    this.$router.push('/resetpsw/success');
                  }else if(res.data.code === 2015){
                    // 新密码与旧密码一致
                    this.openAlert('新密码必须与旧密码不一样！','提示',passwordForm);
                  }
                })
              }else if(res.data.code === 2004){
                // 验证码错误
                this.openAlert('验证码错误！','提示',passwordForm);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCode() {
        const num = 60;
        if (!this.timer) {
          this.count = num;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= num) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    mounted() {
      this.phone = localStorage.getItem('phone');
    }
}
</script>

<style scoped>
.el-input >>> .el-icon-circle-check {
  color: #298FEC;
}

.form-box {
    width: 400px;
    height: 60%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 20px;
}

.submit-wrapper .el-button {
  margin-top: 20px;
  width: 100px;
}

.phone-number-wrapper {
  width: 400px;
  height: 20px;
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #606266;
}

.phone-number-wrapper a {
  text-decoration: none;
  color: #298FEC;
  margin-left: 150px;
}

.phone-number {
  margin-left: 5px;
  display:-moz-inline-box; 
  display:inline-block; 
  width: 100px;
  height: 10px;
}

.verifycode  >>> .el-input{
  width: 180px;
  margin-right: 10px;
}

.getcode {
  width: 110px;
}

.regetcode {
  width: 110px;
  margin: 0;
}

</style>