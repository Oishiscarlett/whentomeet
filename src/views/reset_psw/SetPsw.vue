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
              <span class="phone-number">13712345678</span>
              <router-link to='/resetpsw/verify'>修改</router-link>
            </div>
            <el-form-item label="验证码:" prop="phoneValidation" >
              <el-input  v-model.trim="passwordForm.phoneValidation" placeholder="请输入手机验证码" maxlength="6"></el-input>
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
        phoneValidation: ''
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
        passwordForm: {
          pass: '',
          checkPass: '',
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
          phoneValidation: [
            { required: true, message: '请输入手机验证码', trigger: 'blur' },
        ],
        }
      };
    },
    methods: {
      submitForm(passwordForm) {
        this.$refs[passwordForm].validate((valid) => {
          if (valid) {
            this.$router.push('/resetpsw/success');
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
  margin-left: 15px;
}
</style>