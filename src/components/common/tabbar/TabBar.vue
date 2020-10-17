<template>
  <div id="tab-bar">
    <div id="web-icon"><slot name="web-icon"></slot></div>
    <div id="tab-bar-items"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  #tab-bar {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;

    border-bottom: 1px solid #409EFF;
    box-shadow: 1px 1px 3px rgb(167, 205, 255);

    position: fixed;
    z-index: 100;
  }

  #web-icon {
    flex: 1;
  }

  #tab-bar-items {
    flex: 2;
    display: flex;
  }
</style>
