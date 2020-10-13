<template>
  <div id="app">
    <page-tab-bar/>
    <!-- <home-tab-bar/> -->
  </div>
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
import HomeTabBar from '@/components/content/tabbar/HomeTabBar'

export default {
  name: 'app',
  components: {
    PageTabBar,
    HomeTabBar
  }
}
</script>

<style>
@import "assets/css/normalize.css";
@import "assets/css/reset.css";
</style>
