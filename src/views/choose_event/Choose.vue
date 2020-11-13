<template>
  <div id="box" v-if="box">
    <page-tab-bar></page-tab-bar>
    <div class="base">

    <!-- 事件名称与描述 -->    
    <div class="title">
        <div class="eventName">
          <p><span>{{ eventName }}</span></p>
        </div>

        <div class="eventInfo">
            <p><span>{{ eventInfo }}</span></p>
        </div>

        <div class="eventDuration">
            <p><span>持续时间：{{ eventDuration }}</span></p>
        </div>
    </div>

    <!-- tips -->
    <div class="tips">
        <div class="timeTips1"></div>
        <div class="timeTips1_text">
            <p>
                <span>发起者选择的时间</span>
            </p>
        </div>
        <div class="timeTips2"></div>
        <div class="timeTips2_text">
            <p>
                <span>您以及其他参与者选择的时间</span>
            </p>
        </div>
        <!-- <div>
            <button class="btn_pb" @click="changeBtn" v-text="btnText"></button>
            <div class="test" v-show="isShow"></div>
            
        </div> -->
    </div>

    <!-- 日历区 -->
    <Calendar class="demo-app"
              @getTimeUnit='getTimeUnit' 
              @getTimeUnitId='getTimeUnitId'
              :Datas='datasToCalendar'/>
    <button @click="changeCalendarFormat">try</button>>

    <!-- 填写信息区 -->
    <div class="info">
      <div class="info_title">
        <p>
          <span>填写您的信息以便发起人查看</span>
        </p>
      </div>

      <div class="info_content">
       <el-form ref="info_content" :model="info_content" :rules="info_content_rules">
        <el-form-item label="您的姓名" class="info_content_name"  prop="name">
          <el-input class="info_name_edit" v-model="info_content.name"></el-input>
        </el-form-item>

        <el-form-item label="备注" class="info_content_comment" prop="comment">
          <el-input class="info_comment_edit" type="textarea" v-model="info_content.comment"></el-input>
        </el-form-item>

        <!-- <el-checkbox class="info_content_public" v-model="checked">公开我的选择（勾选后，您的时间将会被其他参与者所查看）</el-checkbox>
 -->
        <el-form-item>
          <el-button class="btn_submit" type="primary" @click="choose('info_content');" style="font-size:30px;">
            提交
          </el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>

   </div>
  </div>  
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
import Calendar from "@/components/content/calendar"
import { createTimeUnitId,timeUnitIdToTime,timeUnitSpilt } from '@/utils/calendar-utils'
export default {
  name: 'Choose',
  components: {
    PageTabBar,
    Calendar
  },

  data() {
    return {
      box: false,
      eventName: '',
      eventInfo: '',
      eventDuration: '',
      isShow: true,
      btnText: "屏蔽其他参与者选择的时间",
            
      //表单数据绑定对象
      info_content: {
        name: "",
        comment: "",
      },
      checked: true,
        //表单规则验证对象
        info_content_rules: {
          name: [
            { required:true, message:'请输入您的姓名', trigger: 'blur'}
          ]
        },

      /* 日历相关 */
      /***************************
       *   传给日历组件的数据
      ***************************/ 
      datasToCalendar: {
        /***************************
        *   日历格式相关的数据
        ***************************/ 
        calendarFormat: {
          // 设置默认显示的时间间隔
          slotDuration: '01:00', // 1 hours
          // 选择的时间的默认间隔（应与slotDuration保持一致）
          defaultTimedEventDuration: '01:00',
          // 日历显示的最早时间
          slotMinTime: "06:00:00",
          // 日历显示的最晚时间
          slotMaxTime: "22:00:00",
          // 强调日历中的某些时间段
          businessHours: {
            daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], // 0是星期天，1-6周一到周六
            startTime: '08:00', // 高亮开始时间
            endTime: '20:00', // 高亮结束时间
          },
          // 隐藏一周当中的某天
          hiddenDays: [  ], // 隐藏周二
          // 日历开始于结束的时间
          validRange: {
            start: '2020-10-20',
            end: '2020-12-20'
          },
        },
        /***************************
        *    与日历在各个页面
        *    的功能有关的数据
        ***************************/ 
        calendarFunction: {
          // 日历是否可选
          selectable: false,
          // 背景时间：用于显示发起者未选择的时间
          // 一开始是空，根据后端返回的数据进行初始化
          events: [
            /* {
              // 传入的数据应该是发起者未选择的时间
              /* groupId: "hostSelect",
              id: '2020-11-11-10:00:00-1',
              start: '2020-11-10T10:00:00',
              // end: '2020-11-01T16:00:00',
              // display: 'background',
              // backgroundColor: 'red'
              //backgroundColor: '#FF6633',
              title: '1' 
            } */
          ],
          pages: 'select',   // 这里有三个选项：create、select、result 对应3个页面
        }
      },
      // 结果页面被选中的时间块的id
      idOfSelectTime: ''
    }

  },

  mounted () {
        
  },

  created () {
      this.initData();
  },

  methods: {
    initData(){
      let formatapi = this.datasToCalendar.calendarFormat;  
      let eventapi = this.datasToCalendar.calendarFunction;
    
    //调用日历渲染接口
    this.$api.event.getResultByCode(this.$route.params.eventCode,
        {
          eventCode: this.$route.params.eventCode
        }
      ).then(res => {
        console.log(res.data)
        /* console.log(typeof(res.data.data.timeUnit)) */
        if(res.data.code === 200){
          this.eventName = res.data.data.eventName;
          this.eventInfo = res.data.data.eventDescription;
          this.eventDuration = res.data.data.eventDuration;
          
          //将传回的数据调整成日历所需格式
          let time = res.data.data.timeUnit;

          let timeStr = time.split(",");

          //日历中显示发起者所选的时间
          for (let index = 0; index < timeStr.length; index++) {
              var nowEvent = {}
              nowEvent.id = timeStr[index];
              nowEvent.start = timeUnitIdToTime(timeStr[index]);
              nowEvent.groupId = 'hostSelect';
              eventapi.events.push(nowEvent);
          }
          //console.log(eventapi.events)
        }
      }).catch(error => {
              console.log(error);
      });
      this.box = true;
  },

    //跳转
    itemClick(info_content) {
      this.$refs[info_content].validate((valid) => {
        if(valid){
        this.$router.push({ name: 'Success', params: { eventCode: 'ipia2cn',idCode: 'pgadf27a' }});
        }else{
          alert('请填写您的姓名')
        }
      })
    },

    //将数据传给后端
    choose(info_content) {
      this.$refs[info_content].validate((valid) => {
        if (valid) {
          let formatapi = this.datasToCalendar.calendarFormat;  
          let eventapi = this.datasToCalendar.calendarFunction;
          // 判断是否已经选择时间
          if(eventapi.events.length > 0) {
          // 已经选择时间，对传给后端的数据进行处理
          var idTo;
            if(eventapi.events[0].groupId === 'inviteeSelect'){
              idTo = eventapi.events[0].id;
            }else{
              idTo = ''; //传数据时第一个值会是一个未选择的值，所以赋值为空，未解决
            }
            
            for (let index = 0; index < eventapi.events.length; index++) {
              
              if(eventapi.events[index].groupId === 'inviteeSelect'){
                idTo += ',' + eventapi.events[index].id;
              };
              /* eventsId += ',' + eventapi.events[index].id; */
            }
            
            //调用接口传数据
            this.$api.event.attendEvent(this.$route.params.eventCode,{
              
                eventCode: this.$route.params.eventCode,
                timeUnit: idTo,
                name: this.info_content.name,
                comment: this.info_content.comment,
                isTimePublic: 1
            }).then(res => {
              //console.log(res.data)
              if (res.data.code == 200) {
                console.log(idTo)
                this.$router.push({ name: 'Success', params: { eventCode: this.$route.params.eventCode,idCode: res.data.data }});
              }else{
                alert('请求失败')
              }
            }).catch(error => {
              console.log(error);
            });
          }else {
            // 没有选择时间 弹出提示
            this.$alert('没有选择时间！', '提示', {
            confirmButtonText: '确定',
                 
          });
        }
            
        }else {
          console.log("error submit!!");
          return false;
        }
        
      });
    },
       
    /* changeBtn(){
      this.isShow = !this.isShow
        if(this.isShow){
          this.btnText = "屏蔽其他参与者选择的时间";
        }else{
          this.btnText = "显示其他参与者选择的时间";
        }
    }, */

    /* 日历相关 */
    // 与日历组件通信，时时更新this.datasToCalendar.calendarFunction.events
    getTimeUnit(timeUnit) {
      this.datasToCalendar.calendarFunction.events = timeUnit;
    },
    // 结果页面点击时间块的时候，子组件发送时间块的id给父组件
    getTimeUnitId(id) {
      this.idOfSelectTime = id;
    },
    // 动态调整日历的格式：实现的时候与表单进行绑定（第三期任务）
    changeCalendarFormat() {
      let formatapi = this.datasToCalendar.calendarFormat;
  
      formatapi.slotDuration = '00:30' 
      formatapi.defaultTimedEventDuration = '00:30'
      formatapi.slotMinTime = "10:00:00"
      formatapi.slotMaxTime = "20:00:00"
      formatapi.businessHours = {
        daysOfWeek: [ 1, 2, 3, 5, 6, 0],
        startTime: '11:00',
        endTime: '19:00', 
      }
      formatapi.hiddenDays = [1,4]
      formatapi.validRange = {
        start: '2020-11-11',
        end: '2020-11-19'
      }
    }
  }
};
</script>

<style scoped>
#box{
    width: 100%;
    height: 100%;
    /* position: fixed; */
    top: 0px;
    bottom: 0px;
    /* overflow: scroll; */
}

.base{
  width: 1200px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.title{
  position: absolute;
  top: 130px;
  left: 150px;
}

.eventName {
  position: absolute;
  width: 217px;
  height: 42px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 26px;
  letter-spacing: 6px;
  color: #333333;
}

.eventInfo {
  position: absolute;
  top: 50px;
  width: 217px;
  height: 42px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  color: #333333;
}

.eventDuration {
  position: absolute;
  top: 80px;
  width: 217px;
  height: 42px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  color: #333333;
}

.tips{
  position: absolute;
  top: 130px;
  left: 860px;
}

.timeTips1 {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #3788d8;
}

.timeTips1_text {
  position: absolute;
  width: 144px;
  height: 22px;
  left: 25px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;  
}

.timeTips2 {
  border-width: 0px;
  position: absolute;
  top: 20px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #003399;
}

.timeTips2_text {
  position: absolute;
  top: 20px;
  left: 25px;
  width: 220px;
  height: 22px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;  
}

.btn_pb {
  position: absolute;
  top: 60px;
  width: 160px;
  height: 30px;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  border-style: solid;
  border-width: 1px;
  background-color: #ffffff;
  border-radius: 5px;
}

.demo-app {
  position: absolute;
  top: 220px;
  left: 110px;
  display: flex;
  width: 1000px;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.info{
  position: absolute;
  top: 750px;
  left: 450px;
}

.info_title {
    position: absolute;
    width: 350px;
    height: 34px;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 3px;
    text-align: center;
}

.info_content {
    border-width: 0px;
    position: absolute;
    top: 10px;
    left: -90px;
    width: 700px;
    height: 500px;
}

.info_content_name {
  position: absolute;
  top: 40px;
  width: 126px;
  height: 26px;
}

/* .info_content_name .el-form-item__label{
  font-size: 20px;
  top: 10px;
  left: 20px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 3px;
} */

.info_name_edit {
  position: absolute;
  left: 150px;
  top: 0px;
  width: 350px;
  height: 50px;
}

/* .info_name_edit .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 480px;
} */

.el-form-item__error {
    color: #F56C6C;
    font-size: 13px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 55px;
    left: 200px;
    width: 150px;
}

.info_content_comment {
  position: absolute;
  
  top: 120px;
  width: 90px;
  height: 34px;
}

/* .info_content_comment .el-form-item__label{
  font-size: 20px;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-style: normal;
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 3px;
} */

.info_comment_edit {
  position: absolute;
  left: 150px;
  top: 0px;
  width: 350px;
  height: 100px;
}

/* .info_comment_edit .el-textarea__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 480px;
    height: 200px;
} */

.info_content_public {
  position: absolute;
  left: 105px;
  top: 230px;
  width: 400px;
  height: 60px;
  color: #333333;
}

.btn_submit {
  position: absolute;
  left: 150px;
  top: 250px;
  width: 250px;
  height: 50px;
  font-size: 22px;
  text-align: center;
}



</style>