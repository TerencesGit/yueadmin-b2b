import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'

import Layout from '@/components/Layout'

import Home from '@/pages/admin/home'
import businessManage from '@/pages/admin/businessManage'
import vueHtml5Editor from '@/pages/tools/vueHtml5Editor'
import UEditor from '@/pages/tools/UEditor'

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Layout
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
    path: '/tools',
    name: '工具演示',
    component: Layout,
    children: [
      {
        path: 'vueHtml5Editor',
        name: 'vueHtml5Editor',
        component: vueHtml5Editor
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
