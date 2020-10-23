<template>
  <tab-bar>
      <div id="web-name" slot="web-icon">
        <router-link to="/">When2Meet</router-link>
      </div>
      <!-- 判断是否登录 -->
      <!-- 未登录 -->
      <div class="unlogin" v-if="!isLogin">
        <el-button type="primary" size="medium" id="login" @click="itemClick('/login')">
          登录
        </el-button>
        <el-button size="medium" id="sign-up" @click="itemClick('/login')">
          注册
        </el-button>
      </div>
      <!-- 登录 -->
      <div class="login-in" v-else>
        <tab-bar-item id="user-name" path='/useinfo'>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ cutText(userName) }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='/useinfo'>个人中心</el-dropdown-item>
              <el-dropdown-item command='/useinfo' divided>我创建的事件</el-dropdown-item>
              <el-dropdown-item command='/useinfo' divided>我收到的邀请</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </tab-bar-item>
        <div id="exit" @click="exit()">退出</div>
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
  data() {
    return {
      isLogin: false,
      userName: ''
    }
  },
  methods: {
    itemClick (path) {
      this.$router.push(path);
    },
    handleCommand(command) {
      this.$router.push(command);
    },
    exit(){
      this.$cookies.remove('sessionId');
      this.isLogin = false;
    },
    cutText(text){
      if(text.length > 11){
          return text.substring(0,8) + '...';
      }else{
          return text;
      }
    }
  },
  mounted() {
   this.$api.userinfo.getUserInfo().then(res => {
      if(res.data.code === 200){
          this.isLogin = true;
          this.userName = res.data.data.nickName?res.data.data.nickName:res.data.data.phoneNumber;
      }
    })
  }
}
</script>

<style scoped>
  #web-name{
    line-height: 70px;
    text-align: center;

    font-size: 30px;
    font-weight: bold;
  }

  #web-name a {
    text-decoration: none;
    color: #298FEC;
  }

  .unlogin {
    margin-left: 600px;
    width: 160px;
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

  .login-in {
    margin-left: 550px;
    width: 300px;
  }

  #user-name >>> .el-dropdown-link{ 
    color: #409EFF;
    font-size: 18px;
  }

  #exit {
    color: #409EFF;
    font-size: 20px;
    margin-left: 150px;
    cursor: pointer;
  }
</style>
