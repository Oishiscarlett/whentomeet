<template>
    <div id="home">
      <home-tab-bar/>
      <div class="home-wrapper">
        <div class="img-wrapper">
          <img src="../assets/img/home.jpg">
        </div>
        <div class="intro-wrapper">
          <ul>
            <li>定个时间吧</li>
            <li>开会</li>
            <li>聚会</li>
          </ul>
        </div>
        <div class="btn-wrapper">
          <el-button @click="itemClick('/create')" round>创建事件</el-button>
          <el-button @click="itemClick('/rusult')" round>查看结果</el-button>
        </div>
        <div class="help-wrapper">
          <ul class="help-info">
            <li>单击选择您有空的时间，您将获得一个链接以发送给共同参与此次事件的其他人</li>
            <li>他们会看到您选择的时间与其他参与者选择的时间（如果选择被公开）</li>
            <li>您可以访问结果页面并最终决定该事件的执行时间</li>
          </ul>
          <div class="help-more">
            <span>
              更多内容请点击
              <router-link to='/help'>帮助</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import HomeTabBar from '@/components/content/tabbar/HomeTabBar'

export default {
  name: 'Home',
  components: {
    HomeTabBar
  },
  methods: {
    itemClick (path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
#home{
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: linear-gradient(to right, #92d5ff, white);
}

.home-wrapper {
  height: 100%;
  width: 1200px;
  margin: 0 auto;

  position: relative;
}

.intro-wrapper {
  position: absolute;
  top: 160px;
  left: 80px;

  color: white;
  font-size: 80px;
  font-weight: bold;
}

.intro-wrapper li {
  height: 110px;
}

.img-wrapper {
  width: 500px;
  position: absolute;
  top: 280px;
  left: 260px;
}

.img-wrapper img {
  max-width: 100%;
  height: auto;
}

.btn-wrapper{
    position: absolute;
    top: 180px;
    right: 130px;
}

.btn-wrapper .el-button{
    margin: 0 10px;

    font-size: 25px;
    color: white;
    background-color: rgb(2, 81, 180);
}

.help-wrapper {
  position: absolute;
  top: 280px;
  left: 800px;
  width: 350px;

  font-size: 20px;
}

.help-info li {
  line-height: 25px;
  margin: 20px 0;
}

.help-more {
  position: absolute;
  right: 0;
  margin: 50px 0;
}

.help-more a {
  text-decoration: none;
  color: #298FEC;
}
</style>