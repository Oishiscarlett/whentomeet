<template>
    <div class="About">
      <page-tab-bar/>
      <div class="base">
        
      </div>
    </div>
</template>

<script>

export default {
  name: 'About',
  components: {
    
  },
  methods: {
    itemClick (path) {
      this.$router.push(path);
    },
  }
}
</script>

<style scoped>
.About {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: linear-gradient(to right, #92d5ff, white);
}

.base {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  position: relative;
}


</style>