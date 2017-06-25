import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'

import Layout from '@/components/Layout'
import Home from '@/pages/admin/home'

const userManage = resolve => require(['@/pages/admin/userManage'], resolve)

/********************  供应商页面 start  ******************/
// 品牌管理
const ProBrandManage = resolve => require(['@/pages/provider/brandManage'], resolve)
// 商品管理
const ProWareManage = resolve => require(['@/pages/provider/wareManage'], resolve)
// 商品信息-添加
const ProWareNew = resolve => require(['@/pages/provider/ware/add/main'], resolve)
const ProWareChooseType = resolve => require(['@/pages/provider/ware/add/chooseType'], resolve)
const ProWareBaseInfo = resolve => require(['@/pages/provider/ware/add/basicInfo'], resolve)
const ProWareCreate = resolve => require(['@/pages/provider/ware/add/create'], resolve)
const ProWareTourItinerary = resolve => require(['@/pages/provider/ware/add/tourItinerary'], resolve)
const ProWareMultiMedia = resolve => require(['@/pages/provider/ware/add/multimedia'], resolve)
const ProWareBookLimit = resolve => require(['@/pages/provider/ware/add/bookLimit'], resolve)
const ProWareSkuSet = resolve => require(['@/pages/provider/ware/add/priceStock'], resolve)
const ProWareAddiService = resolve => require(['@/pages/provider/ware/add/additionalService'], resolve)
const ProWareAddiServiceNew = resolve => require(['@/pages/provider/ware/add/newAdditionalService'], resolve)
const ProWareMultiPassMaintain = resolve => require(['@/pages/provider/ware/add/multiPassMaintain'], resolve)

// 商品信息-编辑
const ProWareList = resolve => require(['@/pages/provider/ware/edit/wareList'], resolve)
const ProWareEdit = resolve => require(['@/pages/provider/ware/edit/home'], resolve)

// 商品上下架
const shelfManage = resolve => require(['@/pages/provider/ware/shelfManage'], resolve)

// 商品出入库
const stockManage = resolve => require(['@/pages/provider/ware/stockManage'], resolve)
const stockSet = resolve => require(['@/pages/provider/ware/setStock'], resolve)

// 订单管理
const orderManage = resolve => require(['@/pages/provider/order/main'], resolve)
const confirmed = resolve => require(['@/pages/provider/order/confirmed'], resolve)

// 其他
const html5Editor = resolve => require(['@/pages/tools/VueHtml5Editor'], resolve)
const UEditor = resolve => require(['@/pages/tools/UEditor'], resolve)

/********************  供应商页面 end  ******************/

/********************  分销商页面 start  ******************/

/********************  分销商页面 end ******************/

/********************  平台页面 start  *******************/

/**********  商品管理  **********/
// 商品审核
const wareAuditing = resolve => require(['@/pages/admin/ware/auditing'], resolve)


/**********  系统管理  **********/
const categoryManage = resolve => require(['@/pages/admin/system/categoryManage'], resolve)


/********************  平台页面 end  *******************/
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
      { path: 'brandManage', name: '品牌管理', component: ProBrandManage },
      { path: 'list', name: '商品列表', component: ProWareList },
      { 
        path: 'new', name: '新建商品', component: ProWareNew,
        children: [
          { path: 'chooseType', name: '新建商品-选择类别', component: ProWareChooseType },
          { path: 'basicInfoTravel', name: '新建商品-基本信息-旅游', component: ProWareBaseInfo },
          { path: 'basicInfoPhotography', name: '新建商品-基本信息-拍摄', component: ProWareCreate },
          { path: 'tourItinerary', name: '新建商品-行程介绍', component: ProWareTourItinerary },
          { path: 'multiMedia', name: '新建商品-多媒体', component: ProWareMultiMedia },
          { path: 'bookLimit', name: '新建商品-费用/预定限制', component: ProWareBookLimit },
          { path: 'priceStock', name: '新建商品-价格库存', component: ProWareSkuSet },
          { path: 'additionalService', name: '新建商品-附加服务', component: ProWareAddiService },
          { path: 'newAdditionalService', name: '新建商品-新增附加服务', component: ProWareAddiServiceNew },
          { path: 'multiPassMaintain', name: '新建商品-多行程维护', component: ProWareMultiPassMaintain },
        ] 
      },
      { 
        path: 'edit', name: '编辑商品', component: ProWareEdit,
        children: [
          { path: 'basicInfo_traval', name: '编辑商品-基本信息-旅游', component: ProWareManage },
          { path: 'basicInfo_photography', name: '编辑商品-基本信息-拍摄', component: ProWareBaseInfo },
          { path: 'tour_itinerary', name: '编辑商品-行程介绍', component: ProWareTourItinerary },
          { path: 'multiMedia', name: '编辑商品-多媒体', component: ProWareMultiMedia },
          { path: 'book_limit', name: '编辑商品-费用/预定限制', component: ProWareBookLimit },
          { path: 'price_stock', name: '编辑商品-价格库存', component: ProWareSkuSet },
        ] 
      },
      {
        path: 'shelfManage', name: '商品上下架', component: shelfManage
      },
      {
        path: 'stockManage', name: '商品出入库', component: stockManage
      },
      {
        path: 'stockSet', name: '商品库存设置', component: stockSet
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
    path: '/admin/ware',
    name: '平台-商品管理',
    component: Layout,
    children: [
      { path: 'auditing', name: '商品审核', component: wareAuditing },
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
