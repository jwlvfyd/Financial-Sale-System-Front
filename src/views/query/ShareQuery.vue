<template>
    <div>
        <div>
            <h-form :model="formItem" :label-width="80">
                <h-row>
                    <h-col span="7">
                        <h-form-item label="客户姓名">
                            <h-input v-model="formItem.customerName" placeholder="请输入" ></h-input>
                        </h-form-item>
                    </h-col>
                    <h-col span="7">
                        <h-form-item  label="产品名称">
                            <h-input v-model="formItem.productName" placeholder="请输入"></h-input>
                        </h-form-item>                      
                    </h-col>
                </h-row>
                <h-row>
                    <h-col span="8" >
                        <h-form-item>
                        <h-button type="primary" @click="handleSubmit">查询</h-button>
                        <h-button type="ghost" @click="cancel" style="margin-left: 8px;">取消</h-button>
                        </h-form-item>
                    </h-col>
                </h-row>
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
    title: "基金名称",
    key: "productName",
  },
  {
    title: "基金代码",
    key: "productId",
  },
  {
    title: "客户姓名",
    key: "customer_name",
  },
  {
    title: "对应银行账户",
    key: "accountId",
  },
  {
    title: "银行名称",
    key: "accountName",
  },
  {
    title: "持有份额",
    key: "share",
  },
]
export default {
    data() {
        return {
            formItem: {
                productName: "",
                customerName:"",
            },
            tData: data.slice(0, 10),
            columns: columns,
            totalNum: data.length,
            };
        
    },
    created() {
        console.log("query/ShareQuery");
    },
    methods: {
        handleSubmit(){
          if(this.isFormEmpty()){
                this.info();
                return 0;
            }
        console.log('表单数据：',this.formItem);
        //提交到api接口
        core.fetch({
          method: 'post',
          url: "/api/tquery/fundshares",
          headers: {
            'Content-Type': 'application/json' // 确保服务器知道发送的是JSON数据
          },
          data: {
            productName:this.formItem.productName,
            customerName:this.formItem.customerName,
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
        this.formItem.productName = "";
        this.formItem.customerName = "";
      },
      isFormEmpty() {
        for (const key in this.formItem) {
            if (this.formItem[key] !== '') {
            return false; // 如果找到非空的字段，则表单不为空
            }
        }
        return true; // 如果所有字段都为空，则表单为空
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
    },
    beforeDestroy() {
    },
};
</script>

<style lang="less" scoped>
  
</style>