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
                    <!-- <span class="left">
                        <el-button type="primary">生成结果图片</el-button>
                    </span>
                    <span class="center">
                        <el-button type="primary" @click="down()">导入日历</el-button>
                    </span> -->
                    <span class="right">
                        <el-button type="primary" @click="renewFinal()">重新选择时间</el-button>
                    </span>
                </div>

                <!-- <el-dialog
                    title="将活动信息导入日历"
                    :visible.sync="dialogVisible"
                    width="30%"
                    >
                    <span style="cursor:pointer" @click="down()">
                        导入日历
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog> -->

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
            title: '',
            description: '',
            date: '',
            time: '',
            duration: '',
            attendance: {
                num: '',
                percentage: '',
                peopleList: []
            },
            nonAttendance: {
                num: '',
                percentage: '',
                peopleList: []
            },
            dialogVisible: false,
            //link: ''
        }
    },
    mounted() {
        this.$api.event.getFinalResult(this.$route.params.eventCode,{
              eventCode: this.$route.params.eventCode
            }).then(res => {
                this.title = res.data.data.eventName;
                this.description = res.data.data.eventDescription;
                this.date = res.data.data.finalTimeUnit.substring(0,10);
                this.time = res.data.data.finalTimeUnit.substring(11,19);

                let time =  res.data.data.eventDuration.split(',');
                if(time[1] === 'minutes'){
                    this.duration = time[0] + "分钟";
                }else if(time[1] === 'hours'){
                    this.duration = time[0] + "小时";
                }else{
                    this.duration = time[0] + "天";
                }
                
                this.attendance.num = res.data.data.attendNum;
                this.attendance.percentage = '（' + res.data.data.attendPro + '%）';
                this.attendance.peopleList = res.data.data.attendName.split(',');

                this.nonAttendance.num = res.data.data.absentNum;
                this.nonAttendance.percentage = '（' + res.data.data.absentPro + '%）';
                this.nonAttendance.peopleList = res.data.data.absentName.split(',');
            })
    },
    methods:{
        /* 导入日历 */
        /* downloadToCalendar(){
            this.dialogVisible = true;
            
        }, */

        /* down(){
            this.$api.event.exportToCalendar(this.$route.params.eventCode,{
                eventCode:this.$route.params.eventCode
            })
            .then(res =>{
                
                const content = res.data
                const blob = new Blob([content],{type: 'text/calendar'})//构造一个blob对象来处理数据
                const fileName = 'when2meet.ics'

                //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
                //IE10以上支持blob但是依然不支持download
                if ('download' in document.createElement('a')) { //支持a标签download的浏览器
                    const link = document.createElement('a')//创建a标签
                    link.download = fileName//a标签添加属性
                    link.style.display = 'none'
                    link.href = URL.createObjectURL(blob)
                    document.body.appendChild(link)
                    link.click()//执行下载
                    URL.revokeObjectURL(link.href) //释放url
                    document.body.removeChild(link)//释放标签
                } else { //其他浏览器
                    navigator.msSaveBlob(blob, fileName)
                }

            }).catch((err)=>{
                console.log(err);
            })
        }, */

        /* 重新选择时间 */
        renewFinal(){
            this.$router.push({ name: 'result', params: { eventCode: this.$route.params.eventCode, hostCode: this.$route.params.hostCode}});
        },
    }
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
