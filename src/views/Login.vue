<template>
  <div>
    <page-tab-bar></page-tab-bar>

    <login-cpn></login-cpn>    

  </div>
</template>

<script>
import PageTabBar from '../components/content/tabbar/PageTabBar'
import LoginCpn from '../components/content/logincpn'
export default {
    name: 'login',
    components: {
      PageTabBar,
      LoginCpn
    },
};
</script>

<style lang="less" scoped>

</style>