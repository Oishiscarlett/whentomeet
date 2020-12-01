<template>
  <tab-bar class="tab-bar-color">
      <div id="web-name" slot="web-icon">
        <router-link to="/">When2Meet</router-link>
      </div>
      <div class="item-wrapper">
        <router-link to="/create">创建事件</router-link>
        <router-link to="/EnterResults">查看结果</router-link>
        <router-link to="/faqs">帮助</router-link>
      </div>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'

export default {
  name: 'PageTabBar',
  components: {
    TabBar
  }
}
</script>

<style scoped>
  .tab-bar-color {
    background-color: white;
  }

  #web-name{
    line-height: 70px;
    text-align: center;
    width: 600px;
    font-size: 30px;
    font-weight: bold;
  }

  #web-name a {
    text-decoration: none;
    color: #298FEC;
  }

  .item-wrapper {
    width: 450px;
    align-items: center;
    margin-left: 300px;
    color: #409EFF;
  }

  .item-wrapper a {
    text-decoration: none;
    color: #409EFF;
    margin: 0 40px;
    font-size: 20px;
    text-align: center;
  }
</style>
