<template>
    <div>
      <div>
        <h-form :model="formItem" :label-width="80">
          <h-row>
            <h-col span="7">
              <h-form-item label="流水编号">
                <h-input v-model="formItem.swifNo" placeholder="请输入" ></h-input>
              </h-form-item>
            </h-col>
            <h-col span="7">
              <h-form-item label="客户姓名">
                <h-input v-model="formItem.customerName" placeholder="请输入" ></h-input>
              </h-form-item>
            </h-col>
          </h-row>
          <h-form-item label="起止日期">
            <h-row>
              <h-col span="6">
                <h-date-picker
                v-model="formItem.dates"
                format="yyyy-MM-dd"
                type="daterange"
                placement="bottom-end"
                placeholder="选择日期"
              ></h-date-picker>               
              </h-col>
              <h-col span="4" style="margin-left: 100px;">
                <h-form-item>
                  <h-button type="primary" @click="handleSubmit">查询</h-button>
                  <h-button type="ghost" @click="cancel" style="margin-left: 8px;">取消</h-button>
                </h-form-item>
              </h-col>
              
            </h-row>
          </h-form-item>
          
        </h-form>
      </div>
      
      <div>
        <h-table 
        :data="tData" 
        :columns="columns" 
        style="margin-bottom: 8px;"
        ></h-table>
        <h-page
        :total="totalNum"
        @on-change="dataChange"
        show-elevator
        show-total
        :page-size="10"
        ></h-page>
      </div>
    </div>
</template>

<script>
import core from "@hsui/core";
var data = []
var columns = [
  {
    title: "交易流水编号",
    key: "swifNo",
  },
  {
    title: "交易类型",
    key: "tradeType",
  },
  {
    title: "金额/份额",
    key: "amount",
  },
  {
    title: "交易时间",
    key: "timestamp",
  },
  {
    title: "客户姓名",
    key: "customerName",
  },
  {
    title: "客户id",
    key: "customerId",
  },
  {
    title: "银行名称",
    key: "accountName",
  },
  {
    title: "银行卡号",
    key: "accountId",
  },
  {
    title: "基金名称",
    key: "productName",
  },
  {
    title: "基金代码",
    key: "productId",
  },
];
export default {
    data() {
        return {
          formItem: {
            swifNo: "",
            customerName:"",
            dates: ["", ""],
          },
          tData: data.slice(0, 10),
          columns: columns,
          totalNum: data.length,
     };
    },
    created() {
        console.log("query/TradeQuery")
    },
    beforeDestroy() {
    },
    methods: { 
      handleSubmit(){
        if(this.isFormItemEmpty()){
                this.info();
                return 0;
            }
        const startDateStr = this.formatDateToYYYYMMDDHHmmss(this.formItem.dates[0]);
        const endDateStr = this.formatDateToYYYYMMDDHHmmss(this.formItem.dates[1]);
        console.log('表单数据：',this.formItem);
        //提交到api接口
        core.fetch({
          method: 'post',
          url: "/api/tquery/trade",
          headers: {
            'Content-Type': 'application/json' // 确保服务器知道发送的是JSON数据
          },
          data: {
            swifNo:this.formItem.swifNo,
            customerName:this.formItem.customerName,
            startTime:parseInt(startDateStr),
            endTime: parseInt(endDateStr),
          }
        })
        .then(result => {
          // 处理响应数据
          console.log('提交成功:', result );
          alert(result.msg);
          this.data=result.data;
        })
        .catch(error => {
          // 处理错误
          console.error('提交失败:', error);
      });
      },
      info() {
        this.$hMessage.info("请至少输入一项！");
      },
      cancel(){
        this.formItem.swifNo = "";
        this.formItem.dates = ["",""];
        this.formItem.customerName = "";
      },
      isFormItemEmpty() {
        // 检查 accountId 是否为空
        if (this.formItem.swifNo !== "") {
            return false;
        }
        if (this.formItem.customerName !== "") {
            return false;
        }
        
        // 检查 dates 数组中的每个元素是否为空
        if (!this.formItem.dates.every(date => date === "")) {
            return false;
        }
        // 如果所有字段都为空，则表单为空
        return true;
        },
      pageChange(index) {
        // console.log(index);
      },
      numChange(value) {
        console.log(value);
      },
      dataChange(i) {
        this.tData = data.slice((i - 1) * 10, i * 10);
      },
      formatDateToYYYYMMDDHHmmss(date) {
        if(date==null)return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
      },
    },
  };
</script>

<style lang="less" scoped>
  
</style>