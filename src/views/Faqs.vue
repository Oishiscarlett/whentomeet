<template>
  <div>
    <header-cpn></header-cpn>

    <faq-cpn></faq-cpn>    

  </div>
</template>

<script>
import HeaderCpn from '../components/headercpn'
import FaqCpn from '../components/faqcpn'

export default {
    name: 'faqs',
    components: {
      HeaderCpn,
      FaqCpn
    },
};
</script>

<style lang="less">


</style>