<template>
 <div id="box">
   <page-tab-bar></page-tab-bar>
   <div class="base">
    

     <!-- 复制链接 -->
     <div class="copyLink">
        
            <span>将以下链接分享给TA</span>
            
            <div class="form">
             <div class="link">
              <span class="url" @click="link()">{{ eventChoose }}</span>
             </div>
              <br>
              <el-button class="btnCopy"
                         v-clipboard:copy="eventChoose"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError"
                         type="primary"
              >
              复制链接
              </el-button>
            </div>


     </div>

   </div>
 </div>
</template>
<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
export default {
    name: 'CopyLink',
    components: {
        PageTabBar
    },
    data(){
        return{
          eventChoose: 'http://zk123.top:8888/choose/' + this.$route.params.eventCode,
        }
    },
    mounted(){
      //this.copyBtn = new this.clipboard(this.$refs.copy+'');
    },
    methods: {
      onCopy: function (e) {
        alert('成功复制: ' + e.text)
      },
      onError: function (e) {
        alert('复制失败')
      },

      link(){
            this.$router.push({ name: 'choose', params: { eventCode: this.$route.params.eventCode}});
      },
    }
}
</script>

<style scoped>
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

.copyLink{
  position: absolute;
  top: 180px;
  left: 330px;
  border: solid 1px #40A9FF;
  width: 500px;
  height: 200px;
  text-align: center;
  padding: 100px 50px 60px 50px;
  
}

.form{
  
  margin-top: 20px;
}

.url{
  margin-top: 20px;
  color: #69c0ff;
  cursor: pointer;
}

.link :hover{
  text-decoration: underline #69c0ff;
}

.btnCopy{
  margin-top: 50px;
}

 
</style>