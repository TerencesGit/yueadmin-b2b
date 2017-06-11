import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'

import Layout from '@/components/Layout'
import Home from '@/pages/admin/home'

const userManage = resolve => require(['@/pages/admin/userManage'], resolve)

/********************  供应商管理   **************/
// 品牌管理
const brandManage = resolve => require(['@/pages/provider/brandManage'], resolve)

// 商品管理-添加
const addWare = resolve => require(['@/pages/provider/addWare'], resolve)
const createWare = resolve => require(['@/pages/provider/ware/add/home'], resolve)
const chooseType = resolve => require(['@/pages/provider/ware/add/chooseType'], resolve)
const basicInfo = resolve => require(['@/pages/provider/ware/add/basicInfo'], resolve)
const tourItinerary = resolve => require(['@/pages/provider/ware/add/tourItinerary'], resolve)
const multiMedia = resolve => require(['@/pages/provider/ware/add/multimedia'], resolve)
const bookLimit = resolve => require(['@/pages/provider/ware/add/bookLimit'], resolve)
const priceStock = resolve => require(['@/pages/provider/ware/add/priceStock'], resolve)
const additionalService = resolve => require(['@/pages/provider/ware/add/additionalService'], resolve)
const newAdditionalService = resolve => require(['@/pages/provider/ware/add/newAdditionalService'], resolve)
const multiPassMaintain = resolve => require(['@/pages/provider/ware/add/multiPassMaintain'], resolve)
// 商品管理
const wareManage = resolve => require(['@/pages/provider/wareManage'], resolve)
const wareList = resolve => require(['@/pages/provider/ware/edit/wareList'], resolve)
const editWare = resolve => require(['@/pages/provider/ware/edit/home'], resolve)

// 订单管理
const orderManage = resolve => require(['@/pages/provider/order/main'], resolve)
const confirmed = resolve => require(['@/pages/provider/order/confirmed'], resolve)

const categoryManage = resolve => require(['@/pages/admin/system/categoryManage'], resolve)

const html5Editor = resolve => require(['@/pages/tools/VueHtml5Editor'], resolve)
const UEditor = resolve => require(['@/pages/tools/UEditor'], resolve)

/********************  分销商管理   **************/

/********************  平台管理   ***************/
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
          { path: 'chooseType', name: '新建商品-选择类别', component: chooseType },
          { path: 'basicInfo_travel', name: '新建商品-基本信息-旅游', component: bookLimit },
          { path: 'basicInfo_photography', name: '新建商品-基本信息-拍摄', component: basicInfo },
          { path: 'tour_itinerary', name: '新建商品-行程介绍', component: tourItinerary },
          { path: 'multiMedia', name: '新建商品-多媒体', component: multiMedia },
          { path: 'book_limit', name: '新建商品-费用/预定限制', component: bookLimit },
          { path: 'price_stock', name: '新建商品-价格库存', component: priceStock },
          { path: 'multiPassMaintain', name: '新建商品-多行程维护', component: multiPassMaintain },
          { path: 'additionalService', name: '新建商品-附加服务', component: additionalService },
          { path: 'newAdditionalService', name: '新建商品-新增附加服务', component: newAdditionalService },
        ] 
      },
      { 
        path: 'edit', name: '编辑商品', component: editWare,
        children: [
          { path: 'basicInfo_traval', name: '编辑商品-基本信息-旅游', component: wareManage },
          { path: 'basicInfo_photography', name: '编辑商品-基本信息-拍摄', component: basicInfo },
          { path: 'tour_itinerary', name: '编辑商品-行程介绍', component: tourItinerary },
          { path: 'multiMedia', name: '编辑商品-多媒体', component: multiMedia },
          { path: 'book_limit', name: '编辑商品-费用/预定限制', component: bookLimit },
          { path: 'price_stock', name: '编辑商品-价格库存', component: priceStock },
        ] 
      },
    ]
  },
  {
    path: '/provider',
    name: '供应商',
    component: Layout,
    children: [
      { path: 'order', name: '订单管理', component: orderManage,
        children: [
          { path: 'confirmed', name: '待确认订单', component: confirmed }
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
