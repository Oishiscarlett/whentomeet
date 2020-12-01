<template>
 <div id="box">
   <page-tab-bar></page-tab-bar>
   <div class="base">
    

    


    

   </div>
 </div>
</template>
<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
export default {
    name: 'SendRequest',
    components: {
        PageTabBar
    },
    data(){
        return{
          
        }
    },
    mounted(){
      //this.copyBtn = new this.clipboard(this.$refs.copy+'');
    },
    methods: {
     
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



 
</style>