<template>
  <div>
    <page-tab-bar></page-tab-bar>

    <enter-results-cpn></enter-results-cpn>    

  </div>
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
import EnterResultsCpn from '@/components/content/EnterResultsCpn'

export default {
    name: 'EnterResults',
    components: {
      PageTabBar,
      EnterResultsCpn
    },
};
</script>

<style lang="less">


</style>