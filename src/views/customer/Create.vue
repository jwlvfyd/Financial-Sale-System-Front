<template>
    <div>
      <!-- Progress Steps -->
      <h-steps :current="currentStep" class ="progerssStep">
        <h-step title="个人基本信息" :status="currentStep > 0 ? 'finish' : 'wait'" />
        <h-step title="银行卡信息" :status="currentStep > 1 ? 'finish' : (currentStep === 1 ? 'process' : 'wait')" />
        <h-step title="风险测评" :status="currentStep === 2 ? 'process' : 'wait'" />
      </h-steps>
  
      <!-- Step 1: Personal Information -->
      <div v-if="currentStep === 0">
        <h-form :model="step1Form" :rules="step1Rules" @submit.native.prevent="handleStep1Submit">
          <h-form-item label="姓名" prop="name">
            <h-input v-model="step1Form.name" />
          </h-form-item>
          <h-form-item label="性别" prop="gender">
            <h-radio-group v-model="step1Form.gender">
              <h-radio label="男">男</h-radio>
              <h-radio label="女">女</h-radio>
            </h-radio-group>
          </h-form-item>
          <h-form-item label="联系方式" prop="contactInfo">
            <h-input v-model="step1Form.contactInfo" />
          </h-form-item>
          <h-form-item label="身份证" prop="customerId">
            <h-input v-model="step1Form.customerId" />
          </h-form-item>
          <h-button type="primary" @click="handleStep1Submit">下一步</h-button>
        </h-form>
      </div>
  
      <!-- Step 2: Bank Card Information -->
      <div v-if="currentStep === 1">
        <h-form :model="step2Form" :rules="step2Rules" @submit.native.prevent="handleStep2Submit">
          <h-form-item label="银行卡号" prop="accountId">
            <h-input v-model="step2Form.accountId" />
          </h-form-item>
          <h-form-item label="银行名称" prop="bankName">
            <h-input v-model="step2Form.bankName" />
          </h-form-item>
          <h-form-item label="持卡人姓名" prop="cardHolder">
            <h-input v-model="step2Form.cardHolder" />
          </h-form-item>
          <h-button type="primary" @click="handleStep2Submit">下一步</h-button>
          <h-button @click="goToPrevStep">上一步</h-button>
        </h-form>
      </div>
  
      <!-- Step 3: Risk Assessment -->
      <div v-if="currentStep === 2">
        <RiskTest />
      </div>
    </div>
  </template>
  
  <script>
  import core from "@hsui/core";
  import RiskTest from './RiskTest.vue';
  import { useStore } from 'vuex';

  export default {
    components: { RiskTest },
    data() {
      return {
        currentStep: 0,
        steps: ['个人基本信息', '银行卡信息', '风险测评'],
  
        // Step 1: Personal Information
        step1Form: {
          customerId: '',
          name: '',
          gender: '',
          contactInfo: '',
        },
        step1Rules: {
          customerId: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
          contactInfo: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        },
  
        // Step 2: Bank Card Information
        step2Form: {
          accountId: '',
          bankName: '',
          cardHolder: '',
          customerId: ''
        },
        step2Rules: {
          accountId: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
          bankName: [{ required: true, message: '请输入银行名称', trigger: 'blur' }],
          cardHolder: [{ required: true, message: '请输入持卡人姓名', trigger: 'blur' }],
        },
      };
    },
    created() {
      console.log("customer/CustomerInfo");
    },
    methods: {
      handleStep1Submit() {
        //this.step2Form.customerId = 1; 
        //this.currentStep++;
        core
        .fetch({
          method: "post",
          url: `/api/taccount/register?customerId=${this.step1Form.customerId}&name=${this.step1Form.name}&gender=${this.step1Form.gender}&contactInfo=${this.step1Form.contactInfo}`,
        })
        .then((response) => {
          console.log(response.msg);
          console.log(response.data);
          if (response.msg === '账户创建成功') {
              this.step2Form.customerId = response.data.customerId; // Pass customerId to step 2
              this.currentStep++;
            } else {
              alert(response.msg);
            }
        })
        .catch((error) => {
          console.error("步骤1失败:", error);
        });

        const store = useStore();
    
        const sendData = () => {
          const dataToSend =this.step1Form.customerId;
          store.dispatch('updatecustomerId', dataToSend);
        };

      },
  
      handleStep2Submit() {
        //this.currentStep++;
        this.step2Form.customerId = this.step1Form.customerId;
        core
        .fetch({
          method: "post",
          url: `/api/taccount/addcard?customerId=${this.step2Form.customerId}&accountId=${this.step2Form.accountId}&bankName=${this.step2Form.bankName}`,
        })
        .then((response) => {
            if (response.msg === '银行卡添加成功') {
              this.currentStep++;
            } else {
              alert(response.msg);
            }
        })
        .catch((error) => {
          console.error("步骤2失败:", error);
        });
      },
      goToPrevStep() {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      }
    },
    beforeDestroy() {
      // Cleanup logic if needed
    },
  };
  </script>
  
  <style scoped>
.progerssStep {
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9b8;
}


  </style>
  