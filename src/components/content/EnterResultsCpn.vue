<template>
  <div id="box">
   <div class="base">
    

     <div class="EnterResults">
      <el-form
        ref="resultsCodeForm"
        :model="resultsCodeForm"
        
      >

        <el-form-item class="resultsCode" label="请输入结果码" prop="resultsCode">
          <el-input
            
            class="code_input"
            
            v-model.trim="resultsCodeForm.resultsCode"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="btn_enter"
            type="primary"
            @click="enter('resultsCodeForm')"
            style="font-size: 30px"
            >查看</el-button
          >
        </el-form-item>
      </el-form>
      
    </div>

   </div>
 </div>
</template>

<script>
export default {
    name: 'EnterResultsCpn',
    data() {
      return {
        resultsCodeForm: {
            resultsCode: ""
        }
      }
    },
    methods: {
     enter(resultsCodeForm) {
       var eventCodeFrom;
       var rCode;
     /*  this.$router.push({ name: 'result', params: { eventCode: 'ipia2cn',hostCode: 'e7sg8t4' }}); */
      this.$refs[resultsCodeForm].validate((valid) => {
        if (valid) {
            this.$api.event.verifyResultCode({
                hostCode: this.resultsCodeForm.resultsCode
            }).then(res => {
              rCode = res.data.code
              eventCodeFrom = res.data.data.eventCode
              console.log(res.data)
              if (res.data.code == 200) {
                this.$router.push({ name: 'result', params: { eventCode: eventCodeFrom, hostCode: this.resultsCodeForm.resultsCode }});
              }else{
                alert('请求失败')
              }
            }).catch(error => {
              console.log(error);
            });
            
        }else {
          console.log("error submit!!");
          return false;
        }

        
      
      });
     },
    }
};
</script>

<style lang="less">
#box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    bottom: 0px;
    overflow: scroll;
}

.base{
  width: 1200px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.EnterResults{
    position: absolute;
    left: 300px;
    top: 300px;
}
</style>