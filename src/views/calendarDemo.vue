<template>
  <div>
    <page-tab-bar></page-tab-bar>
    <div class="calendar-box">
        <Calendar @getTimeUnit='getTimeUnit' 
              @getTimeUnitId='getTimeUnitId'
              :Datas='datasToCalendar'/>
    </div>
     
  </div>
</template>

<script>
import PageTabBar from '../components/content/tabbar/PageTabBar'
import Calendar from '../components/content/calendar'


export default {
    name: 'demo',
    components: {
      PageTabBar,
      Calendar
    },
    data() {
        return {
            datasToCalendar: {
                calendarFormat: {
                slotDuration: '01:00', 
                defaultTimedEventDuration: '01:00',
                slotMinTime: "06:00:00",
                slotMaxTime: "22:00:00",
                businessHours: {
                    daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0], 
                    startTime: '08:00', 
                    endTime: '20:00',
                },
                hiddenDays: [  ], 
                validRange: {
                    start: '2020-10-11',
                    end: '2020-11-11'
                },
            },
                calendarFunction: {
                    selectable: true,
                    events: [
                        {
                            groupId: "hostChoose",
                            id: '2020-11-02-10:00:00-1',
                            start: '2020-11-02T10:00:00',
                            backgroundColor: '#FF6633',
                            title: '1'
                        }
                    ],
                    pages: 'create',
                }
            },
            idOfSelectTime: ''
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
        }
    }
}
</script>

<style>
.calendar-box {
    padding: 100px 0;
}

</style>