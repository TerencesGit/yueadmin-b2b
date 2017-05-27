<template>
	<header>
		<div class="top">
			<div class="container-fluid">
				<div class="top-left">
					<a href="#" class="brand">
						<i class="fa fa-flag fa-lg"></i>
						悦视觉供应商系统
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
			<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-submenu :index="index+''" v-for="(menu, index) in routers" :key="menu.id">
          <template slot="title">{{ menu.name }}</template>
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
    	routers: [
        {
        	name: '品牌管理', 
        	link: '/provider/brandManage', 
        	index: '/provider/brandManage',
        	children: [
        		{
		        	name: '品牌添加', 
		          link: '/provider/brandAdd', 
		          index: '/provider/brandAdd'
		        },
		        {
		        	name: '品牌修改', 
		          link: '/provider/brandAdd', 
		          index: '/provider/brandAdd'
		        },
        	]
        },
        {
        	name: '商品管理', 
          link: '/provider/wareManage', 
          index: '/provider/wareManage',
          children: [
        		{
		        	name: '商品添加', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
		        {
		        	name: '商品修改', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
        	]
        },
        {
        	name: '订单管理', 
          link: '/provider/orderManage', 
          index: '/provider/orderManage',
          children: [
          	{
		        	name: '订单查看', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
		        {
		        	name: '订单删除', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
          ]
        },
        {
        	name: '销售报表', 
        	link: '/provider/salesReport', 
        	index: '/provider/salesReport',
        	children: [
          	{
		        	name: '报表查看', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
		        {
		        	name: '报表删除', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
          ]
        },
        {
        	name: '发票管理', 
        	link: '/provider/invoiceManage', 
        	index: '/provider/invoiceManage',
        	children: [
          	{
		        	name: '发票查看', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
		        {
		        	name: '发票删除', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
          ]
        },
        {
        	name: '顾客管理', 
        	link: '/provider/customerManage', 
        	index: '/provider/customerManage',
        	children: [
          	{
		        	name: '顾客查看', 
		          link: '/provider/wareAdd', 
		          index: '/provider/wareAdd'
		        },
          ]
        }
      ],
      activeIndex: '1',
      activeIndex2: '1'
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
		background: #fff
	}
</style>