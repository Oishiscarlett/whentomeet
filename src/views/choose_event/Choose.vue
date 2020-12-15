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
        <div class="cr1"></div>
        <div class="cr2"></div>
        <div class="cr3"></div>
        <div class="timeTips1_text">
            <p>
                <span>颜色越深，选择该时间的人数越多</span>
            </p>
        </div>

        <div class="timeTips2"></div>
        <div class="timeTips2_text">
            <p>
                <span>您选择的时间</span>
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

      color:[],

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
          
          if(res.data.data.colorRange.range_zero){
            let rangeZeroStr = res.data.data.colorRange.range_zero.split(",");
            this.addrangeZeroBlock(rangeZeroStr);
          }
          
          if(res.data.data.colorRange.range_one){
            let rangeOneStr = res.data.data.colorRange.range_one.split(",");
            this.addrangeOneBlock(rangeOneStr);
          }

          if(res.data.data.colorRange.range_two){
            let rangeTwoStr = res.data.data.colorRange.range_two.split(",");
            this.addrangeTwoBlock(rangeTwoStr);
          }

          if(res.data.data.colorRange.range_three){
            let rangeThreeStr = res.data.data.colorRange.range_three.split(",");
            this.addrangeThreeBlock(rangeThreeStr);
          }

         /*  for(let m = 0; m<this.color.length; m++){
            console.log(this.color[m].id+"&"+this.color[m].groupId)
          } */
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
              for (let index = 1; index < eventapi.events.length; index++) {
              if(eventapi.events[index].groupId === 'inviteeSelect'){
                idTo += ',' + eventapi.events[index].id;
              };
              /* eventsId += ',' + eventapi.events[index].id; */
            }
            }else{
              idTo = ''; //传数据时第一个值会是一个未选择的值，所以赋值为空，未解决
              for (let index = 0; index < eventapi.events.length; index++) {
              if(eventapi.events[index].groupId === 'inviteeSelect'){
                idTo += ',' + eventapi.events[index].id;
              };
              /* eventsId += ',' + eventapi.events[index].id; */
            }
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
    
    //colorRange相关
    addrangeZeroBlock(rangeZeroStr){
      let eventapi = this.datasToCalendar.calendarFunction;
      //将时间块存入本地color数组
      for (let index = 0; index < rangeZeroStr.length; index++) {
                var zero = {}
                zero.id = rangeZeroStr[index];
                zero.groupId = 'hostSelect';
                this.color.push(zero);
            }
      
      //将时间块存入events数组
      for (let index = 0; index < rangeZeroStr.length; index++) {
              var zero = {}
              zero.id = rangeZeroStr[index];
              zero.start = timeUnitIdToTime(rangeZeroStr[index]);
              zero.groupId = 'hostSelect';
              zero.backgroundColor = '#8ad0ff';
              zero.borderColor = '#8ad0ff';
              eventapi.events.push(zero);
      }
    },

    addrangeOneBlock(rangeOneStr){
      let eventapi = this.datasToCalendar.calendarFunction;
      //将时间块存入本地color数组
      for (let index = 0; index < rangeOneStr.length; index++) {
              var one = {}
              one.id = rangeOneStr[index];
              one.groupId = 'rangeOne';
              this.color.push(one);
          }

      //将时间块存入events数组
      for (let index = 0; index < rangeOneStr.length; index++) {
              var one = {}
              one.id = rangeOneStr[index];
              one.start = timeUnitIdToTime(rangeOneStr[index]);
              one.groupId = 'hostSelect';
              one.backgroundColor = '#8ad0ff';
              one.borderColor = '#8ad0ff';
              eventapi.events.push(one);
      }
    },

    addrangeTwoBlock(rangeTwoStr){
      let eventapi = this.datasToCalendar.calendarFunction;
      //将时间块存入本地color数组
      for (let index = 0; index < rangeTwoStr.length; index++) {
              var two = {}
              two.id = rangeTwoStr[index];
              two.groupId = 'rangeTwo';
              this.color.push(two);
      }

      //将时间块存入events数组
      for (let index = 0; index < rangeTwoStr.length; index++) {
              var two = {}
              two.id = rangeTwoStr[index];
              two.start = timeUnitIdToTime(rangeTwoStr[index]);
              two.groupId = 'hostSelect';
              two.backgroundColor = '#3598f0';
              two.borderColor = '#3598f0';
              eventapi.events.push(two);
      }
    },

    addrangeThreeBlock(rangeThreeStr){
      let eventapi = this.datasToCalendar.calendarFunction;

      //将时间块存入本地color数组
      for (let index = 0; index < rangeThreeStr.length; index++) {
              var three = {}
              three.id = rangeThreeStr[index];
              three.groupId = 'rangeThree';
              this.color.push(three);
      }

      //将时间块存入events数组
      for (let index = 0; index < rangeThreeStr.length; index++) {
              var three = {}
              three.id = rangeThreeStr[index];
              three.start = timeUnitIdToTime(rangeThreeStr[index]);
              three.groupId = 'hostSelect';
              three.backgroundColor = '#0259bd';
              three.borderColor = '#0259bd';
              eventapi.events.push(three);
      }
    },

    /* 日历相关 */
    // 与日历组件通信，时时更新this.datasToCalendar.calendarFunction.events
    getTimeUnit(timeUnit) {
      this.datasToCalendar.calendarFunction.events = timeUnit;
    },
    // 选择时间页面点击时间块的时候，子组件发送时间块的id给父组件
    getTimeUnitId(id) {
      this.datasToCalendar.calendarFunction.idOfSelectTime = id;
      let formatapi = this.datasToCalendar.calendarFormat;  
      let eventapi = this.datasToCalendar.calendarFunction;
      for(let i = 0; i<eventapi.events.length; i++){
          if(eventapi.events[i].id === eventapi.idOfSelectTime){
            if(eventapi.events[i].groupId === 'hostSelect'){
              eventapi.events[i].groupId = 'inviteeSelect';
              eventapi.events[i].backgroundColor = '#002d70';
              eventapi.events[i].borderColor = '#002d70';
            }
            else if(eventapi.events[i].groupId === 'inviteeSelect'){
                    for(let j = 0; j<this.color.length; j++){
                      if(this.color[j].id === eventapi.idOfSelectTime){
                        if(this.color[j].groupId === 'hostSelect'){
                          eventapi.events[i].groupId = 'hostSelect';
                          eventapi.events[i].backgroundColor = '#8ad0ff';
                          eventapi.events[i].borderColor = '#8ad0ff';
                          
                        }else if(this.color[j].groupId === 'rangeOne'){
                          eventapi.events[i].groupId = 'hostSelect';
                          eventapi.events[i].backgroundColor = '#8ad0ff';
                          eventapi.events[i].borderColor = '#8ad0ff';
                                          
                        }else if(this.color[j].groupId === 'rangeTwo'){
                          eventapi.events[i].groupId = 'hostSelect';
                          eventapi.events[i].backgroundColor = '#3598f0';
                          eventapi.events[i].borderColor = '#3598f0';
                                                   
                        }else if(this.color[j].groupId === 'rangeThree'){
                          eventapi.events[i].groupId = 'hostSelect';
                          eventapi.events[i].backgroundColor = '#0259bd';
                          eventapi.events[i].borderColor = '#0259bd';
                                                    
                        }
                      }
                    }
                 }
          }
      } 
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

.cr1 {
  border-width: 0px;
  position: absolute;
  top: 60px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #8ad0ff;
}

.cr2 {
  border-width: 0px;
  position: absolute;
  top: 60px;
  left: 20px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #3598f0;
}

.cr3 {
  border-width: 0px;
  position: absolute;
  top: 60px;
  left: 40px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #0259bd;
}

.timeTips1_text {
  position: absolute;
  top: 60px;
  left: 65px;
  width: 250px;
  height: 30px;
  font-weight: 600;
  font-size: 14px;
  color: #333333; 
  line-height: 15px;
}

.timeTips2 {
  border-width: 0px;
  position: absolute;
  top: 20px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #002d70;
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