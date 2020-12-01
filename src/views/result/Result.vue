<template>
 <div id="box">
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
     </div>

     <!-- 左侧栏 -->
     <div class="left_wrapper">
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>选项</span>               
            </div>
            <div class="item" >
                <p type="text" @click="copyLink()">邀请更多人</p>
                <p @click="eventChoose()">增加回应</p>
                <p @click="edit()">编辑事件</p>
            </div>
        </el-card>
     </div>

     

     <!-- 左下侧栏 -->
     <div class="left_wrapper2">
       
        <el-card class="box-card2" shadow="hover">
            <div slot="header" class="clearfix">
                <span>回应列表</span> 
                     
            </div>

            <el-drawer
              title="选定回应者的留言"
              :visible.sync="drawer"
              :direction="direction"
              >
              <el-scrollbar style="height: 100%">
                <div class="commentList">
                  <div class="comment" 
                        v-for="(item,i) in commentList"
                        :key="i" 
                        :label="item.name">
                    {{item.name}}：{{ item.comment }}

                  </div>
                </div>
              </el-scrollbar>
            </el-drawer>
 
            <el-scrollbar style="height: 100%">
             <div class="responseList">
               <div class="checkAll">
               <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                全选
               </el-checkbox>
               <i class="icon iconfont iconkejian" @click="drawer = true;openDrawer()"></i>
               <!-- <i class="icon iconfont iconbukejian" v-show="bkjIsShow" @click="changeBtn2"></i> -->
               <span @click="dialogTableVisible3 = true"><i class="icon iconfont iconyoujian" ></i></span>
               <span @click="deleteResponse()"><i class="icon iconfont iconshanchu"></i></span>
               <div class="line"></div>
               </div>
               
              <el-checkbox-group v-model="checkedPeople" @change="handleCheckedChange">
                <el-checkbox
                  class="checkedPeople" 
                  v-for="(item,i) in responseList"
                  :key="i"
                  :label="item.name"
                  
                 
                 >{{item.name}} 
                 </el-checkbox>
                
              </el-checkbox-group>
             </div>
             
            </el-scrollbar>
            
        </el-card>

        <!-- 发送重新选择提醒到指定参与者的邮箱 -->
        <el-dialog title="发送重新选择提醒到指定参与者的邮箱" :visible.sync="dialogTableVisible3" :append-to-body="true">

          <el-form ref="sendEmailForm"  :model="sendEmailForm">
            <el-form-item label="邮箱地址（以,隔开）">
              <el-input v-model="sendEmailForm.email.value" autocomplete="off"></el-input>
            </el-form-item>
            
           <!--  <el-form-item>
              <el-button type="primary" class="send" @click="sendrequest('sendEmailForm')" style="font-size:30px;">
                发送
              </el-button>
            </el-form-item> -->
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible3 = false;sendrequest('sendEmailForm')">发 送</el-button>
            <el-button  @click="dialogTableVisible3 = false">取 消</el-button>
          </span>
        </el-dialog>

      
     </div>

    <!-- tips -->
    <div class="tips">
        <div class="timeTips1"></div>
        <div class="timeTips1_text">
            <p>
                <span>发起者选择的时间（右上角数字为未选择该时间的人数）</span>
            </p>
        </div>
        <div class="timeTips2"></div>
        <div class="timeTips2_text">
            <p>
                <span>推荐时间</span>
            </p>
        </div>
        <div class="timeTips3"></div>
        <div class="timeTips3_text">
            <p>
                <span>最终时间</span>
            </p>
        </div>
        
    </div>
    
    <!-- 日历区 -->
    <Calendar class="demo-app"
              @getTimeUnit='getTimeUnit' 
              @getTimeUnitId='getTimeUnitId'
              :Datas='datasToCalendar'/>
    <button @click="changeCalendarFormat">try</button>

     <!-- 右侧栏 -->
     <div class="right_wrapper">
        <el-dialog title="能参加的人" :visible.sync="dialogTableVisible1" :append-to-body="true">
            <span>{{ attendPeople }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="不能参加的人" :visible.sync="dialogTableVisible2" :append-to-body="true">
            <span>{{ absentPeople }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogTableVisible2 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-card class="box-card3" shadow="hover">
            <div slot="header" class="clearfix">
                <span>生成事件结果</span>               
            </div>
            <div class="nameAndInfo">
              <span>事件名称：</span><br>
              <span class="content">{{ eventName }}</span><br>
              <span>事件描述：</span><br>
              <span class="content">{{ eventInfo }}</span>
            </div>

            <div class="dateAndTime">
              <span>事件日期：</span><br>
              <span class="content">{{ eventDate }}</span><br>
              <span>事件时间：</span><br>
              <span class="content">{{ eventTime }}</span>
            </div>

            <div class="can">
              <span>能参加的人数：</span><br>
              <el-button type="text" @click="dialogTableVisible1 = true" class="content">{{ attend }} ({{ attendPro }}%)</el-button><br>
              <span>不能参加的人数：</span><br>
              <el-button type="text" @click="dialogTableVisible2 = true" class="content">{{ absent }} ({{ absentPro }}%)</el-button>
            </div>
            <el-button class="btnToFinal" @click="finalResult()">点击生成事件结果</el-button>
        </el-card>

        
     </div>

     <!-- 下侧留言栏 -->
     <!-- <div class="bottom_wrapper">
       <el-card class="box-card_bottom" shadow="hover">
         <div slot="header" class="clearfix">
                <span>他们的留言</span>
         </div>

         <el-scrollbar style="height: 100%">
           <div class="commentList">
             <div class="comment" 
                  v-for="(item,i) in commentList"
                  :key="i" 
                  :label="item.name">
              {{item.name}}：{{ item.comment }}

             </div>
           </div>
         </el-scrollbar>

       </el-card>
     </div> -->

   </div>
 </div>
</template>
<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
import Calendar from "@/components/content/calendar"
import { createTimeUnitId,timeUnitIdToTime,timeUnitSpilt } from '@/utils/calendar-utils'
import { resolve } from 'path'
export default {
  name: 'Result',
  components: {
    PageTabBar,
    Calendar
  },
  data(){
    return{ 
      eventName: "",
      eventInfo: "",
      eventDate: "",
      eventTime: "",
      attend: "",
      absent: "",
      attendPro: '',
      absentPro: '',
      attendPeople: '',
      absentPeople: '',

      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,

      checkAll:false,
      isIndeterminate: true,

      sendEmailForm: {
          email: [{
            value: ''
          }],  
      },

      drawer: false,
      direction: 'ltr',

      timeBlock: '', //存储接口回传的timeDetail
      partners: '', //存储接口回传的partners
            
      responseList: [
              /* {
                id:'0',
                name: 'vv'
              },{
                id:'1',
                name: 'aa'
              } */
      ],

      commentList: [

      ],
        
      checkedPeople: [],//需要绑定的数据
      allElection: [], // 全选
      selectionArr: [], // 选中要传给后台的数据 对象
            
      kjIsShow: true, //可见图标
      bkjIsShow: false, //不可见图标
      selectedResponse: '',

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
         slotMinTime: "05:00:00",
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
         start: '2020-11-01',
         end: '2020-11-30'
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
        {
          // 传入的数据应该是发起者未选择的时间
          /* groupId: "hostChoose",
          id: '2020-11-02-10:00:00-1',
          start: '2020-11-02T10:00:00',
          // end: '2020-11-01T16:00:00',
          // display: 'background',
          // backgroundColor: 'red'
          backgroundColor: '#FF6633',
          title: '1' */
        }
        ],
          pages: 'result',   // 这里有三个选项：create、select、result 对应3个页面
       }
      },
          // 结果页面被选中的时间块的id
          idOfSelectTime: ''
           
      }
    },
    created() {
      this.initData();
    },
    mounted(){
      /* 将以下两个函数放在mounted()时，全选无法生效 */
     /*  this.allElectionFun();
      this.DefaultFullSelection(); */
    },
    methods: {
      //跳转
      itemClick(path) {
        this.$router.push(path);
      },

      eventChoose(){
        this.$router.push({ name: 'choose', params: { eventCode: this.$route.params.eventCode}});
      },

      copyLink(){
        this.$router.push({ name: 'copylink', params: { eventCode: this.$route.params.eventCode}});
      },

      requestUpdate(){
        this.$router.push({ name: 'sendrequest', params: { eventCode: this.$route.params.eventCode}});
      },

      edit(){
        this.$router.push({ name: 'edit', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode}});
      },

      sendrequest(sendEmailForm){

      },

      openDrawer(){
        //先将上一次渲染的数据清空
        this.commentList = [];
        //渲染留言列表
        for(var l = 0; l<this.partners.length; l++){
          for (let index2 = 0; index2 < this.selectionArr.length; index2++){
            if(this.partners[l].name === this.selectionArr[index2].name){
              var commentArr = {}
              commentArr.name = this.partners[l].name;
              commentArr.comment = this.partners[l].comment;
              this.commentList.push(commentArr);
            }
          }
        }
      },

      finalResult(){
        this.$api.event.selectFinalTime(this.$route.params.eventCode,this.$route.params.hostCode,
            {
              eventCode: this.$route.params.eventCode,
              hostCode: this.$route.params.hostCode,
              timeUnit: this.datasToCalendar.calendarFunction.idOfSelectTime
            }).then(res => {
              console.log(res.data)
              if(res.data.code === 200){
                this.$router.push({ name: 'finalresult', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode}});
              }
            }).catch(error => {
                console.log(error);
        });
      },

      //删除回应
      deleteResponse(){
        this.$confirm('是否永久删除这些回应?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectedResponse = this.selectionArr[0].idCode;
          for (let index = 0; index < this.responseList.length; index++) {
            for (let index2 = 1; index2 < this.selectionArr.length; index2++){
              if(this.responseList[index].name === this.selectionArr[index2].name){
                this.selectedResponse += ","+this.selectionArr[index2].idCode;
              };
            }
          }
          this.$api.event.deletePartnerResponse(this.$route.params.eventCode,this.$route.params.hostCode,
            {
              eventCode: this.$route.params.eventCode,
              hostCode: this.$route.params.hostCode,
              idCodeList: this.selectedResponse,
            }).then(res => {
              console.log(res.data)
              if(res.data.code === 200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
                //this.$router.push({ name: 'result', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode }})
                location. reload();
              }
            }).catch(error => {
                console.log(error);
          });
          //console.log(selectedResponse);
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },

      //页面渲染
      initData(){

        let formatapi = this.datasToCalendar.calendarFormat;  
        let eventapi = this.datasToCalendar.calendarFunction;
        
        //调用/eventinfo/{eventCode}接口，获取事件名称与事件描述信息
        this.$api.event.getResultByCode(this.$route.params.eventCode,
          {
            eventCode: this.$route.params.eventCode
          }
        ).then(res => {
            console.log(res.data)
            if(res.data.code === 200){
              //日历格式渲染
              formatapi.slotDuration = res.data.data.calendar.timeGap
              formatapi.defaultTimedEventDuration = res.data.data.calendar.timeGap
              let showHours = res.data.data.calendar.showHours.split(",")
              formatapi.slotMinTime = showHours[0] + ":00"
              formatapi.slotMaxTime = showHours[1] + ":00"
              let highlightHours = res.data.data.calendar.highlightHours.split(",")
              formatapi.businessHours = {
                //daysOfWeek: [ 1, 2, 3, 5, 6, 0],
                startTime: highlightHours[0],
                endTime: highlightHours[1], 
              }
              let hiddenDay = res.data.data.calendar.hiddenDays.split(",")
              formatapi.hiddenDays = []
              for(var i = 0; i<hiddenDay.length; i++){
                  formatapi.hiddenDays.push(Number(hiddenDay[i]));
                  
              }
              formatapi.validRange = {
                start: res.data.data.calendar.startTime,
                end: res.data.data.calendar.endTime
              }

              //事件相关渲染
              this.eventName = res.data.data.createInfo.eventName;
              this.eventInfo = res.data.data.createInfo.eventDescription;
            }
        }).catch(error => {
                console.log(error);
        });
        
        //调用/{eventCode}/result/{hostCode}结果接口，获取hostTime,preferTime,与timeDetail
        this.$api.event.getTimeDetail(this.$route.params.eventCode,this.$route.params.hostCode,
            {
              eventCode: this.$route.params.eventCode,
              hostCode: this.$route.params.hostCode
            }
          ).then(res => {
            console.log(res.data)
            if(res.data.code === 200){
                         
              let hostTime = res.data.data.hostTimeUnit;
              let preferTime = res.data.data.preferTimeUnit;
              let finalTime = res.data.data.finalTimeUnit;
              this.timeBlock = res.data.data.timeDetail;
              this.partners = res.data.data.partners;
              
              //获取json中的某个属性对应的值
              /* for(var l in oop){
                  tmp += oop[l].absentNum + ',';
                 }
                 console.log(tmp);
                 console.log(typeof(tmp)); */
                for (let index = 0; index < hostTime.length; index++) {
                  var nowEvent = {}
                  nowEvent.id = hostTime[index];
                  nowEvent.start = timeUnitIdToTime(hostTime[index]);
                  nowEvent.groupId = 'hostSelect';
                  for(var k in this.timeBlock){
                    if(this.timeBlock[k].timeUnit == hostTime[index]){
                      nowEvent.title = this.timeBlock[k].absentNum;
                    }
                  }
                  eventapi.events.push(nowEvent);
                }
                  //调用封装的方法，数组获取不到最后一个值
                  //this.addBlueBlock(hostTime,preferTime,timeDetail);
                if(preferTime.length >= 1){
                  this.addOrangeBlock(preferTime);
                }
                if(finalTime){
                  this.addFinalTimeBlock(finalTime);
                }
                    
                    //将普通时间块移除，新建推荐时间块，有问题
                    /* for(let i = 0; i<eventapi.events.length; i++){
                      for(let j = 0; j<preferTime.length; j++){
                        
                        if(eventapi.events[i].id == preferTime[j]){
                          
                          eventapi.events.splice(i,1);
                          
                          var preferEvent = {}
                          preferEvent.id = preferTime[j];
                          preferEvent.start = timeUnitIdToTime(preferTime[j]);
                          preferEvent.groupId = 'hostSelect';
                          preferEvent.backgroundColor = '#FAAD14';
                          preferEvent.borderColor = '#FAAD14';
                          eventapi.events.push(preferEvent);
                        }
                      }
                    } */
                //渲染回应列表
                for(var l = 0; l<this.partners.length; l++){
                  var invitee = {}
                  invitee.name = this.partners[l].name;
                  invitee.idCode = this.partners[l].idCode;
                  this.responseList.push(invitee);
                }
                  //console.log(this.responseList);
                
                 this.allElectionFun();
                 this.DefaultFullSelection();
            }
          }).catch(error => {
                console.log(error);
          });
          this.box = true;
      },

      //创建普通时间块
      /* addBlueBlock(preferTime,hostTime,timeDetail) {
        let eventapi = this.datasToCalendar.calendarFunction;
        for (let index = 0; index < hostTime.length; index++) {
          var nowEvent = {}
          nowEvent.id = hostTime[index];
          nowEvent.start = timeUnitIdToTime(hostTime[index]);
          nowEvent.groupId = 'hostSelect';
          for(var k in timeDetail){
            if(timeDetail[k].timeUnit == hostTime[index]){
              nowEvent.title = timeDetail[k].absentNum;
            }
          }
          //console.log(hostTime[index])
          eventapi.events.push(nowEvent);
        }
        //console.log(hostTime.length);
      }, */

      //创建推荐时间块
      addOrangeBlock(preferTime){
        let eventapi = this.datasToCalendar.calendarFunction;
        for(let i = 0; i<eventapi.events.length; i++){
          for(let j = 0; j<preferTime.length; j++){
            if(eventapi.events[i].id == preferTime[j]){
              eventapi.events[i].backgroundColor = '#FAAD14';
              eventapi.events[i].borderColor = '#FAAD14';
              eventapi.events[i].title = '';
            }
          }
        }
        //console.log(preferTime)
      },

      //创建最终时间
      addFinalTimeBlock(finalTime){
        let eventapi = this.datasToCalendar.calendarFunction;
        for(let i = 0; i<eventapi.events.length; i++){
            if(eventapi.events[i].id == finalTime){
              eventapi.events[i].backgroundColor = '#171972';
              eventapi.events[i].borderColor = '#171972';
              eventapi.events[i].title = '';
            }
        }
      },

      //获取需要默认显示的数据
      allElectionFun() { 
           this.allElection = [];
             for (var i = 0; i < this.responseList.length; i++) {
               this.allElection.push(this.responseList[i].name)
           }
      },

      DefaultFullSelection() {
        // 初始化 默认全部选中
        this.checkedPeople = this.allElection;
        let checkedCount = this.checkedPeople.length;
        this.checkAll = checkedCount === this.responseList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.responseList.length;
        this.selectionFun(this.checkedPeople);
      },

      selectionFun(selectionArr) { // 获取选中的对象
                this.selectionArr = [];
                for (var i = 0; i < this.responseList.length; i++) {
                  for (var j = 0; j < selectionArr.length; j++) {
                          if (selectionArr[j] === this.responseList[i].name) {
                            this.selectionArr.push(this.responseList[i])
                      }
                  }
                }
      },

      handleCheckAllChange(val) { // 全选
        this.allElectionFun();
         this.checkedPeople = val ? this.allElection : [];
         this.isIndeterminate = false;
           // console.log(this.checkedCities);
              this.selectionFun(this.checkedPeople);
             //console.log(this.selectionArr)
      },

      handleCheckedChange(value) { // 选中
             let checkedCount = value.length;
             this.checkAll = checkedCount === this.responseList.length;
              this.isIndeterminate = checkedCount > 0 && checkedCount < 
              this.responseList.length;
               this.selectionFun(value);
             //console.log(this.selectionArr)
      },

      changeBtn(){
            this.kjIsShow = !this.kjIsShow
            if(this.kjIsShow){
                this.kjIsShow = true;
                this.checkAll = true;
            }else{
                this.bkjIsShow = true;
                this.checkAll = false;
                this.checkedOne = false;
            }
      },

      changeBtn2(){
            this.bkjIsShow = !this.bkjIsShow
            if(this.bkjIsShow){
                this.kjIsShow = false;
                this.checkAll = false;
            }else{
                this.kjIsShow = true;
                this.checkAll = true;
                this.checkedOne = true;
            }
      },

      /* 日历相关 */
      // 与日历组件通信，时时更新this.datasToCalendar.calendarFunction.events
      getTimeUnit(timeUnit) {
        this.datasToCalendar.calendarFunction.events = timeUnit;
      },
      // 结果页面点击时间块的时候，子组件发送时间块的id给父组件
      getTimeUnitId(id) {
        this.datasToCalendar.calendarFunction.idOfSelectTime = id;
        let formatapi = this.datasToCalendar.calendarFormat;  
        let eventapi = this.datasToCalendar.calendarFunction;

        for(var m in this.timeBlock){
                if(this.timeBlock[m].timeUnit == eventapi.idOfSelectTime){
                  let str = this.timeBlock[m].timeUnit.split('-');
                  this.eventDate = str[0] + '-' + str[1] + '-' + str[2];
                  this.eventTime = str[3];
                  this.attend = this.timeBlock[m].attendNum;
                  this.absent = this.timeBlock[m].absentNum;
                  this.attendPro = this.timeBlock[m].attendPro;
                  this.absentPro = this.timeBlock[m].absentPro;
                  this.attendPeople = this.timeBlock[m].attendName;
                  this.absentPeople = this.timeBlock[m].absentName;
                  
                }
              }

            for(let i = 0; i<eventapi.events.length; i++){
              if(eventapi.events[i].id === eventapi.idOfSelectTime){
                eventapi.events[i].backgroundColor = '#333333';
              }
            }
        
        /* this.$api.event.getTimeDetail(this.$route.params.eventCode,this.$route.params.hostCode,
            {
              eventCode: this.$route.params.eventCode,
              hostCode: this.$route.params.hostCode
            }
          ).then(res => {
            console.log(res.data)
            if(res.data.code === 200){
               let timeDetail = res.data.data.timeDetail;
               
              for(var m in timeDetail){
                if(timeDetail[m].timeUnit == eventapi.idOfSelectTime){
                  let str = timeDetail[m].timeUnit.split('-');
                  this.eventDate = str[0] + '-' + str[1] + '-' + str[2];
                  this.eventTime = str[3];
                  this.canDo = timeDetail[m].attendNum;
                  this.canNotDo = timeDetail[m].absentNum;
                  this.canDoPro = timeDetail[m].attendPro;
                  this.canNotDoPro = timeDetail[m].absentPro;
                  this.canPeople = timeDetail[m].attendName;
                  this.canNotPeople = timeDetail[m].absentName;
                  
                }
              }

            }
          }).catch(error => {
                console.log(error);
          });    
           */
                    
            
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
}
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
  width: 200px;
  height: 40px;
  left: 25px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;
  line-height: 15px;
}

.timeTips2 {
  border-width: 0px;
  position: absolute;
  top: 32px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #FAAD14;
}

.timeTips2_text {
  position: absolute;
  top: 32px;
  left: 25px;
  width: 220px;
  height: 22px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;  
}

.timeTips3 {
  border-width: 0px;
  position: absolute;
  top: 64px;
  width: 15px;
  height: 15px;
  display: flex;
  background-color: #171972;
}

.timeTips3_text {
  position: absolute;
  top: 64px;
  left: 25px;
  width: 220px;
  height: 22px;
  font-weight: 600;
  font-size: 14px;
  color: #333333;  
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

.left_wrapper{
    position: absolute;
    top:220px;
    left: -60px;
}

.box-card {
  height: 160px;
  width: 200px;
}

.item p {
    width:250px;
    height: 30px;
    font-size: 13px;
    color: #409EFF;
    cursor: pointer;
}

/* .clearfix:before,
.clearfix:after {
   display: table;
   content: "";
}
.clearfix:after {
   clear: both
} */

.left_wrapper2{
    position: absolute;
    top:400px;
    left: -60px;
}

.box-card2 {
 /*  height: 280px; */
  width: 200px;
}

.el-scrollbar__bar{
  overflow: hidden;
  bottom: 0;
}

.el-scrollbar__bar.is-horizontal {
    height: 0px; 
}

.responseList{
  height: 280px;
  width: 200px;
}

.el-scrollbar__wrap {
   overflow-x: hidden;
}

.checkAll{
  width: 200px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.checkedPeople{
  width: 200px;
  margin-bottom: 10px;
}

.icon{
  position: absolute;
  left: 90px;
  cursor: pointer;
}

.iconyoujian{
  position: absolute;
  left: 115px;
  cursor: pointer;
}

.iconshanchu{
  position: absolute;
  left: 140px;
  cursor: pointer;
}

.right_wrapper{
    position: absolute;
    top: 220px;
    right: -80px;
}

.box-card3 {
  height: 460px;
  width: 200px;
}

.nameAndInfo{
  margin: auto;
  line-height: 20px;
  font-size: 13px;
}

.dateAndTime{
  margin: 20px auto;
  line-height: 20px;
  font-size: 13px;
}

.can{
  margin: auto;
  line-height: 20px;
  font-size: 13px;
}

.btnToFinal{
  margin: 20px auto;
  font-size: 13px;
}

.nameAndInfo .content, .dateAndTime .content, .can .content{
  font-size: 11px;
  margin: auto 5px;
}

.can .content{
  color: #409EFF;
}

/* .bottom_wrapper{
  position: absolute;
  top: 700px;
  left: 150px;
} */

.commentList{
  /* height: 300px; */
  margin-left: 30px;
  width: 600px;
}

.comment{
  width: 600px;
  margin-bottom: 10px;
}

/* .box-card_bottom{
  height: 200px;
  width: 900px;
}
 */
</style>