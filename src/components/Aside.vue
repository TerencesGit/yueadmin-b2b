<template>
	<aside class="sidebar transition" :class="{'hide': sidebarStatus}">
    <div class="sidebar-wrap">
      <div class="sidebar-header">
        <a href="/" class="brand ellipsis" :title="title">
          <i class="fa fa-flag fa-lg"></i>
          <strong>{{title}}</strong>
        </a>
      </div>
      <div class="divide-line"></div>
  		<el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark" :unique-opened="true" router>
        <el-submenu :index="index+''" v-for="(menu, index) in routers" :key="menu.id">
          <template slot="title"><i class="fa fa-lg" :class="menu.icon"></i>{{ menu.name }}</template>
            <el-menu-item :index="submenu.index" v-for="submenu in menu.children" :key="submenu.id">
            	<router-link :to="submenu.link">{{ submenu.name }}</router-link>
            </el-menu-item>
            <!-- <el-submenu :index="submenu.index" v-for="submenu in menu.children" :key="submenu.id">
              <template slot="title">{{ submenu.name }}</template>
              <el-menu-item :index="submenu.index" v-for="item in submenu.children" :key="submenu.id">{{item.name}}</el-menu-item>
            </el-submenu> -->
        </el-submenu>
      </el-menu>
    </div>
	</aside>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      routers: [
        {
          name: '供应商-商品管理',
          icon: 'fa-paw',
          children: [
            {name: '品牌管理', link: '/provider/ware/brandManage', index: '/provider/ware/brandManage'},
            {name: '新建商品', link: '/provider/ware/new/base', index: '/provider/ware/new/base'},
            {name: '商品管理', link: '/provider/ware/wareManage', index: '/provider/ware/wareManage'},
            {name: '商品库存', link: '/provider/ware/storageManage', index: '/provider/ware/storageManage'},
            {name: '商品上下架', link: '/provider/ware/shelfManage', index: '/provider/ware/shelfManage'},
          ]
        },
        {
          name: '供应商-订单管理',
          icon: 'fa-paw',
          children: [
            // {name: '待确认订单', link: '/provider/order/confirmed', index: '/provider/order/confirmed'},
            {name: '待支付订单', link: '/provider/order/payment', index: '/provider/order/payment'},
            {name: '服务中订单', link: '/provider/order/inService', index: '/provider/order/inService'},
            {name: '订单结算', link: '/provider/order/settlement', index: '/provider/order/settlement'},
            {name: '历史订单', link: '/provider/order/history', index: '/provider/order/history'},
            {name: '问题订单', link: '/provider/order/problem', index: '/provider/order/problem'},
          ]
        },
        {
          name: '平台-系统管理',
          icon: 'fa-desktop',
          children: [
            {name: '属性管理', link: '/admin/system/propertyManage', index: '/admin/system/propertyManage'},
            {name: '属性模板管理', link: '/admin/system/templateManage', index: '/admin/system/templateManage'},
            {name: '品类管理', link: '/admin/system/categoryManage', index: '/admin/system/categoryManage'},
            // {name: '营销策略管理', link: '/admin/system/marketingStrategy', index: '/admin/system/marketingStrategy'},
            {name: '结算策略管理', link: '/admin/system/settlementStrategy', index: '/admin/system/settlementStrategy'},
            {name: '退改策略管理', link: '/admin/system/retreatStrategy', index: '/admin/system/retreatStrategy'},
          ]
        },
        {
          name: '平台-商品管理',
          icon: 'fa-desktop',
          children: [
            {name: '待审核商品', link: '/admin/ware/verifyList', index: '/admin/ware/verifyList'},
            {name: '商品上下架', link: '/admin/ware/shelfManage', index: '/admin/ware/shelfManage'},
            {name: '商品价格管理', link: '/admin/ware/priceManage', index: '/admin/ware/priceManage'},
            {name: '商品管理', link: '/admin/ware/manage', index: '/admin/ware/manage'},
          ]
        },
        {
          name: '平台-订单管理',
          icon: 'fa-desktop',
          children: [
            // {name: '待确认订单', link: '/admin/order/confirmed', index: '/admin/order/confirmed'},
            {name: '待支付订单', link: '/admin/order/payment', index: '/admin/order/payment'},
            {name: '服务中订单', link: '/admin/order/inService', index: '/admin/order/inService'},
            {name: '订单结算', link: '/admin/order/settlement', index: '/admin/order/settlement'},
            {name: '历史订单', link: '/admin/order/history', index: '/admin/order/history'},
            {name: '问题订单', link: '/admin/order/problem', index: '/admin/order/problem'},
          ]
        },
        // {
        //  name: '平台-顾客管理',
        //  icon: 'fa-desktop',
        //   children: [
        //    {name: '顾客查询', link: '/admin/customer/query', index: '/admin/customer/query'},
        //   ]
        // },
        {
          name: '分销商-订单管理',
          icon: 'fa-sitemap',
          children: [
            {name: '待完善订单', link: '/distributor/order/complete', index: '/distributor/order/complete'},
            {name: '待支付订单', link: '/distributor/order/payment', index: '/distributor/order/payment'},
            {name: '服务中订单', link: '/distributor/order/inService', index: '/distributor/order/inService'},
            // {name: '投诉中订单', link: '/distributor/order/complaint', index: '/distributor/order/complaint'},
            {name: '历史订单', link: '/distributor/order/history', index: '/distributor/order/history'},
          ]
        }
      ],
      title: '悦视觉供应商系统',
    }
  },
  computed: {
    ...mapGetters([
      'sidebarStatus'
    ]),
    // ...mapGetters({
    //   routers: 'userPermission'
    // }),
  },
}
</script>
<style scoped lang="scss">
	.sidebar {
		position: fixed;
		top: 0;
    left: 0;
		width: 240px;
		height: 100%;
    overflow: hidden;
		background-color: #324157;
	}
  .sidebar.hide {
    left: -240px;
  }
  .sidebar-wrap {
    position: absolute;
    width: 260px;
    height: 100%;
    overflow-y: scroll;
  }
  .sidebar-header {
    padding: 20px 15px;
    text-align: left;
    .brand {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.1;
      color: #DFE4ED;
    }
  }
  .divide-line {
    width: 100%;
    height: 2px;
    overflow: hidden;
    font-size: 0;
    background-color: #233b4c;
  }
  .el-submenu {
    text-align: left;
    .el-menu-item {
      padding-left: 10px
    }
  }
	.el-menu-item {
    text-indent: 5px;
		a {
			display: block;
			text-decoration: none;
			color: #bfcbd9;
		}
		.router-link-active {
			color: #fff;
		}
	}
	.el-submenu .fa {
		vertical-align: baseline;
    margin-right: 10px;
	}
</style>
