<template>
	<header class="header">
		<div class="top">
			<div class="container-fluid">
				<div class="top-left">
					<a href="#" class="brand">
						<i class="fa fa-flag fa-lg"></i>
						<span>{{title}}</span>
					</a>
				</div>
				<div class="top-right">
					<div class="provider-name">
						欢迎您：
						<span>北京鸿基国际旅行社有限责任公司第一分公司</span>
					</div>
					<div class="new-info">
						<a href="#">咨询及通知</a>
						<a href="#">公告</a>
						<a href="#">修改密码</a>
						<a href="javascript:;" @click="logout">退出</a>|
						<a href="#">帮助</a>
					</div>
				</div>
			</div>
		</div>
		<nav>
			<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
				<el-submenu :index="index+''" v-for="(menu, index) in routers" :key="menu.id">
          <template slot="title">
          	<i class="fa fa-lg" :class="menu.icon"></i>
            <span>{{ menu.name }}</span>
          </template>
            <el-menu-item :index="submenu.index" v-for="submenu in menu.children" :key="submenu.id">
            	<router-link :to="submenu.link">{{ submenu.name }}</router-link>
            </el-menu-item>
        </el-submenu>
			</el-menu>
		</nav>
	</header>
</template>
<script>
import { requestExit } from '../api'
import utils from '@/assets/js/utils'
export default {
  data() {
    return {
    	title: '悦视觉后台管理系统',
    	routers: [
        {
          name: '商品管理',
          icon: 'fa-gift',
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
          icon: 'fa-file',
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
          icon: 'fa-cog',
          children: [
            {name: '属性管理', link: '/admin/system/propertyManage', index: '/admin/system/propertyManage'},
            {name: '属性模板管理', link: '/admin/system/templateManage', index: '/admin/system/templateManage'},
            {name: '品类管理', link: '/admin/system/categoryManage', index: '/admin/system/categoryManage'},
            // {name: '营销策略管理', link: '/admin/system/marketingStrategy', index: '/admin/system/marketingStrategy'},
            {name: '结算策略管理', link: '/admin/system/settlementStrategy', index: '/admin/system/settlementStrategy'},
            {name: '退改策略管理', link: '/admin/system/retreatStrategy/retreatStrategyList', index: '/admin/system/retreatStrategy/retreatStrategyList'},
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
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout () {
    	this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      	requestExit().then(res => {
      		this.$router.push('/login')
      		if(res.data.status === 1) {
      			this.$message({
		          type: 'success',
		          message: res.data.message
		        })
      		} else {
      			this.$message({
		          type: 'error',
		          message: '退出失败'
		        })
      		}
      	})
      }).catch(() => {
        this.$message({
          duration: 1000,
          message: '已取消操作'
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
	.header {
		position: absolute;
		z-index: 99;
		width: 100%;
	}
	.top {
		height: 50px;
		line-height: 50px;
		color: #fff;
		font-size: 14px;
		background: #1380E2
	}
	.container-fluid {
		padding-left: 80px;
		padding-right: 80px
	}
	.top-left {
		float: left;
		.brand {
			color: #fff;
			font-size: 16px
		}
	}
	.top-right {
		float: right;
		div {
			display: inline-block;
		}
		.new-info a {
			color: #fff;
			padding: 0 10px;
		}
	}
	.brand {
		font-weight: bold
	}
	nav {
		padding-left: 65px;
		padding-right: 65px;
		background: #fff
	}
	.el-menu {
		border-radius: 0;
		background: #fff;
		.fa {
			margin-right: 5px
		}
	}
</style>