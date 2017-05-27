import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'

import Layout from '@/components/Layout'
import Home from '@/pages/admin/home'
import businessManage from '@/pages/admin/businessManage'
import wareManage from '@/pages/provider/wareManage'
import addWare from '@/pages/provider/addWare'

const brandManage = resolve => require(['@/pages/provider/brandManage'], resolve)
const brandDetail = resolve => require(['@/pages/provider/brandDetail'], resolve)

const html5Editor = resolve => require(['@/pages/tools/VueHtml5Editor'], resolve)
const UEditor = resolve => require(['@/pages/tools/UEditor'], resolve)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Login
  },
  {
    path: '/login',
    name: '欢迎登录',
    component: Login
  },
  {
    path: '/register',
    name: '欢迎注册',
    component: Register
  },
  {
    path: '/admin',
    name: '账户主页',
    component: Layout,
    children: [
    	{
    		path: 'home',
        name: '账户首页',
    		component: Home
    	},
      {
        path: 'businessManage',
        name: '商户管理',
        component: businessManage
      }
    ]
  },
  {
    path: '/provider',
    name: '供应商',
    component: Layout,
    children: [
      {
        path: 'brandManage',
        name: '品牌管理',
        component: brandManage
      },
      {
        path: 'wareManage',
        name: '商品管理',
        component: wareManage
      },
      {
        path: 'addWare',
        name: '商品添加',
        component: addWare
      },
    ]
  },
  {
    path: '/tools',
    name: '工具演示',
    component: Layout,
    children: [
      {
        path: 'vueHtml5Editor',
        name: 'vueHtml5Editor',
        component: html5Editor
      },
      {
        path: 'UEditor',
        name: 'UEditor',
        component: UEditor
      },
    ]
  },
  {
    path: '/NoPermission',
    name: 'nopermission',
    component: NoPermission
  },
  {
    path: '/NotFound',
    name: 'notfound',
    component: NotFound
  },
  // {
  // 	path: '*',
  // 	redirect: '/NotFound'
  // }
]
export default routes
