<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String
  },
  methods: {
    itemClick () {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    float: left;
    flex: 1;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
</style>
