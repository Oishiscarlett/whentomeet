<template>
  <div>

    <div class="title">
      <p><span>常见问题反馈</span></p>
    </div>

    <el-collapse v-model="activeNames" @change="handleChange" class="qa">
      <el-collapse-item title="1.如何创建一个新事件？" name="1">
       <div > 
        单击包含您可用于会议或活动的时间/日期的网格，
        填写一个活动名称，然后按“创建事件”即可。 
        受邀者会看到您的建议时间，并可以点击对他们有空的时间。
       </div>
      </el-collapse-item>
      <el-collapse-item title="2.如何更改已创建的活动？" name="2">
        <div >
        在“个人中心”-“我创建的事件”页面上的结果链接下方，有一个链接可让您再次编辑事件。
        </div>
      </el-collapse-item>
      <el-collapse-item title="3.我的空闲时间已更改-如何返回并更改我的回复？" name="3">
        <div>
          首次填写任何事件的空闲时间时，系统将为您显示一个唯一链接，允许您随时返回和更新它。
          您还可以指定一个手机号码，以将更新链接发送给您。
          如果您当时没有保留更新链接，则可以在浏览器的历史记录中找到它。
          查找历史页面，或联系活动组织者，后者可以从其结果页面发送给您。
        </div>
      </el-collapse-item>
      <el-collapse-item title="4.人们已经回复使用该系统，我如何看到我的结果？" name="4">
        <div>
         如果事件链接到帐户，请登录并单击“个人中心”页面中的链接。否则，请点击导航栏“查看结果”，您将看到每个人的回应和反馈。
        </div>
      </el-collapse-item>
      <el-collapse-item title="5.有人给我发送了链接。我该怎么办？" name="5">
        <div>
         根据相应图示选择您有空的时间，然后输入您的姓名，点击“提交”。
         安排活动的人将能够比较每个人的空闲时间，并最终确定时间。
        </div>
      </el-collapse-item>
    </el-collapse>
    

  </div>
</template>

<script>
export default {
    name: 'FaqCpn',
    data() {
      return {
        activeNames: ['1']
      }
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
};
</script>

<style lang="less">

.title {
  border-width: 0px;
  position: absolute;
  left: 370px;
  top: 250px;
  width: 228px;
  height: 40px;
  display: flex;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 35px;
  letter-spacing: 3px;
  color: #797979;
}

.qa{
    position: absolute;
    left: 370px;
    top: 385px;
    .el-collapse-item__header
    {
        font-size: 18px;
        font-weight: 600;
    }
    .el-collapse-item__content {
        padding-bottom: 25px;
        font-size: 16px;
        color: #303133;
        line-height: 1.769230769230769;
    }
}

.el-collapse-item{
    width: 1000px;
}

</style>