<template>
  <div>
    <page-tab-bar></page-tab-bar>

    <faq-cpn></faq-cpn>    

  </div>
</template>

<script>
import PageTabBar from '../components/content/tabbar/PageTabBar'
import FaqCpn from '../components/faqcpn'

export default {
    name: 'faqs',
    components: {
      PageTabBar,
      FaqCpn
    },
};
</script>

<style lang="less">


</style>