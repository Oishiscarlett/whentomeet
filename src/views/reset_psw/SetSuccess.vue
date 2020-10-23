<template>
    <div id="reset-psw-verify">
      <page-tab-bar/>
      <reset-psw :process='process'>
        <div class="success-wrapper">
          <i class="iconfont icon-querenyuanzhengqueduigoutijiaochenggongwancheng-copy"></i>
          <div class="tips">重置成功！</div>
          <div class="link">点击返回<router-link to="/userinfo">个人中心</router-link></div>
        </div>
      </reset-psw>
    </div>
</template>

<script>
import PageTabBar from 'components/content/tabbar/PageTabBar'
import ResetPsw from 'components/common/reset_psw/ResetPsw'

export default {
    name: 'SetSuccess',
    components: {
        PageTabBar,
        ResetPsw
    },
    data() {
      return {
        process: 3,
      };
    }
}
</script>

<style scoped>
.el-input >>> .el-icon-circle-check {
  color: #298FEC;
}

.success-wrapper {
    width: 400px;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    font-size: 20px;
}

.success-wrapper i {
    font-size: 100px;
    color: #298FEC;
}

.success-wrapper .tips {
    margin: 20px 0 20px 10px;
    font-weight: bold;
}

.success-wrapper .link {
    margin-top: 50px;
}

.success-wrapper .link a {
    text-decoration: none;
    color: #298FEC;
}
</style>