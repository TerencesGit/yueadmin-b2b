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
          name: '平台管理员',
          icon: 'fa-desktop',
          children: [
            {
              name: '平台首页', 
              link: '/admin/home', 
              index: '/admin/home',
              children: [
                {name: '商家管理', link: '/admin/businessManage', index: '/admin/businessManage'},
              ]
            },
            {name: '商家管理', link: '/admin/businessManage', index: '/admin/businessManage'},
            {name: '用户管理', link: '/admin/userManage', index: '/admin/userManage'},
            {name: '商品上架审核', link: '/admin/wareAudit', index: '/admin/wareAudit'}
          ]
        },
        {
          name: '供应商',
          icon: 'fa-paw',
          children: [
            {name: '品牌管理', link: '/provider/brandManage', index: '/provider/brandManage'},
            {name: '商品管理', link: '/provider/wareManage', index: '/provider/wareManage'},
            {name: '订单管理', link: '/provider/orderManage', index: '/provider/orderManage'},
            {name: '销售报表', link: '/provider/salesReport', index: '/provider/salesReport'},
            {name: '发票管理', link: '/provider/invoiceManage', index: '/provider/invoiceManage'},
            {name: '顾客管理', link: '/provider/customerManage', index: '/provider/customerManage'},
          ]
        },
        {
          name: '分销商',
          icon: 'fa-sitemap',
          children: [
            {name: '订单管理', link: '/distributor/orderManage', index: '/distributor/orderManage'}
          ]
        },
        // {
        //   name: '工具演示',
        //   icon: 'fa-wrench',
        //   children: [
        //     {name: 'Vue-Html5-Editor', link: '/tools/vueHtml5Editor', index: '/tools/vueHtml5Editor'},
        //     {name: 'UEditor', link: '/tools/UEditor', index: '/tools/UEditor'}
        //   ]
        // }
      ],
      title: '悦视觉供应商系统'
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
