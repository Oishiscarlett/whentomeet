<template>
    <div id="create-event">
      <page-tab-bar/>
      <div class="content-wrapper">
          <div class="calendar-wrapper">
              <Calendar @getTimeUnit='getTimeUnit' 
                        @getTimeUnitId='getTimeUnitId'
                        @getTodayDate='getTodayDate'
                        :Datas='datasToCalendar'/>
          </div>
          <div class="form-wrapper">
              <div class="calendar-form-wrapper">
                  <el-collapse>
                    <el-collapse-item title="调整日历格式" name="1">
                      <el-form :model="calendarForm" :rules="rules" ref="calendarForm" label-width="100px" class="calendar-form">
                          <el-form-item label="开始日期：" class="date">
                            <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="calendarForm.validRange.start" style="width: 100%;"></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="结束日期：" class="date">
                            <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="calendarForm.validRange.end" style="width: 100%;"></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="每周隐藏：">
                            <el-checkbox-group v-model="calendarForm.hiddenDays">
                                <el-checkbox label="星期一"></el-checkbox>
                                <el-checkbox label="星期二"></el-checkbox>
                                <el-checkbox label="星期三"></el-checkbox>
                                <el-checkbox label="星期四"></el-checkbox>
                                <el-checkbox label="星期五"></el-checkbox>
                                <el-checkbox label="星期六"></el-checkbox>
                                <el-checkbox label="星期日"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="展示时间：" class="time">
                            <el-time-select placeholder="开始时间" v-model="calendarForm.slotMinTime" 
                                            :picker-options="{ start: '00:00', step: calendarForm.slotDuration, end: '23:45' }"></el-time-select>
                            <span> 至 </span>
                            <el-time-select  placeholder="结束时间" v-model="calendarForm.slotMaxTime" 
                                            :picker-options="{ start: '00:00', step: calendarForm.slotDuration, end: '23:45', 
                                                                minTime: calendarForm.slotMinTime }"></el-time-select>
                          </el-form-item>
                          <el-form-item label="高亮时间：" class="time">
                              <el-time-select placeholder="开始时间" v-model="calendarForm.businessHours.startTime" 
                                            :picker-options="{ start: '00:00', step: calendarForm.slotDuration, end: '23:45', }"></el-time-select>
                              <span> 至 </span>
                              <el-time-select  placeholder="结束时间" v-model="calendarForm.businessHours.endTime" 
                                            :picker-options="{ start: '00:00', step: calendarForm.slotDuration, end: '23:45', 
                                                                minTime: calendarForm.businessHours.startTime,}"></el-time-select>
                          </el-form-item>
                          <el-form-item label="时间间隔：">
                            <el-select v-model="calendarForm.slotDuration" placeholder="请选择时间间隔">
                            <el-option label="15分钟" value="00:15"></el-option>
                            <el-option label="30分钟" value="00:30"></el-option>
                            <el-option label="1小时" value="01:00"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item class="change-btn">
                            <el-button type="primary" @click="changeCalendarFormat">更改</el-button>
                          </el-form-item>
                      </el-form>
                    </el-collapse-item>
                  </el-collapse>
              </div>
              <div class="event-form-wrapper">
                  <div class="event-form-title">
                      <span>创建事件</span>
                  </div>
                  <el-form :model="eventForm" :rules="rules" ref="eventForm" label-width="100px" class="event-form">
                      <el-form-item label="事件名称：" prop="name" class="name-box">
                        <el-input v-model="eventForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="持续时间：" prop="duration" class="duration-box">
                        <el-input v-model="eventForm.duration"></el-input>
                      </el-form-item>
                      <el-form-item prop="durationUnit" class="duration-unit-box">
                        <el-select v-model="eventForm.durationUnit">
                          <el-option label="天" value="days"></el-option>
                          <el-option label="小时" value="hours"></el-option>
                          <el-option label="分钟" value="minutes"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="活动形式：" prop="desc" class="desc-box">
                        <el-input type="textarea" v-model="eventForm.desc" :rows="7"></el-input>
                      </el-form-item>
                      <el-form-item prop="public">
                          <el-tooltip placement="bottom-start">
                            <div slot="content">选中后，每个时间选择的人数<br/>将会以颜色深浅的方式展示给所有人</div>
                            <el-checkbox v-model="eventForm.public">公开所有人的选项</el-checkbox>
                          </el-tooltip>
                      </el-form-item>
                      <el-form-item class="submit-btn">
                        <el-button type="primary" @click="onSubmit('eventForm')">更新事件</el-button>
                      </el-form-item>
                  </el-form>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
import Calendar from '@/components/content/calendar'
import { calendarMaxTime,dateToString,stringToDate,timeUnitIdToTime,calendarFormMaxTime } from '@/utils/calendar-utils'
import { formatDate } from '@fullcalendar/vue'
export default {
    name: 'Edit',
    components:{
        PageTabBar,
        Calendar
    },
    data() {
        return {
            // 传给日历组件的数据
            datasToCalendar: {
                calendarFormat: {
                    slotDuration: '01:00', 
                    defaultTimedEventDuration: '01:00',
                    slotMinTime: "07:00",
                    slotMaxTime: "23:00",
                    businessHours: {
                        daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], 
                        startTime: '09:00', 
                        endTime: '21:00',
                    },
                    hiddenDays: [], 
                    validRange: {
                        start: '',
                        end: ''
                    }
                },
                calendarFunction: {
                    selectable: true,
                    events: [],
                    pages: 'create',
                }
            },
            // 结果页面点击的时间块的id
            idOfSelectTime: '',
            // 日历格式表单
            calendarForm: {
                slotDuration: '',
                slotMinTime: "",
                slotMaxTime: "",
                businessHours: {
                    daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], 
                    startTime: '', 
                    endTime: '',
                },
                hiddenDays: [], 
                validRange: {
                    start: '',
                    end: ''
                }
            },
            // 事件相关表单
            eventForm: {
                name: '',
                duration: '',
                durationUnit: '',
                desc: '',
                public: true
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        // 获取上一次提交的数据，初始化数据
        initData(){
            let formatapi = this.datasToCalendar.calendarFormat;  
            let eventapi = this.datasToCalendar.calendarFunction;
            
            //调用日历渲染接口
            this.$api.event.getResultByCode(this.$route.params.eventCode,{
                eventCode: this.$route.params.eventCode
            }).then(res => {
                if(res.data.code === 200){
                    let resapi = res.data.data;
                    // 日历格式相关数据渲染与存储
                    formatapi.slotDuration = resapi.calendar.timeGap;
                    this.calendarForm.slotDuration = resapi.calendar.timeGap;
                    formatapi.defaultTimedEventDuration = resapi.calendar.timeGap;
                    let slotTime = resapi.calendar.showHours.split(',');
                    formatapi.slotMinTime = slotTime[0];
                    formatapi.slotMaxTime = slotTime[1];
                    this.calendarForm.slotMinTime = slotTime[0];
                    this.calendarForm.slotMaxTime = calendarFormMaxTime(slotTime[1],resapi.calendar.timeGap);
                    let highlightHour = resapi.calendar.highlightHours.split(',');
                    formatapi.businessHours.startTime = highlightHour[0];
                    formatapi.businessHours.endTime = highlightHour[1];
                    this.calendarForm.businessHours.startTime = highlightHour[0];
                    this.calendarForm.businessHours.endTime = calendarFormMaxTime(highlightHour[1],resapi.calendar.timeGap);
                    /* let hiddenDay = resapi.calendar.hiddenDays.split(',');
                    hiddenDay.forEach(element => {
                        switch (element) {
                            case '1':
                                this.calendarForm.hiddenDays.push('星期一');
                                break;
                            case '2':
                                this.calendarForm.hiddenDays.push('星期二');
                                break;
                            case '3':
                                this.calendarForm.hiddenDays.push('星期三');
                                break;
                            case '4':
                                this.calendarForm.hiddenDays.push('星期四');
                                break;    
                            case '5':
                                this.calendarForm.hiddenDays.push('星期五');
                                break;
                            case '6':
                                this.calendarForm.hiddenDays.push('星期六');
                                break;
                            case '0':
                                this.calendarForm.hiddenDays.push('星期日');
                                break;    
                            default:
                                    break;
                        }
                    }); */
                    if(res.data.data.calendar.hiddenDays){
                    let hiddenDay = res.data.data.calendar.hiddenDays.split(",")
                    
                    formatapi.hiddenDays = []
                    for(var i = 0; i<hiddenDay.length; i++){
                        
                            formatapi.hiddenDays.push(Number(hiddenDay[i]));
                        
                    }
                }
                    //console.log(formatapi.hiddenDays);
                    formatapi.validRange.start = resapi.calendar.startTime;
                    formatapi.validRange.end = resapi.calendar.endTime;
                    this.calendarForm.validRange.start = resapi.calendar.startTime;
                    let end = new Date();
                    let endTime = stringToDate(resapi.calendar.endTime);
                    let sub = endTime.getTime() - 86400000;
                    end.setTime(sub);
                    this.calendarForm.validRange.end = dateToString(end);
                    // 事件相关数据渲染与存储
                    this.eventForm.name = resapi.createInfo.eventName;
                    this.eventForm.desc = resapi.createInfo.eventDescription;
                    let duration = resapi.createInfo.eventDuration.split(',');
                    this.eventForm.duration = duration[0];
                    this.eventForm.durationUnit = duration[1];
                    this.eventForm.public = Boolean(resapi.isTimePublic);
                    
                    //将传回的数据调整成日历所需格式
                    let time = resapi.createInfo.timeUnit;
                    let timeStr = time.split(",");
                    //日历中显示发起者所选的时间
                    for (let index = 0; index < timeStr.length; index++) {
                        var nowEvent = {}
                        nowEvent.id = timeStr[index];
                        nowEvent.start = timeUnitIdToTime(timeStr[index]);
                        nowEvent.groupId = 'hostSelect';
                        eventapi.events.push(nowEvent);
                    }
                }
            })
        },
        // 与日历组件通信，时时更新this.datasToCalendar.calendarFunction.events
        getTimeUnit(timeUnit) {
            this.datasToCalendar.calendarFunction.events = timeUnit;
        },
        // 结果页面点击时间块的时候，子组件发送时间块的id给父组件
        getTimeUnitId(id) {
            this.idOfSelectTime = id;
        },
        // 设置日历默认显示的范围
        getTodayDate(today){
            this.datasToCalendar.calendarFormat.validRange.start = dateToString(today);
            this.calendarForm.validRange.start = dateToString(today);
            let endCalendar = new Date();
            let endForm = new Date();
            // 默认的时间间隔是35天（5周）
            let add1 = today.getTime() + 3024000000
            let add2 = today.getTime() + 3110400000
            endForm.setTime(add1);
            endCalendar.setTime(add2);
            this.datasToCalendar.calendarFormat.validRange.end = dateToString(endCalendar);
            this.calendarForm.validRange.end = dateToString(endForm);
        },
        // 动态调整日历的格式
        changeCalendarFormat() {
            // 更改日历的格式，清空选中的时间块
            this.datasToCalendar.calendarFunction.events.splice(0,this.datasToCalendar.calendarFunction.events.length);
            // 更新日历数据
            let formatapi = this.datasToCalendar.calendarFormat;
            formatapi.slotDuration = this.calendarForm.slotDuration
            formatapi.defaultTimedEventDuration = this.calendarForm.slotDuration
            formatapi.slotMinTime = this.calendarForm.slotMinTime
            formatapi.slotMaxTime = calendarMaxTime(this.calendarForm.slotMaxTime,this.calendarForm.slotDuration)
            formatapi.businessHours.startTime = this.calendarForm.businessHours.startTime
            formatapi.businessHours.endTime = calendarMaxTime(this.calendarForm.businessHours.endTime,this.calendarForm.slotDuration)
            formatapi.hiddenDays = []
            this.calendarForm.hiddenDays.forEach(element => {
                if(element === "星期一"){
                    formatapi.hiddenDays.push(1);
                }else if(element === "星期二"){
                    formatapi.hiddenDays.push(2);
                }else if(element === "星期三"){
                    formatapi.hiddenDays.push(3);
                }else if(element === "星期四"){
                    formatapi.hiddenDays.push(4);
                }else if(element === "星期五"){
                    formatapi.hiddenDays.push(5);
                }else if(element === "星期六"){
                    formatapi.hiddenDays.push(6);
                }else if(element === "星期日"){
                    formatapi.hiddenDays.push(0);
                }
            })
            formatapi.validRange.start = dateToString(this.calendarForm.validRange.start);
            let end = new Date();
            let calendarFormEnd = stringToDate(this.calendarForm.validRange.end);
            let add = calendarFormEnd.getTime() + 86400000;
            end.setTime(add);
            formatapi.validRange.end = dateToString(end);
        },
        // 重新编辑并提交事件
        onSubmit(eventForm){
            this.$refs[eventForm].validate((valid) => {
                if (valid) {
                    let formatapi = this.datasToCalendar.calendarFormat;  
                    let eventapi = this.datasToCalendar.calendarFunction;
                    // 判断是否已经选择时间
                    if(eventapi.events.length > 0) {
                        // 已经选择时间，对传给后端的数据进行处理
                        let showHour = formatapi.slotMinTime + ',' + formatapi.slotMaxTime;
                        let highlightHour = formatapi.businessHours.startTime + ',' + formatapi.businessHours.endTime;
                        let eventduration = this.eventForm.duration + ',' + this.eventForm.durationUnit;
                        let hiddenDay = '';
                        if(formatapi.hiddenDays.length > 0) {
                            hiddenDay = formatapi.hiddenDays[0];
                            for (let index = 1; index < formatapi.hiddenDays.length; index++) {
                                hiddenDay += ',' + formatapi.hiddenDays[index];
                            }
                        }
                        
                        let eventsId = eventapi.events[0].id;
                        for (let index = 1; index < eventapi.events.length; index++) {
                            eventsId += ',' + eventapi.events[index].id;
                        }
                        // 请求上传数据
                        this.$api.event.editEvent(this.$route.params.eventCode,this.$route.params.hostCode,{
                            eventCode: this.$route.params.eventCode,
                            hostCode: this.$route.params.hostCode,
                            
                            startTime: formatapi.validRange.start,
                            endTime: formatapi.validRange.end,
                            hiddenDays: hiddenDay,
                            showHours: showHour,
                            highlightHours: highlightHour,
                            timeGap: formatapi.slotDuration,
                            hideDate: 0,
                            timeUnit: eventsId,
                            eventName: this.eventForm.name,
                            eventDuration: eventduration,
                            eventDescription: this.eventForm.desc,
                            isTimePublic: Number(this.eventForm.public)
                        }).then(res => {
                            // 创建事件成功并跳转分享链接页面
                            if(res.data.code === 200){
                                console.log(res.data);
                                this.$router.push({ name: 'sharelinks', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode}});
                            }
                        })
                    }else {
                        // 没有选择时间 弹出提示
                        this.$alert('没有选择时间！', '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    created() {
        this.initData()
    }
}
</script>

<style scoped>
.content-wrapper {
    padding-top: 100px;
}
.form-wrapper {
    margin: 0 auto 100px auto;
    width: 1100px;
    background-color: #E8F8FF;
}
.calendar-form-wrapper >>> .el-collapse-item__header {
    background-color: #E8F8FF;
    font-size: 30px;
    font-weight: bold;
    margin: 0 60px;
    color: black;
}
.calendar-form-wrapper >>> .el-collapse-item__content {
    background-color: #E8F8FF;
}
.calendar-form {
    padding: 30px 50px;
}
.calendar-form .date {
    width: 450px;
    display: inline-block;
}
.calendar-form .date .el-form-item__content {
    margin-left: 0px!important;
}
.event-form-wrapper {
    padding: 30px 50px;
}
.event-form-title {
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 30px;
    font-weight: bold;
}
.name-box {
    width: 300px;
    display: inline-block;
}
.duration-box {
    display: inline-block;
    margin-left: 50px;
}
.duration-unit-box {
    display: inline-block;
}
.duration-unit-box >>> .el-form-item__content {
    margin-left: 20px!important;
}
.desc-box {
    width: 860px;
}
.submit-btn {
    margin-top: 50px;
    margin-left: 300px;
}
</style>