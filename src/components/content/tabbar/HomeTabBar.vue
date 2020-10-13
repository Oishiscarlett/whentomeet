<template>
  <tab-bar>
      <div id="web-name" slot="web-icon">When2Meet</div>
      <!-- 判断是否登录 -->
      <!-- 未登录 -->
      <div class="unlogin" v-if="1">
        <el-button type="primary" size="medium" id="login" @click="itemClick('/login')">
          登录
        </el-button>
        <el-button size="medium" id="sign-up" @click="itemClick('/signup')">
          注册
        </el-button>
      </div>
      <!-- 登录 -->
      <div class="login-in" v-else>
        <tab-bar-item id="use-name" path='/useinfo'>
          <el-dropdown>
            <span class="el-dropdown-link">
              账户名<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>我创建的事件</el-dropdown-item>
              <el-dropdown-item divided>我收到的邀请</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </tab-bar-item>
        <tab-bar-item id="exit" path="/">退出</tab-bar-item>
      </div>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'

export default {
  name: 'HomeTabBar',
  components: {
    TabBar,
    TabBarItem
  },
  methods: {
    itemClick (path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
  #web-name{
    line-height: 70px;
    text-align: center;

    color: #298FEC;
    font-size: 30px;
    font-weight: bold;
  }

  #login{
    margin: 0 0 0 560px;
  }

  #sign-up{
    margin: 0 0 0 20px;
    color: #409EFF;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 20px;
  }

  .el-icon-arrow-down {
    font-size: 20px;
  }

  .el-dropdown-menu li{
    text-align: center;
  }

  #use-name { 
    margin: 0 0 0 560px;
    color: #409EFF;
  }

  #exit {
    margin: 0 0 0 30px;
    color: #409EFF;
  }
</style>
