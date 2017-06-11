<template>
  <section>
  	<el-menu :default-active="$route.path" class="min-height" mode="horizontal" @select="handleSelect">
  	  <el-menu-item v-for="item in menu" :index="item.link">
        <router-link :to="item.link">{{ item.name }}</router-link>
      </el-menu-item>
  	</el-menu>
    <router-view></router-view>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        menu: [
          { name: '待确认订单', link: '/provider/order/confirmed' },
          { name: '待支付订单', link: '#/pendingPayment' },
          { name: '服务中订单', link: '/provider/order/inService' },
          { name: '订单结算', link: '/provider/order/settlement' },
          { name: '历史订单', link: '/provider/order/history' }
        ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>