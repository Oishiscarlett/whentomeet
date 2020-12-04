<template>
    <div id="share-links">
      <page-tab-bar/>
      <div class="card-wrapper">
          <div class="code-card-wrapper">
            <el-card class="code-card">
              <div class="code-card-title">注意</div>
              <div class="code-card-content">
                <div class="code-card-tips">
                  <span>请保存你的事件密钥</span>
                  <span>没有该密钥</span>
                  <span>你将无法查看事件的结果</span>
                </div>
                <div class="code-card-code">
                  <span>{{ hostCode }}</span>
                  <el-button class="copy-btn"
                        v-clipboard:copy="hostCode"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制</el-button>
                </div>
                <div class="code-card-phone">
                  <el-checkbox class="code-card-phone-tips" v-model="codeChecked">将密钥发送至您的手机</el-checkbox>
                  <div class="code-phone-form" v-if="codeChecked">
                      <el-form ref="codePhoneForm" size="medium" label-position="right" :model="codePhoneForm" :rules="rules" label-width="100px">
                      <el-form-item label="手机号码" prop="codePhone" >
                        <el-input  v-model.trim="codePhoneForm.codePhone" placeholder="请输入手机号码" maxlength=11></el-input>
                      </el-form-item>
                      <el-button class="phone-btn">发送</el-button>
                      </el-form>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <div class="links-card-wrapper">
            <el-card class="links-card">
              <div class="links-card-contents-wrapper">
                <div class="links-card-contents">
                  <div class="links-card-titles">
                    <span>邀请链接</span>
                  </div>
                  <div class="links-card-links">
                    <span class="url" @click="share()">{{ shareLink }}</span>
                    <br>
                    <el-button class="copy-btn"
                        v-clipboard:copy="shareLink"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制</el-button>
                  </div>
                </div>
                <div class="links-card-contents">
                  <div class="links-card-titles">
                    <span>查看事件结果链接</span>
                  </div>
                  <div class="links-card-links">
                    <span class="url" @click="result()">{{ resultLink }}</span>
                    <br>
                    <!-- <a href="">{{ resultLink }}</a> -->
                    <el-button class="copy-btn"
                        v-clipboard:copy="resultLink"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制</el-button>
                  </div>
                </div>
                <div class="links-card-contents">
                  <div class="links-card-titles">
                    <span>重新编辑事件链接</span>
                  </div>
                  <div class="links-card-links">
                    <span class="url" @click="edit()">{{ editLink }}</span>
                    <br>
                    <!-- <a href="">{{ reeditLink }}</a> -->
                    <el-button class="copy-btn"
                        v-clipboard:copy="editLink"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
      </div>
      <div class="btn-wrapper"> 
        <el-button class="finish-btn" type="primary" @click="toHome">完成</el-button>
      </div>
    </div>
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
export default {
    name: "ShareLinks",
    components: {
        PageTabBar
    },
    data() {
        return {
            codeChecked: false,
            eventCode: this.$route.params.eventCode,
            hostCode: this.$route.params.hostCode,
            shareLink: 'http://localhost:8080/choose/' + this.$route.params.eventCode,
            resultLink: 'http://localhost:8080/' + this.$route.params.eventCode + '/result/' + this.$route.params.hostCode,
            editLink: 'http://localhost:8080/' + this.$route.params.eventCode + '/edit/' + this.$route.params.hostCode,
            codePhoneForm: {
                codePhone: ''
            },
            rules: {
                codePhone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        toHome() {
            this.$router.push("/home");
        },
        onCopy: function (e) {
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        },
        onError: function (e) {
            this.$message.error('复制失败');
        },
        share(){
            let routeData = this.$router.resolve({ name: 'choose', params: { eventCode: this.$route.params.eventCode}});
            window.open(routeData.href, '_blank')
        },
        result(){
            let routeData = this.$router.resolve({ name: 'result', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode}});
            window.open(routeData.href, '_blank')
        },
        edit(){
            let routeData = this.$router.resolve({ name: 'edit', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode}});
            window.open(routeData.href, '_blank')
        },
    }
}
</script>

<style scoped>
.card-wrapper {
    margin: 50px 100px;
    padding: 70px 100px 0 100px;
    height: 100%;
    display: flex;
}
.btn-wrapper {
    text-align: center;
}
.btn-wrapper .finish-btn {
  width: 150px;
  font-weight: bold;
}
.el-card {
  height: 500px;
}
.code-card-wrapper {
    text-align: center;
    flex: 1;
}
.code-card-title {
    font-size: 30px;
    font-weight: bold;
    margin: 30px;
}
.code-card-content {
    width: 300px;
    margin: 30px auto;
}
.code-card-tips span {
    display: block;
    line-height: 25px;
}
.code-card-phone a {
    text-decoration: none;
    color: #409EFF;
}
.code-card-code {
    margin: 30px auto;
    width: 200px;
}
.code-card-code span {
    display: block;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
}
.copy-btn {
    margin-top: 10px;
    width: 50px;
    padding: 5px;
}
.code-card-phone-tips {
    display: block;
    line-height: 25px;
}
.code-phone-form {
    margin-top: 20px;
}
.code-phone-form .phone-btn {
    margin-top: 5px;
    width: 100px;
}
.links-card-wrapper {
    margin-left: 100px;
    flex: 1;
}
.links-card-contents-wrapper {
    width: 400px;
    margin: 20px auto;
    text-align: center;
}
.links-card-contents {
    margin: 30px 0;
}
.links-card-titles {
    font-size: 18px;
    font-weight: bold;
}
.url{
  color: #69c0ff;
  cursor: pointer;
  display: block;
  margin-top: 30px;
  text-decoration: none; 
}
</style>