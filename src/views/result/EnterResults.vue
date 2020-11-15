<template>
    <div id="result-code">
      <page-tab-bar/>
      <div class="card-wrapper">
        <el-card class="code-card">
           <span class="iconfont icon-sousuojieguo"></span>
           <span class="title">请输入您的结果码</span>
           <el-form :model="codeForm" :rules="rules" ref="codeForm" class="code-form">
             <el-form-item prop="code">
                 <el-input v-model="codeForm.code" maxlength="7"></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="onSubmit('codeForm')">确定</el-button>
             </el-form-item>
           </el-form>
        </el-card>
      </div>
    </div>
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'

export default {
    name: 'EnterResults',
    components: {
        PageTabBar
    },
    data() {
        return {
            codeForm: {
                code: ''
            },
            rules: {
                code: [
                    { required: true, message: '请输入结果码', trigger: 'blur' },
                    { min: 7, message: '结果码格式错误', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        onSubmit(codeForm) {
           var rCode;
            this.$refs[codeForm].validate((valid) => {
                if (valid) {
                    this.$api.event.verifyResultCode({
                        hostCode: this.codeForm.code
                    }).then(res => {
                        rCode = res.data.code
                        // 验证验证码是否正确
                        if(res.data.code === 200) {
                            // TODO: 设置动态路由
                            this.$router.push({ name: 'result', params: { eventCode: res.data.data.eventCode, hostCode: this.codeForm.code }})
                        } else {
                            // 结果码错误
                            this.$alert('结果码错误！', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                }
            })
        }
    },
}
</script>

<style scope>
.card-wrapper {
    margin-top: 200px;
}

.code-card {
    width: 600px;
    margin: 0 auto;
}

.icon-sousuojieguo {
    color: #409EFF;
    font-weight: bold;
    display: block;
    font-size: 50px;
    text-align: center;
    margin-top: 20px;
}

.code-card .title {
    font-weight: bold;
    font-size: 25px;
    display: block;
    text-align: center;
    margin-top: 20px;
}

.code-form {
    width: 300px;
    margin: 50px auto;
    text-align: center;
}

.code-form .el-button {
    margin-top: 20px;
}

</style>