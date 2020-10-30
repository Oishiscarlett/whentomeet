<template>
    <div id="reset-psw-verify">
      <page-tab-bar/>
      <reset-psw :process='process'>
        <div class="form-box">
          <el-form :model="phoneForm" status-icon :rules="rules" ref="phoneForm" label-width="100px" class="phone-form">
            <el-form-item label="手机号码:" prop="phone" >
              <el-input v-model.trim="phoneForm.phone" placeholder="请输入手机号码" maxlength=11></el-input>
            </el-form-item>
            <div class="submit-wrapper">
              <el-button type="primary" @click="submitForm('phoneForm')">确认</el-button>
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
    name: 'ResetPswVerify',
    components: {
        PageTabBar,
        ResetPsw
    },
    data() {
      return {
        process: 1,
        phoneForm: {
          phone: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields(); //消除表单验证提示 + 初始化表单数据
      },
      submitForm(phoneForm) {
        this.$refs[phoneForm].validate((valid) => {
          if (valid) {
            this.$api.verifycode.sendPhoneVerifyCode({
              phoneNumber: this.phoneForm.phone
            }).then(res => {
              // 成功发送短信
              if(res.data.code === 200){
                localStorage.setItem('phone',this.phoneForm.phone)
                this.$router.push('/resetpsw/password');
              }else if(res.data.code === 2013){
                // 用户尚未登录，提示登录并跳转登录页面
                this.$alert('请先登录！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.resetForm(phoneForm);
                    this.$router.push({path:'/login'});
                  }
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style scoped>
.el-input >>> .el-icon-circle-check {
  color: #298FEC;
}

.form-box {
    width: 400px;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
}

.submit-wrapper .el-button {
  margin-top: 40px;
  width: 100px;
}
</style>