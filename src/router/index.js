import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'

import Layout from '@/components/Layout'
import Home from '@/pages/admin/home'

const userManage = resolve => require(['@/pages/admin/userManage'], resolve)

const brandManage = resolve => require(['@/pages/provider/brandManage'], resolve)

const addWare = resolve => require(['@/pages/provider/addWare'], resolve)
const wareManage = resolve => require(['@/pages/provider/wareManage'], resolve)

const html5Editor = resolve => require(['@/pages/tools/VueHtml5Editor'], resolve)
const UEditor = resolve => require(['@/pages/tools/UEditor'], resolve)

const routes = [
  {
    path: '/',
    redirect: '/login'
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
    path: '/provider/ware',
    name: '供应商-商品管理',
    component: Layout,
    children: [
      { path: 'brandManage', name: '品牌管理', component: brandManage },
      { path: 'add', name: '新建商品', component: addWare },
      { path: 'edit', name: '商品编辑', component: wareManage },
    ]
  },
  {
    path: '/admin/system',
    name: '平台-系统管理',
    component: Layout,
    children: [
      { path: 'home', name: '账户首页',component: Home },
      { path: 'userManage', name: '用户管理', component: userManage }
    ]
  },
  {
    path: '/admin/customer',
    name: '平台-顾客管理',
    component: Layout,
    children: [
      { path: 'query', name: '顾客查询', component: userManage }
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
