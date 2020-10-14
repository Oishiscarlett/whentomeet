<template>
  <div>

    <div class="title">
      <p><span>常见问题反馈</span></p>
    </div>

    <el-collapse v-model="activeNames" @change="handleChange" class="qa">
      <el-collapse-item title="1.如何创建一个新事件？" name="1">
       <div > 
        单击包含您可用于会议或活动的时间/日期的网格，
        或者选择一个活动名称，然后按“ CREATE EVENT”。 
        他们会看到您的建议时间，并可以点击对他们有帮助的时间。
        点击“查看结果”，然后输入代码以查看所有反馈以及每个人可以做出的时间。
       </div>
      </el-collapse-item>
      <el-collapse-item title="2.如何更改已创建的活动？" name="2">
        <div >
        在“已创建事件”页面上的结果链接下方，有一个链接可让您编辑事件。
        如果您没有帐户，则可能要在此页面上添加书签以便以后访问。
        如果您在活动中增加时间并且已经做出回应，则可能需要请被邀请者再参加一次。
        您可以在结果页上找到个性化的“更新链接”，以供他们使用。
        </div>
      </el-collapse-item>
      <el-collapse-item title="3.我的空闲时间已更改-如何返回并更改我的回复？" name="3">
        <div>
          首次填写任何事件的可用性时，系统将为您显示一个唯一链接，允许您随时返回和更新它。
          您还可以指定一个电子邮件地址，以将更新链接发送给您。
          （如果您使用Whentomeet帐户，这些更新链接将自动存储在仪表板上）。
          如果您当时没有保留更新链接，则可以在浏览器的历史记录中找到它。
          查找名为“ Whentomeet：谢谢”的页面。或联系活动组织者，后者可以从其结果页面发送给您。
        </div>
      </el-collapse-item>
      <el-collapse-item title="4.人们已经回复使用该系统，我如何看到我的结果？" name="4">
        <div>
         如果事件链接到帐户，请登录并单击“您的帐户”页面中的链接。否则，请点击“输入结果代码”。您将看到每个人的回应和反馈。
        </div>
      </el-collapse-item>
      <el-collapse-item title="5.有人给我发送了链接。我该怎么办？" name="5">
        <div>
         灰色区域显示了此事件的建议时间/日期。涂上所有对您有好处的东西。
         然后输入您的姓名，然后按“发送响应”。安排活动的人将能够比较每个人的空闲时间，并告诉大家什么时候好。
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




/* .a1{
    position: absolute;
    left: 20px;
    top: 50px;
    width: 1000px;
    line-height: 25px;
    display: flex;
    font-size: 16px;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 500;
    font-style: normal;
    letter-spacing: 2px;
    color: #797979;
    align-items: center;
}

.q2{
    position: absolute;
    left: 370px;
    top: 435px;
    width: 1000px;
    height: 48px;
    line-height: 20px;
    display: flex;
    font-size: 18px;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    font-style: normal;
    letter-spacing: 2px;
    color: #797979;
    align-items: center;
}

.a2{
    position: absolute;
    left: 20px;
    top: 50px;
    width: 1000px;
    line-height: 25px;
    display: flex;
    font-size: 16px;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 500;
    font-style: normal;
    letter-spacing: 2px;
    color: #797979;
    align-items: center;
} */
</style>