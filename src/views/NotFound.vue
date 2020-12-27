<template>
    <div class="NotFound">
      <div class="base">
        <img src="../assets/img/background.png" alt="" class="background">
        <div class="logo_wrapper">
          <span class="web_name" @click="itemClick('home')">When2Meet</span>
          <span class="help" @click="itemClick('faqs')">帮助</span>
          <span class="contact">联系我们</span>
        </div>

        <div class="title animate__animated animate__swing">404</div>

        <div class="back_arrow">
          <img src="../assets/img/arrow.png" alt="" class="arrow">
        </div>

        <div class="back_home">
          <span @click="itemClick('home')">返回主页</span>
        </div>

        <div class="sorry">
          <span>非常抱歉，</span>
          <span>您要访问的页面可能走丢了...</span>
        </div>

        <div class="pic_calendar_wrapper animate__animated animate__fadeInTopRight" >
          <img src="../assets/img/pic_calendar.png" alt="" class="pic_calendar">
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'NotFound',
  components: {
    
  },
  methods: {
    itemClick (path) {
      this.$router.push(path);
    },
  }
}
</script>

<style scoped>
.NotFound {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: linear-gradient(to right, #92d5ff, white);
}

.base {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

.background {
  position: absolute;
  left: -300px;
}

.logo_wrapper {
  position: absolute;
  left: 250px;
  top: 100px;
  width: 800px;
  height: 100px;
  
}

.web_name{
  font-size: 33px;
  color: #298FEC;
  font-weight: bold;
  margin-right: 130px;
}

.help{
  font-size: 25px;
  color: #6fb1ee;
  margin-right: 230px;
}

.contact {
  font-size: 25px;
  color: #6fb1ee;
}

.title {
  position: absolute;
  top: 300px;
  left: 250px;
  font-size: 100px;
  color: #002d70;
  font-weight: bold;
  letter-spacing: 6px;
}

.back_arrow{
  position: absolute;
  top: 550px;
  left: 250px;
}

.arrow{
  margin-right: 50px;
  width: 25px;
  height: 25px;
}

.back_home {
  position: absolute;
  top: 555px;
  left: 390px;
  font-size: 18px;
  color: #298FEC;
  cursor: pointer;
}

.back_home >>> :hover{
  font-size: 18px;
  color: #002d70;
  
}

.sorry{
  position: absolute;
  top: 480px;
  left: 250px;
  font-size: 18px;
  color: #002d70;
}

.pic_calendar_wrapper {
  position: absolute;
  top: 280px;
  left: 700px;

}

.pic_calendar{
  width: 150px;
  height: 150px;
}
</style>