<template>
    <div>
        <h-col span="3">
            <div style="margin-left: 20px;">
                <h-button type="primary" @click="next">清算</h-button>
                <br><br><br>
                <h-button type="primary" @click="reprocess">重新清算</h-button>  
            </div>
        </h-col>
        <h-col span="7">
            <div style="margin-top: 50px; margin-left: 100px;">
                <h-steps
                :current="current"
                processIcon="ios-ctoloud-download"
                direction="vertical"
                waitIcon="more"
                finishIcon="android-cloud-done">
                <h-step icon="android-sunny">
                    <div>
                        <h-card style="width: 150px;height: 90px;" :bordered="false">
                        <p slot="title">日初始化</p>
                        <p style="font-size: 12px;">系统准备就绪</p>
                        </h-card>
                    </div>
                </h-step>
                <h-step>
                    <div>
                        <h-card style="width: 150px;height: 90px;" :bordered="false">
                        <p slot="title">接受行情</p>
                        <p style="font-size: 12px;">获取市场价格信息</p>
                        </h-card>
                    </div>
                </h-step>
                <h-step icon="social-usd">
                    <div>
                        <h-card style="width: 150px;height: 90px;" :bordered="false">
                        <p slot="title">停止当日交易</p>
                        <p style="font-size: 12px;">进行结算</p>
                        </h-card>
                    </div>
                </h-step>
                <h-step icon="android-exit">
                    <div>
                        <h-card style="width: 150px;height: 90px;" :bordered="false">
                        <p slot="title">导出申请数据</p>
                        <p style="font-size: 12px;">为结算提供交易记录</p>
                        </h-card>
                    </div>
                    
                </h-step>
                <h-step icon="activity_fill">
                    <div>
                        <h-card style="width: 150px;height: 90px;" :bordered="false">
                        <p slot="title">数据汇总</p>
                        <p style="font-size: 12px;">计算基金当日净值</p>
                        </h-card>
                    </div>
                </h-step>
                </h-steps>
            </div>
        </h-col>
        <h-col span="7" style="margin-left: 300px;width: 350px;">
            <div style="background-color: #f7f7f7;">
                <div>
                   <h-row>
                    <h-col span="5" style="padding-top: 5px;" >
                        <span style="font-size: 14px;color: #464c5b;font-weight: 700; margin-left: 10px;">
                            清算日志
                        </span>
                    </h-col>
                    <h-col span="8" style="margin-left: 30px;">
                        <h-date-picker
                    v-model="date"
                    format="yyyy/MM/dd"
                    type="date"
                    placeholder="选择日期"
                    ></h-date-picker>
                    </h-col>
                    <h-col span="2" style="margin-left: 20px;">
                        <h-button type="primary" shape="circle" icon="search" @click="search"></h-button>
                    </h-col>
                   </h-row>
                    
                    
                </div>
                <h-table 
                :data="tData" 
                :columns="columns" 
                style="margin-bottom: 8px;height: 280px;"
                ></h-table>
                <h-page
                :total="totalNum"
                @on-change="dataChange"
                show-elevator
                show-total
                :page-size="6"
                ></h-page>
            </div>
            
        </h-col>
    </div>
  
</template>

<script>
import core from "@hsui/core";
var data=[
{
    name: "清算",
    ending:"成功"
  },
  {
    name: "重新清算",
    ending:"失败"
  },
  {
    name: "重新清算",
    ending:"失败"
  },
  
];
var columns = [
  {
    title: "操作",
    key: "name",
  },
  {
    title: "结果",
    key: "ending",
  },
 
];
export default {
    data() {
        return {
            tData: data.slice(0, 6),
            columns: columns,
            totalNum: data.length,
            current: 0,
            date:"",
        };
    },
    created() {
        console.log("clear/index");
    },
    methods: {
        next() {
            core.fetch({
            method: 'post',
            url: "/api/tclear/settlement",
            headers: {
            'Content-Type': 'application/json' // 确保服务器知道发送的是JSON数据
            },
        })
        .then(result => {
            // 处理响应数据
            console.log('提交成功:', result );
            this.$hMessage.info(result.msg);
            this.current=4;
               // this.data=result.data;
            })
            .catch(error => {
            // 处理错误
            console.error('提交失败:', error);
        });   
        },
        reprocess(){
            core.fetch({
            method: 'post',
            url: "/api/tclear/reprocess",
            headers: {
            'Content-Type': 'application/json' // 确保服务器知道发送的是JSON数据
            },
        })
        .then(result => {
            // 处理响应数据
            console.log('提交成功:', result );
            this.$hMessage.info(msg);
            this.current=0;
               // this.data=result.data;
            })
            .catch(error => {
            // 处理错误
            console.error('提交失败:', error);
        }); 
        },
        search(){
            alert(this.date);
        },
        pageChange(index) {
        // console.log(index);
        },
        numChange(value) {
        console.log(value);
        },
        dataChange(i) {
        this.tData = data.slice((i - 1) * 6, i * 6);
        },
    },
    beforeDestroy() {
    },
};
</script>

<style lang="less" scoped>
  
</style>