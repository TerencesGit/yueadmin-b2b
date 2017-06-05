import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'

import Layout from '@/components/Layout'
import Home from '@/pages/admin/home'

const userManage = resolve => require(['@/pages/admin/userManage'], resolve)

const brandManage = resolve => require(['@/pages/provider/brandManage'], resolve)

const addWare = resolve => require(['@/pages/provider/addWare'], resolve)
const createWare = resolve => require(['@/pages/provider/ware/add/home'], resolve)
const chooseType = resolve => require(['@/pages/provider/ware/add/chooseType'], resolve)
const basicInfo = resolve => require(['@/pages/provider/ware/add/basicInfo'], resolve)

const wareManage = resolve => require(['@/pages/provider/wareManage'], resolve)
const wareList = resolve => require(['@/pages/provider/ware/edit/wareList'], resolve)
const categoryManage = resolve => require(['@/pages/admin/system/categoryManage'], resolve)

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
      { path: 'list', name: '商品列表', component: wareList },
      { 
        path: 'new', name: '新建商品', component: createWare,
        children: [
          { path: 'chooseType', name: '选择类别', component: chooseType },
          { path: 'basicInfo_traval', name: '基本信息1', component: wareManage },
          { path: 'basicInfo_photography', name: '基本信息2', component: basicInfo }
        ] 
      },
      { 
        path: 'edit', name: '编辑商品', component: createWare, redirect: '/provider/ware/edit/basicInfo_photography',
        children: [
          { path: 'chooseType', name: '选择类别1', component: chooseType },
          { path: 'basicInfo_traval', name: '基本信息12', component: wareManage },
          { path: 'basicInfo_photography', name: '基本信息22', component: basicInfo }
        ] 
      },
    ]
  },
  {
    path: '/admin/system',
    name: '平台-系统管理',
    component: Layout,
    children: [
      { path: 'home', name: '账户首页',component: Home },
      { path: 'userManage', name: '用户管理', component: userManage },
      { path: 'categoryManage', name: '品类管理', component: categoryManage },
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
