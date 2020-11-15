<template>
    <div>
      <page-tab-bar/>
      <div class="result-card-wrapper">
        <el-card class="result-card">
            <div class="result-card-inner">
                <div class="result-title">
                    <span>{{ title }}</span>
                </div>
                <div class="result-description">
                    <!-- <span>事件描述</span> -->
                    <span>{{ description }}</span>
                </div>
                <div class="result-time">
                    <div class="date-time">
                        <span class="date">事件日期：{{ date }}</span>
                        <span class="time">事件时间：{{ time }}</span>
                    </div>
                    <span class="duration">事件持续时间：{{ duration }}</span>
                </div>
                <div class="result-personnel">
                    <div class="attendance">
                        <span class="title">参与者：{{ attendance.num }}{{ attendance.percentage }}</span>
                        <span class="people" v-for="per in attendance.peopleList">{{ per }}</span>    
                    </div>
                    <div class="blank"></div>
                     <div class="non-attendance">
                        <span class="title">不能参与者：{{ nonAttendance.num }}{{ nonAttendance.percentage }}</span>
                        <span class="people" v-for="per in nonAttendance.peopleList">{{ per }}</span> 
                    </div>
                </div>
                <div class="result-button">
                    <span class="left">
                        <el-button type="primary">生成结果图片</el-button>
                    </span>
                    <span class="center">
                        <el-button type="primary">导入日历</el-button>
                    </span>
                    <span class="right">
                        <el-button type="primary">重新选择时间</el-button>
                    </span>
                </div>
            </div>
        </el-card>
      </div>
    </div>
</template>

<script>
import PageTabBar from '@/components/content/tabbar/PageTabBar'
export default {
    name: 'FinalResult',
    components: {
        PageTabBar
    },
    data() {
        return {
            title: '全体会议',
            description: '11月第一次全体会议',
            date: '2020.11.11',
            time: '15：00',
            duration: '2小时',
            attendance: {
                num: '10人',
                percentage: '（50%）',
                peopleList: [ '小城', '小单', '小黑', '小白', '小黄', '小城', '小单', '小黑', '小白', '小黄']
            },
            nonAttendance: {
                num: '10人',
                percentage: '（50%）',
                peopleList: [ '小城', '小单', '小黑', '小白', '小黄', '小城', '小单', '小黑', '小白', '小黄']
            }
        }
    },
}
</script>

<style scoped>
.result-card-wrapper {
    width: 800px;
    margin: 150px auto 0 auto;
}
.result-title {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
}
.result-description {
    text-align: center;
}
.result-description span {
    display: block;
    line-height: 25px;
}
.result-time {
    margin: 30px;
    line-height: 35px;
    font-size: 20px;
    font-weight: bold;
}
.result-time .date-time {
    display: flex;
}
.result-time .date-time span {
    flex: 1;
}
.result-time .duration {
    display: block;
}
.result-personnel {
    margin: 50px 30px;
    display: flex;
    line-height: 25px;
}
.result-personnel .blank {
    flex: 0.3;
}
.result-personnel .attendance {
    display: inline-block;
    /* padding-right: 40px; */
    flex: 1;
}
.result-personnel .non-attendance {
    display: inline-block;
    flex: 1;
}
.result-personnel .title {
    font-size: 18px;
    font-weight: bold;
    display: block;
}
.result-personnel .people {
    /* display: block; */
    margin: 10px 10px 0 0;
}
.result-button {
    margin: 80px 50px 20px 30px;
    display: flex;
}
.result-button span {
    flex: 1;
}
.result-button .left {
    text-align: left;
}
.result-button .center {
    text-align: center;
}
.result-button .right {
    text-align: right;
}
</style>
