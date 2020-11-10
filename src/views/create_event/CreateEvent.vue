<template>
    <div id="create-event">
      <page-tab-bar/>
      <div class="content-wrapper">
          <div class="calendar-wrapper">
              <Calendar @getTimeUnit='getTimeUnit' 
                        @getTimeUnitId='getTimeUnitId'
                        :Datas='datasToCalendar'/>
          </div>
          <div class="form-wrapper">
              <div class="calendar-form-wrapper">
                  <el-collapse>
                    <el-collapse-item title="调整日历格式" name="1">
                      <el-form :model="datasToCalendar" :rules="rules" ref="datasToCalendar" label-width="100px" class="calendar-form">
                          <el-form-item label="开始日期：" class="date">
                            <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="datasToCalendar.calendarFormat.validRange.start" style="width: 100%;"></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="结束日期：" class="date">
                            <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="datasToCalendar.calendarFormat.validRange.end" style="width: 100%;"></el-date-picker>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="每周隐藏：">
                            <el-checkbox-group v-model="datasToCalendar.calendarFormat.hiddenDays">
                                <el-checkbox label="星期日" name="hiddenDays"></el-checkbox>
                                <el-checkbox label="星期一" name="hiddenDays"></el-checkbox>
                                <el-checkbox label="星期二" name="hiddenDays"></el-checkbox>
                                <el-checkbox label="星期三" name="hiddenDays"></el-checkbox>
                                <el-checkbox label="星期四" name="hiddenDays"></el-checkbox>
                                <el-checkbox label="星期五" name="hiddenDays"></el-checkbox>
                                <el-checkbox label="星期六" name="hiddenDays"></el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                          <el-form-item label="展示时间：" class="time">
                            <el-time-select placeholder="开始时间" v-model="datasToCalendar.calendarFormat.slotMinTime" 
                                            :picker-options="{ start: '08:30', step: '01:00', end: '18:30' }"></el-time-select>
                            <span> 至 </span>
                            <el-time-select  placeholder="结束时间" v-model="datasToCalendar.calendarFormat.slotMaxTime" 
                                            :picker-options="{ start: '08:30', step: '01:00',  end: '18:30', minTime: datasToCalendar.calendarFormat.slotMinTime }"></el-time-select>
                          </el-form-item>
                          <el-form-item label="高亮时间：" class="time">
                              <el-time-select placeholder="开始时间" v-model="datasToCalendar.calendarFormat.businessHours.startTime" 
                                            :picker-options="{ start: '08:30', step: '01:00', end: '18:30' }"></el-time-select>
                              <span> 至 </span>
                              <el-time-select  placeholder="结束时间" v-model="datasToCalendar.calendarFormat.businessHours.endTime" 
                                            :picker-options="{ start: '08:30', step: '01:00',  end: '18:30', minTime: datasToCalendar.calendarFormat.businessHours.startTime }"></el-time-select>
                          </el-form-item>
                          <el-form-item label="时间间隔：">
                            <el-select v-model="datasToCalendar.calendarFormat.slotDuration" placeholder="请选择时间间隔">
                            <el-option label="1小时" value="01:00"></el-option>
                            <el-option label="2小时" value="02:00"></el-option>
                            </el-select>
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
                      <el-form-item class="submit-btn">
                        <el-button type="primary" @click="onSubmit('eventForm')">创建事件</el-button>
                      </el-form-item>
                  </el-form>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import PageTabBar from 'components/content/tabbar/PageTabBar'
import Calendar from 'components/content/calendar'

export default {
    name: 'CreateEvent',
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
                    slotMinTime: "06:00",
                    slotMaxTime: "22:00",
                    businessHours: {
                        daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], 
                        startTime: '08:00', 
                        endTime: '20:00',
                    },
                    hiddenDays: [  ], 
                    validRange: {
                        start: '2020-10-20',
                        end: '2020-12-20'
                    },
                },
                calendarFunction: {
                    selectable: true,
                    events: [],
                    pages: 'create',
                }
            },
            // 结果页面点击的时间块的id
            idOfSelectTime: '',
            // 事件相关表单
            eventForm: {
                name: '',
                duration: '1',
                durationUnit: 'hours',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
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
        },
        // 创建事件
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
                        this.$api.event.creatEvent({
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
                            isTimePublic: 1
                        }).then(res => {
                            // 创建事件成功并跳转分享链接页面
                            if(res.data.code === 200){
                                console.log(res.data);
                                localStorage.setItem('eventCode',res.data.data.eventCode);
                                localStorage.setItem('hostCode',res.data.data.hostCode);
                                this.$router.push('/create/sharelinks');
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
    }
}
</script>

<style scope>
.content-wrapper {
    padding-top: 100px;
}

.form-wrapper {
    margin: 0 auto 100px auto;
    width: 1100px;
    background-color: #E8F8FF;
}

.el-collapse-item__header {
    background-color: #E8F8FF;
    font-size: 30px;
    font-weight: bold;
    margin: 0 60px;
    color: black;
}

.el-collapse-item__arrow {
    margin: 0 10px;
}

.el-collapse-item__content {
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

.duration-unit-box .el-form-item__content {
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