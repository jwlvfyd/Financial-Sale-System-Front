<!--
 * @Author: liuhf35610 liuhf35610@hundsun.com
 * @Date: 2022-07-04 18:28:24
 * @LastEditors: liuhf35610 liuhf35610@hundsun.com
 * @LastEditTime: 2022-07-08 01:32:38
 * @FilePath: \code\day02-manage-platform\client\src\layouts\default.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="layout">
    <h-row name="flex">
      <h-col span="5" class="layout-menu-left">
        <h-menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
          <div class="layout-logo-left"></div>
          <h-menu-item name="home">
            <router-link to="/">首页</router-link>
          </h-menu-item>
          <h-submenu name="product">
            <template v-slot:title>
              <h-icon name="mail"></h-icon>
              产品管理
            </template>
            <h-menu-item name="product-1">
              <router-link to="/product">基金产品</router-link>
            </h-menu-item>
            <h-menu-item name="product-2">
              <router-link to="/product-example">基金产品-示例</router-link>
            </h-menu-item>
          </h-submenu>
          <h-submenu name="customer">
            <template v-slot:title>
              <h-icon name="mail"></h-icon>
              客户管理
            </template>
            <h-menu-item name="customer-1">
              <router-link to="/customer/Create">开户</router-link>
            </h-menu-item>
            <h-menu-item name="customer-2">
              <router-link to="/customer/RiskTest">风险测评</router-link>
            </h-menu-item>
            <h-menu-item name="customer-3">
              <router-link to="/customer/BankCard">银行卡管理</router-link>
            </h-menu-item>
            <h-menu-item name="customer-4">
              <router-link to="/customer/CustomerInfo">客户信息查询</router-link>
            </h-menu-item>
          </h-submenu>
          <h-submenu name="trade">
            <template v-slot:title>
              <h-icon name="mail"></h-icon>
              交易管理
            </template>
            <h-menu-item name="trade-1">
              <router-link to="/trade/Purchase">申购</router-link>
            </h-menu-item>
            <h-menu-item name="trade-2">
              <router-link to="/trade/Redeem">赎回</router-link>
            </h-menu-item>
            <h-menu-item name="trade-3">
              <router-link to="/trade/Cancellation">撤单</router-link>
            </h-menu-item>
          </h-submenu>
          <h-submenu name="clear">
            <template v-slot:title>
              <h-icon name="mail"></h-icon>
              日结清算
            </template>
            <h-menu-item name="clear-1">
              <router-link to="/clear">清算</router-link>
            </h-menu-item>
          </h-submenu>
          <h-submenu name="query">
            <template v-slot:title>
              <h-icon name="mail"></h-icon>
              业务查询
            </template>
            <h-menu-item name="query-1">
              <router-link to="/query/TradeQuery">交易查询</router-link>
            </h-menu-item>
            <h-menu-item name="query-2">
              <router-link to="/query/BankQuery">银行卡流水查询</router-link>
            </h-menu-item>
            <h-menu-item name="query-3">
              <router-link to="/query/ShareQuery">基金持有份额查询</router-link>
            </h-menu-item>
          </h-submenu>
        </h-menu>
      </h-col>
      <h-col span="19">
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view />
          </div>
        </div>
        <div class="layout-footer layout-copy">&copy;2022 HUNDSUN 版权所有</div>
      </h-col>
    </h-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.h-menu-vertical {
  height: 100vh;
}

.h-menu-item-active {
  > a {
    color: #fff;
  }
}

.layout-content {
  height: calc(100vh - 30px);
}

.layout-content-main {
  padding: 24px;
}

.layout-footer {
  text-align: center;
  height: 30px;
}
</style>