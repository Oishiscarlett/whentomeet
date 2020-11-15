<template>
    <div id="box">
        <page-tab-bar></page-tab-bar>
        <div class="base">
            <img class="logo" src="@/assets/img/success.png" alt="">
            <p class="finish"><span>提交成功！</span></p>
            <p class="link-tips">
                <span>您可以点击下列链接修改您的选择</span>
            </p>
            <p class="link">
                <span @click="link()">http://localhost:8080/{{ eventCode }}/update/{{ idCode }}</span>
               <!-- <router-link to="{ name: 'update', params: { eventCode: 'ipia2cn',idCode: 'pgadf27a' }}">http://localhost:8080/{{ eventCode }}/update/{{ idCode }}</router-link> -->       
            </p>
            <p class="p1">
                <span>您可以<span class="login" @click="itemClick('/login')">登录</span>保存您的事件</span>
            </p>
            <p class="p2">
                <span>或<span class="sendToPhone" type="text" @click="dialogFormVisible = true">发送到手机</span>以保存您的事件</span>
            </p>

            <el-dialog title="发送到手机" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules">
                    <el-form-item label="请填写手机号码" :label-width="formLabelWidth" prop="phoneNumber">
                    <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
                    </el-form-item>
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">发送</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
export default {
    name: 'Success',
    components: {
        PageTabBar
    },
    data(){
        var checkPhoneNumber = (rule, value, callback) => {
            const regPhone = /[0-9]{11}/;
            if (regPhone.test(value)) {
                //合法
                return callback();
            }
            callback(new Error("请输入正确的手机号码"));
        };
        return{
            eventCode: this.$route.params.eventCode,
            idCode: this.$route.params.idCode,
            dialogFormVisible: false,
            form: {
                phoneNumber: '',
                type:[],

            },
            formLabelWidth: '140px',
            rules: {
                phoneNumber: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { validator: checkPhoneNumber, trigger: "blur" },
                ],
            },
        }

    },
    methods: {
        link(){
            this.$router.push({ name: 'update', params: { eventCode: 'ipia2cn',idCode: 'pgadf27a' }});
        },
        itemClick(path){
            this.$router.push(path);
        }
    }
}
</script>

<style lang="less" scoped>
#box{
    width: 100%;
    height: 100%;
    /* position: fixed; */
    top: 0px;
    bottom: 0px;
    /* overflow: scroll; */
}

.base{
  width: 1200px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.logo{
    position: absolute;
    left: 570px;
    top: 200px;
    width: 50px;
    height: 50px;
}

.finish{
    position: absolute;
    left: 540px;
    top: 280px;
    width: 200px;
    height: 50px;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 5px;
}

.link-tips {
    position: absolute;
    left: 480px;
    top: 350px;
    color: #69c0ff;
}

.link{
    position: absolute;
    left: 410px;
    top: 400px;
    width: 100px;
    height: 50px;
    color: #69c0ff;
    cursor: pointer;
}

.link :hover{
    text-decoration: underline #69c0ff;
}

.p1{
    position: absolute;
    left: 500px;
    top: 450px;
    width: 300px;
    height: 50px;
    letter-spacing: 3px;
}

.login{
    color: #69c0ff;
    cursor: pointer;
}

.p2{
    position: absolute;
    left: 480px;
    top: 500px;
    width: 300px;
    height: 50px;
    letter-spacing: 3px;
}

.sendToPhone{
    color: #69c0ff;
    cursor: pointer;
}


</style>