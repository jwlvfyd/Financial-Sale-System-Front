<template>
    <div>
    <h-form :model="formItem" :label-width="80">
      <h2>客户信息</h2>
      <div style="display: flex; align-items: center;">
        <h-form-item label="身份证号" style="margin-right: 10px;">
          <h-input v-model="formItem.inputCustomerId" placeholder="请输入客户身份证号"></h-input>
        </h-form-item>
        <h-form-item>
          <h-button type="ghost" @click="customerQuery">查询</h-button>
        </h-form-item>
      </div>
    
      <div style="display: flex; align-items: center;">
        <h-form-item label="客户姓名">
          <h-input v-model="customerInfo.name" disabled="disabled"></h-input>
        </h-form-item>
        <h-form-item label="客户性别">
          <h-input v-model="customerInfo.gender" disabled="disabled"></h-input>
        </h-form-item>
      </div>
      <div style="display: flex; align-items: center;">
        <h-form-item label="联系方式">
          <h-input v-model="formItem.contactInfo" disabled="disabled"></h-input>
        </h-form-item>
        <h-form-item label="风险等级">
          <h-input v-model="formItem.riskLevel" disabled="disabled"></h-input>
        </h-form-item>
      </div>
    </h-form>

    <h-form :model="formItem" :label-width="80">
    <h2>基金产品</h2>
      <div style="display: flex; align-items: center;">
        <h-form-item label="产品名称" style="margin-right: 10px;">
          <h-input v-model="formItem.inputProductName" placeholder="请输入产品名称"></h-input>
        </h-form-item>
        <h-form-item>
          <h-button type="ghost" @click="prouductQuery">查询</h-button>
        </h-form-item>
      </div>
      <h-form-item label="">
        <h-select v-model="formItem.selectProduct" placeholder="请选择">
          <h-option value="beijing">北京市</h-option>
          <h-option value="shanghai">上海市</h-option>
          <h-option value="shenzhen">深圳市</h-option>
        </h-select>
      </h-form-item>
    </h-form>

    <h-form :model="formItem" :label-width="80">
      <h2>交易信息</h2>
      <h-form-item label="赎回份额">
        <h-input v-model="formItem.inputShare" placeholder="请输入赎回份额"></h-input>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="showConfirmBox = true">提交</h-button>
        <!-- <h-button type="ghost" style="margin-left: 8px;">取消</h-button> -->
      </h-form-item>
    </h-form>
    <h-msg-box
      v-model="showConfirmBox"
      :escClose="true"
      title="确认交易信息"
      @on-ok="finalSubmit"
    >
      <div>
        <p>客户姓名: </p>
        <!-- <p>客户性别: {{customerInfo.gender}}</p> -->
      </div>
    </h-msg-box>
    <h-msg-box
      v-model="showSuccessBox"
      :escClose="true"
      title="交易成功"
    >
      <p>流水单号：</p>.
      <p slot="footer">
        <!-- slot内可以放任意自定义内容 -->
        <!-- 点击取消和确定按钮时可实现自己的业务逻辑 -->
        <h-button type="primary" >继续赎回</h-button>
        <h-button>返回首页</h-button>
        <h-button>打印凭证</h-button>
      </p>
    </h-msg-box>

    </div>
</template>

<script>
import core from "@hsui/core";

export default {
    data() {
        return {
            formItem: {
                inputCustomerId:"",
                inputProductName:"",
                inputShare:"",
            },
            customerInfo:{},
            sharesInfo:[],
            showConfirmBox:false,
            showSuccessBox:false,
        };
    },
    created() {
        console.log("trade/Redeem")
    },
    methods: {
    customerQuery(){
        console.log("customerQuery")

        core
        .fetch({
          method: "get",
          url: "/api/taccount/query",
          data:{
            customerId: this.formItem.inputCustomerId
          }
        })
        .then((res) => {
            console.log(res)
            this.customerInfo = res.data.data;
            console.log(this.customerInfo)
        })
        .catch(() => {
          this.$hMessage.error({
            content: `查询${this.formItem.inputCustomerId}失败`,
            durtion: 3,
            closable: true,
          });
        });
    },
    ShareQuery() {
        core
        .fetch({
          method: "get",
          url: "/api/tquery/fundshare",
          data:{
            productName: this.formItem.inputProductName,
            customerId: this.formItem.inputCustomerId
          }
        })
        .then((res) => {
            console.log(res)
            this.sharesInfo = res.data.data.shares;
        })
        .catch(() => {
          this.$hMessage.error({
            content: `查询${this.formItem.inputProductName}失败`,
            durtion: 3,
            closable: true,
          });
        });
    },
      finalSubmit() {
        console.log("finalSubmit")
        core
        .fetch({
          method: "post",
          url: "/api/ttrade/redeem",
          data:{
            accountId:"",
            productId:"",
            share: this.formItem.inputShare,
            customerId: this.formItem.inputCustomerId
          }
        })
        .then((res) => {
            console.log(res)
            this.showSuccessBox = true;
            console.log(res.data.data.swiftNo)
        })
        .catch(() => {
          this.showSuccessBox = true;
          this.$hMessage.error({
            content: `赎回失败`,
            durtion: 3,
            closable: true,
          });
        });
        },
    },
    beforeDestroy() {
    },
};
</script>

<style lang="less" scoped>
  
</style>