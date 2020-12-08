<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
        ref="fullCalendar"
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createTimeUnitId,timeUnitIdToTime } from '@/utils/calendar-utils'
export default {
  name: 'Calendar',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    Datas: Object
  },
  watch: {
    // 监听日历格式的变化
    'Datas.calendarFormat':{
      deep: true,
      handler(newV,oldV) {
        this.calendarOptions.slotDuration = newV.slotDuration
        this.calendarOptions.defaultTimedEventDuration = newV.defaultTimedEventDuration
        this.calendarOptions.slotMinTime = newV.slotMinTime
        this.calendarOptions.slotMaxTime = newV.slotMaxTime
        this.calendarOptions.businessHours = newV.businessHours
        this.calendarOptions.hiddenDays = newV.hiddenDays
        this.calendarOptions.validRange = newV.validRange
      }
    }
  },
  data: function() {
    return {
      calendarOptions: {
        /***************************
        *    日历的默认配置
        *    一般不作修改
        ***************************/ 
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        // 默认展示视图：周
        initialView: 'timeGridWeek',
        // 是否使用选择的占位符
        selectMirror: true,
        // 选择事件的时间间隔可调整
        eventDurationEditable: true,
        // 改成中文日历
        locale: "zh-cn",
        // 全天选项
        allDaySlot: false,
        // 日历的宽高比例：宽：高
        // aspectRatio: 3,
        // 日历内容的高度
        contentHeight: "auto",
        // 不允许用户选择已经选择过的时间点
        selectOverlap: false,
        displayEventEnd: false,
        // slotLabelFormat:{
        //   hour: 'numeric',
        //   minute: '2-digit',
        //   omitZeroMinute: true,
        //   meridiem: 'short',
        //   hour12: false //设置时间为24小时
        // },
        // 设置事件的时间为24小时制
        eventTimeFormat: { // like '14:30'
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false //设置时间为24小时
        },
        /***************************
        *     用户可调整的属性
        *  与调整日历格式相关功能有关
        ***************************/ 
        // 设置默认显示的时间间隔
        slotDuration: this.Datas.calendarFormat.slotDuration, 
        // 选择的时间的默认间隔（应与slotDuration保持一致）
        defaultTimedEventDuration: this.Datas.calendarFormat.defaultTimedEventDuration,
        // 日历显示的最早时间
        slotMinTime: this.Datas.calendarFormat.slotMinTime,
        // 日历显示的最晚时间
        slotMaxTime: this.Datas.calendarFormat.slotMaxTime,
        // 强调日历中的某些时间段
        businessHours: this.Datas.calendarFormat.businessHours,
        // 隐藏一周当中的某天
        hiddenDays: this.Datas.calendarFormat.hiddenDays, 
        // 日历开始与结束的时间
        validRange: this.Datas.calendarFormat.validRange,
        /***************************
        *     开发者根据页面功能
        *      需要调整的属性
        ***************************/ 
        // 日历是否可选
        selectable: this.Datas.calendarFunction.selectable,
        // 背景时间：用于显示发起者未选择的时间
        events: this.Datas.calendarFunction.events,
        /***************************
        *         回调函数
        ***************************/ 
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        slotLaneContent: this.handleLaneContent,
        
      },
      // 存储选择的时间
      selectTime: [],
      // 标注当前页面
      pages: this.Datas.calendarFunction.pages
    }
  },
  methods: {
    // 创建已经选择的时间
    handleDateSelect(selectInfo) {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      calendarApi.addEvent({
        // 此处的id就是对应timeUnit的id
        id: createTimeUnitId(selectInfo.start),
        start: selectInfo.start,
        groupId: 'hostSelect',
      })
      // 更新父组件中的时间块
      this.$emit('getTimeUnit',this.selectTime);
    },
    // 点击已选择的时间，删除已经选择的时间
    handleEventClick(clickInfo) {
      // 如果是创建事件页面,点击就是取消选择
      if (this.pages === 'create') {
        clickInfo.event.remove();
        this.$emit('getTimeUnit',this.selectTime);
      }else if(this.pages === 'select' || this.pages === 'update'){
        // 如果是填写事件页面
          this.$emit('getTimeUnitId', clickInfo.event.id);
      }else if(this.pages === 'result' ){
        // 若是结果页面，返回点击时间的id，根据id查找数据，渲染
        this.$emit('getTimeUnitId', clickInfo.event.id);
      }
    },
    // 更新存储的已经选择的时间
    handleEvents(events) {
      this.selectTime = events;
    },
    // 在日历的单元格内添加时间标注
    handleLaneContent(arg) {
      // 用于存储新建的元素
      let arrayOfDomNodes = [];
      for (let index = 0; index < 7 - this.calendarOptions.hiddenDays.length; index++) {
        let timeEl = document.createElement('span');
        // 为新建的元素添加属性
        timeEl.classList.add("time-unit");
        timeEl.innerHTML = arg.date.toString().slice(16,21);
        arrayOfDomNodes.push(timeEl);
      }
      return { domNodes: arrayOfDomNodes };
    }
  },
  mounted() {
    if(this.pages === 'create'){
      let calendarApi = this.$refs.fullCalendar.getApi()
      this.$emit('getTodayDate', calendarApi.getDate());
      calendarApi.next()
      calendarApi.prev()
    }
  }
}
</script>

<style>
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
.fc-timegrid-slot-lane {
  text-align: center;
  display: flex;
}
.fc-timegrid-slot-lane span {
  flex: 1;
}
.fc-event-main span i{
  float: right;
  margin-right: 10px;
  color: #bfbfbf;
  /* font-weight: bold; */
}
.fc-button-primary {
    background-color: white!important;
    border: 2px solid #DCDFE6!important;
    color: #298FEC!important;
}
.fc-icon {
    font-weight: bold!important;
}
.fc-day-disabled {
  background-color: rgba(100,100,100,0.3)!important;
}
.fc-event-main{
    text-align: center;
    font-size: 13px;
}
.fc-col-header-cell {
  font-size: 20px;
}
</style>
