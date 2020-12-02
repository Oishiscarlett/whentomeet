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
                <span>您选择的时间</span>
            </p>
        </div>

        <div class="cr1"></div>
        <div class="cr2"></div>
        <div class="cr3"></div>
        <div class="timeTips3_text">
            <p>
                <span>其他参与者选择的时间<br>（颜色越深，选择该时间的人数越多）</span>
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

        <!-- <el-checkbox v-if="publicBox" class="info_content_public" v-model="checked">公开我的选择（勾选后，您的时间将会被其他参与者所查看）</el-checkbox> -->

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
      publicBox: false,
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

      responseData:'',
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
          slotMinTime: "05:00",
          // 日历显示的最晚时间
          slotMaxTime: "23:00",
          // 强调日历中的某些时间段
          businessHours: {
            daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], // 0是星期天，1-6周一到周六
            startTime: '08:00', // 高亮开始时间
            endTime: '20:00', // 高亮结束时间
          },
          // 隐藏一周当中的某天
          hiddenDays: [  ],
          // 日历开始于结束的时间
          validRange: {
            start: '2020-11-20',
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
        if(res.data.code === 200){
          //日历格式相关渲染
          formatapi.slotDuration = res.data.data.calendar.timeGap
          formatapi.defaultTimedEventDuration = res.data.data.calendar.timeGap
          let showHours = res.data.data.calendar.showHours.split(",")
          formatapi.slotMinTime = showHours[0]
          formatapi.slotMaxTime = showHours[1]
          let highlightHours = res.data.data.calendar.highlightHours.split(",")
          formatapi.businessHours = {
            /* daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], */
            startTime: highlightHours[0],
            endTime: highlightHours[1], 
          }
          if(res.data.data.calendar.hiddenDays){
                    let hiddenDay = res.data.data.calendar.hiddenDays.split(",")
                    
                    formatapi.hiddenDays = []
                    for(var i = 0; i<hiddenDay.length; i++){
                        
                            formatapi.hiddenDays.push(Number(hiddenDay[i]));
                        
                    }
                }
          //console.log(formatapi.hiddenDays);
          formatapi.validRange = {
            start: res.data.data.calendar.startTime,
            end: res.data.data.calendar.endTime
          }
         
          //事件时间相关渲染       
          this.eventName = res.data.data.createInfo.eventName;
          this.eventInfo = res.data.data.createInfo.eventDescription;
          this.eventDuration = res.data.data.createInfo.eventDuration;
          
          //将传回的数据调整成日历所需格式
          let time = res.data.data.createInfo.timeUnit;

          let timeStr = time.split(",");

          //日历中显示发起者所选的时间
          for (let index = 0; index < timeStr.length; index++) {
              var nowEvent = {}
              nowEvent.id = timeStr[index];
              nowEvent.start = timeUnitIdToTime(timeStr[index]);
              nowEvent.groupId = 'hostSelect';
              eventapi.events.push(nowEvent);
          }

          //将事件颜色替换成colorRange
          let rangeOne = res.data.data.colorRange.range_one;
          let rangeOneStr = rangeOne.split(",");
          this.addrangeOneBlock(rangeOneStr);

          let rangeTwo = res.data.data.colorRange.range_two;
          let rangeTwoStr = rangeTwo.split(",");
          this.addrangeTwoBlock(rangeTwoStr);

          let rangeThree = res.data.data.colorRange.range_three;
          let rangeThreeStr = rangeThree.split(",");
          this.addrangeTwoBlock(rangeThreeStr);

          /* if(res.data.data.isTimePublic == 1){
            this.publicBox = true; //“公开自己的选择”框是否可见
          } */
          //console.log(eventapi.events)
        }
      }).catch(error => {
          console.log(error);
      });
      this.box = true;
    },

    //点击“提交”，将数据传给后端
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
                //跳转到“提交成功”页面
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
    
    //将颜色替换成colorRange
    addrangeOneBlock(rangeOneStr){
      let eventapi = this.datasToCalendar.calendarFunction;
      for(let i = 0; i<eventapi.events.length; i++){
        for(let j = 0; j<rangeOneStr.length; j++){
          if(eventapi.events[i].id == rangeOneStr[j]){
            eventapi.events[i].backgroundColor = '#91d5ff';
            eventapi.events[i].borderColor = '#91d5ff';
            eventapi.events[i].groupId = 'rangeOne';
            eventapi.events[i].title = '';
          }
        }
      }  
    },

    addrangeTwoBlock(rangeTwoStr){
      let eventapi = this.datasToCalendar.calendarFunction;
      for(let i = 0; i<eventapi.events.length; i++){
        for(let j = 0; j<rangeTwoStr.length; j++){
          if(eventapi.events[i].id == rangeTwoStr[j]){
            eventapi.events[i].backgroundColor = '#69c0ff';
            eventapi.events[i].borderColor = '#69c0ff';
            eventapi.events[i].groupId = 'rangeTwo';
            eventapi.events[i].title = '';
          }
        }
      }  
    },

    addrangeThreeBlock(rangeThreeStr){
      let eventapi = this.datasToCalendar.calendarFunction;
      for(let i = 0; i<eventapi.events.length; i++){
        for(let j = 0; j<rangeThreeStr.length; j++){
          if(eventapi.events[i].id == rangeThreeStr[j]){
            eventapi.events[i].backgroundColor = '#40a9ff';
            eventapi.events[i].borderColor = '#40a9ff';
            eventapi.events[i].groupId = 'rangeThree';
            eventapi.events[i].title = '';
          }
        }
      }  
    },

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
    /* position: fixed; 
    top: 0px;
    bottom: 0px;
    /* overflow: scroll; */
}

.base{
  width: 1200px;
  height: 100%;
  position: relative;
  margin: 0 auto;
  padding-top: 100px;
}

.title{
  position: absolute;
  top: 130px;
  left: 110px;
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

.cr1 {
  border-width: 0px;
  position: absolute;
  top: 60px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #91d5ff;
}

.cr2 {
  border-width: 0px;
  position: absolute;
  top: 60px;
  left: 20px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #69c0ff;
}

.cr3 {
  border-width: 0px;
  position: absolute;
  top: 60px;
  left: 40px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #40a9ff;
}

.timeTips3_text {
  position: absolute;
  top: 60px;
  left: 60px;
  width: 250px;
  height: 30px;
  font-weight: 600;
  font-size: 14px;
  color: #333333; 
  line-height: 15px;
}

.demo-app {
  /* position: absolute;
  top: 220px;
  left: 110px;
  display: flex;
  width: 1000px;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px; */
  padding-top: 150px;
}

.info{
  margin: 0 auto;
  width: 700px;
  text-align: center;
}

.info_title {
    /* position: absolute; */
    margin-left: 150px;
    width: 350px;
    height: 34px;
    font-weight: 700;
    font-size: 23px;
    letter-spacing: 3px;
    text-align: center;
}

.info_content {
  padding-top: 50px;
}

.info_content >>> .el-form-item__label{
  font-size: 18px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 3px;
  padding-bottom: 30px;
}

.info_content >>> .el-form-item__content{
  font-size: 18px;
  padding-left: 200px;
  width: 450px;
  height: 50px;
}

.info_content >>> .el-form-item__error{
  padding-left: 200px;
  margin-bottom: 30px;
  font-size: 16px;
}

.info_content_comment >>> .info_comment_edit{
    height: 300px;
}

/* .info_content_public {
  position: absolute;
  left: 105px;
  top: 200px;
  width: 400px;
  height: 60px;
  color: #333333;
} */

.btn_submit {
  width: 250px;
  height: 50px;
  font-size: 22px;
  text-align: center;
  margin-right: 150px;
}



</style>