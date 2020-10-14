<template>
  <div>
    <div class="navBar">
      <div class="navBarBox"></div>

      <div class="logo">
        <p><span>When2meet</span></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'HeaderCpn'
    
};
</script>

<style lang="less">
.navBar {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 0px;
  height: 0px;
}

.navBarBox {
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 100px;
  display: flex;
  color: #f9f0ff;
  border-bottom: 1px #40a9ff solid;
}

.logo {
  border-width: 0px;
  position: absolute;
  left: 380px;
  top: 22px;
  width: 327px;
  height: 78px;
  display: flex;
  font-family: "Poppins Bold", "Poppins Regular", "Poppins";
  font-weight: 700;
  font-style: normal;
  font-size: 45px;
  color: #298fec;
}


</style>