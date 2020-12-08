<template>
  <tab-bar class="tab-bar-color">
      <div id="web-name" slot="web-icon">
        <router-link to="/">When2Meet</router-link>
      </div>
      <div class="item-wrapper">
        <router-link to="/faqs">帮助</router-link>
        <router-link to="/team">关于我们</router-link>
      </div>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'

export default {
  name: 'HomeTabBar',
  components: {
    TabBar
  }
}
</script>

<style scoped>
  #web-name{
    line-height: 70px;
    text-align: center;
    padding-right: 50px;
    font-size: 30px;
    font-weight: bold;
  }

  #web-name a {
    text-decoration: none;
    color: #298FEC;
  }

  .item-wrapper {
    width: 200px;
    padding-left: 50px;
    align-items: center;
    margin-left: 400px;
    color: #409EFF;
  }

  .item-wrapper a {
    text-decoration: none;
    color: #409EFF;
    margin: 0 20px;
    font-size: 20px;
    text-align: center;
  }
</style>
