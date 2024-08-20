<template>
    <div>
    <h-form :model="formItem" :label-width="80">
      <h2>撤单</h2>
      <div style="display: flex; align-items: center;">
        <h-form-item label="身份证号" style="margin-right: 10px;">
          <h-input v-model="formItem.inputCustomerId" placeholder="请输入客户身份证号"></h-input>
        </h-form-item>
        <h-form-item>
          <h-button type="ghost" @click="tradeQuery">查询</h-button>
        </h-form-item>
      </div>
    </h-form>

    <h-form :model="formItem" :label-width="80">
      <h2>交易信息</h2>
      <h-form-item label="今日交易">
        <h-select v-model="formItem.Account" placeholder="请选择">
          <h-option value="beijing">北京市</h-option>
          <h-option value="shanghai">上海市</h-option>
          <h-option value="shenzhen">深圳市</h-option>
        </h-select>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="showConfirmBox = true">撤单</h-button>
      </h-form-item>
    </h-form>

    <h-msg-box
      v-model="showConfirmBox"
      :escClose="true"
      title="确认交易信息"
      @on-ok="finalSubmit"
    >
      <p>客户姓名：</p>
      <p>基金名称：</p>
      <p>账户信息：</p>
      <p>交易金额：</p>
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
            },
            tradeInfo:[],
            swiftNo:"",
            showConfirmBox:false,
        };
    },
    created() {
        console.log("trade/Cancellation")
    },
    methods: {
        tradeQuery(){
            core
            .fetch({
            method: "get",
            url: "/api/tquery/trade",
            data:{
                customerId: this.formItem.inputCustomerId
            }
            })
            .then((res) => {
                console.log(res)
                this.tradeInfo = res.data.data;
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
        finalSubmit(){
            console.log("finalSubmit")          
            core
            .fetch({
            method: "post",
            url: "/api/ttrade/cancelorder",
            data:{
                swiftNo: this.swiftNo
            }
            })
            .then((res) => {
                console.log(res)

                this.$hMessage.success({
                content: `撤单成功`,
                durtion: 3,
                closable: true,
            });
            })
            .catch(() => {
            this.$hMessage.error({
                content: `撤单失败`,
                durtion: 3,
                closable: true,
            });
            });
        }

    },
    beforeDestroy() {
    },
};
</script>

<style lang="less" scoped>
  
</style>