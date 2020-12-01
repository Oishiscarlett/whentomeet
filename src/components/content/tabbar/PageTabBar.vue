<template>
  <tab-bar class="tab-bar-color">
      <div id="web-name" slot="web-icon">
        <router-link to="/">When2Meet</router-link>
      </div>
      <div class="page-tab-wrapper">
        <tab-bar-item path='/create'>创建事件</tab-bar-item>
        <tab-bar-item path='/EnterResults'>查看结果</tab-bar-item>
        <tab-bar-item path='/faqs'>帮助</tab-bar-item>
      </div>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
  name: 'PageTabBar',
  components: {
    TabBar,
    TabBarItem
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
    font-size: 30px;
    font-weight: bold;
  }
  #web-name a {
    text-decoration: none;
    color: #298FEC;
  }
  .page-tab-wrapper {
      width: 500px;
      display: flex;
      align-items: center;
      margin-left: 400px;
      color: #409EFF;
  }
</style>