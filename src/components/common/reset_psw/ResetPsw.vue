<template>
  <div class="box-card-wrapper">
    <el-card class="box-card">
      <el-steps :active=process align-center>
        <el-step title="填写电话"></el-step>
        <el-step title="重置密码"></el-step>
        <el-step title="重置成功"></el-step>
      </el-steps>
      <div class="form-wrapper">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'ResetPsw',
    props: {
      process: Number
    }
}
</script>

<style scoped>
.box-card-wrapper {
  margin: 180px 0 0 0;
  text-align: center;
}

.box-card {
  width: 800px;
  display: inline-block;
}

.form-wrapper {
  width: 600px;
  height: 400px;
  margin: 0 80px;
  position: relative;
}
</style>