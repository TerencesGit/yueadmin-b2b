import CasLogin from '@/pages/casLogin'
import Login from '@/pages/login'
import Register from '@/pages/register'
import NotFound from '@/pages/NotFound'
import NoPermission from '@/pages/NoPermission'
import Home from '@/pages/home'
import Layout from '@/components/Layout'

// 品牌管理
const BrandManage = resolve => require(['@/pages/provider/ware/brand/brandManage'], resolve)
// 商品信息-添加
const WareNew = resolve => require(['@/pages/provider/ware/wareInput/wareNew'], resolve)
// 商品信息-编辑
const WareEdit = resolve => require(['@/pages/provider/ware/wareInput/wareEdit'], resolve)
// 商品信息新建
const WareBase = resolve => require(['@/pages/provider/ware/wareInput/base'], resolve)
const WareTrip = resolve => require(['@/pages/provider/ware/wareInput/trip'], resolve)
const WareMultiMedia = resolve => require(['@/pages/provider/ware/wareInput/multimedia'], resolve)
const WareCharge = resolve => require(['@/pages/provider/ware/wareInput/charge'], resolve)
const WareStorage = resolve => require(['@/pages/provider/ware/wareInput/storage'], resolve)
const WarePrice = resolve => require(['@/pages/provider/ware/wareInput/price'], resolve)
const WareService = resolve => require(['@/pages/provider/ware/wareInput/service'], resolve)
const WareActivity = resolve => require(['@/pages/provider/ware/wareInput/activity'], resolve)

// 商品信息编辑
const WareBaseEdit = resolve => require(['@/pages/provider/ware/wareInput/baseEdit'], resolve)
const WareServiceEdit = resolve => require(['@/pages/provider/ware/wareInput/serviceEdit'], resolve)
const WareActivityEdit = resolve => require(['@/pages/provider/ware/wareInput/activityEdit'], resolve)

const WareServiceList = resolve => require(['@/pages/provider/ware/serviceList'], resolve)
const WareActivityList = resolve => require(['@/pages/provider/ware/activityList'], resolve)
 
// 商品管理 
const ProWareList = resolve => require(['@/pages/provider/ware/wareList'], resolve)

// 商品详情
const ProWareDetail = resolve => require(['@/pages/provider/ware/wareDetail'], resolve)

// 商品Sku设置
const WareSkuSet = resolve => require(['@/pages/provider/ware/skuSet'], resolve)
const ServiceSkuSet = resolve => require(['@/pages/provider/ware/serviceSkuSet'], resolve)
const ActivitySkuSet = resolve => require(['@/pages/provider/ware/activitySkuSet'], resolve)

// 商品出入库列表
const WareStorageList = resolve => require(['@/pages/provider/ware/storageList'], resolve)
// 商品出入库操作
const WareStorageSet = resolve => require(['@/pages/provider/ware/storageSet'], resolve)

// 商品上下架列表
const ProShelfManage = resolve => require(['@/pages/provider/ware/shelfManage'], resolve)

// 附属商品上下架
const ServiceShelfList = resolve => require(['@/pages/provider/ware/serviceShelfList'], resolve)
const ActivityShelfList = resolve => require(['@/pages/provider/ware/activityShelfList'], resolve)

//订单管理
const ProOrderConfirmed = resolve => require(['@/pages/provider/order/confirmed'], resolve)
const ProOrderDetail = resolve => require(['@/pages/provider/order/OrderDetail'], resolve)
const ProRefundOrderDetail = resolve => require(['@/pages/provider/order/refundOrderDetail'], resolve)
const ProChangeOrderDetail = resolve => require(['@/pages/provider/order/changeOrderDetail'], resolve)
const ProSystemFreezeOrderDetail = resolve => require(['@/pages/provider/order/systemFreezeOrderDetail'], resolve)
const ProPendingPayment = resolve => require(['@/pages/provider/order/pendingPayment'], resolve)
const ProInService = resolve => require(['@/pages/provider/order/inService'], resolve)
const ProSettlement = resolve => require(['@/pages/provider/order/settlement'], resolve)
const ProHistory = resolve => require(['@/pages/provider/order/history'], resolve)
const ProProblem = resolve => require(['@/pages/provider/order/problem'], resolve)
const ProRefunds = resolve => require(['@/pages/provider/order/refunds'], resolve)
const ProChangeOrders = resolve => require(['@/pages/provider/order/changeOrders'], resolve)
const ProSystemFreeze = resolve => require(['@/pages/provider/order/systemFreeze'], resolve)

/********************  供应商管理 end  ******************/

/********************  平台管理 start ******************/
// 商品审核列表
const WareVerifyList = resolve => require(['@/pages/admin/ware/verifyList'], resolve)
// 商品审核详情
const WareVerifyDetail = resolve => require(['@/pages/admin/ware/verifyDetail'], resolve)

// 商品上下架列表
const AdmShelfManage = resolve => require(['@/pages/admin/ware/shelfManage'], resolve)

// 商品价格管理列表
const WarePriceList = resolve => require(['@/pages/admin/ware/priceList'], resolve)
// 商品价格设置
const WarePriceSet = resolve => require(['@/pages/admin/ware/priceSet'], resolve)
// 商品管理
const AdmWareManage = resolve => require(['@/pages/admin/ware/wareManage'], resolve)
// 商品详情
const AdmWareDetail = resolve => require(['@/pages/admin/ware/wareDetail'], resolve)
// 商品Sku展示
const WareSkuShow = resolve => require(['@/pages/admin/ware/skuShow'], resolve)

//平台-订单管理
// const AdmOrderConfirmed = resolve => require(['@/pages/admin/order/confirmed'], resolve)
const AdmOrderDetail = resolve => require(['@/pages/admin/order/OrderDetail'], resolve)
const AdmRefundOrderDetail = resolve => require(['@/pages/admin/order/refundOrderDetail'], resolve)
const AdmRefundApplyingDetail = resolve => require(['@/pages/admin/order/refundApplyingDetail'], resolve)
const AdmChangeOrderDetail = resolve => require(['@/pages/admin/order/changeOrderDetail'], resolve)
const AdmSystemFreezeOrderDetail = resolve => require(['@/pages/admin/order/systemFreezeOrderDetail'], resolve)
const AdmPendingPayment = resolve => require(['@/pages/admin/order/pendingPayment'], resolve)
const AdmInService = resolve => require(['@/pages/admin/order/inService'], resolve)
const AdmSettlement = resolve => require(['@/pages/admin/order/settlement'], resolve)
const AdmHistory = resolve => require(['@/pages/admin/order/history'], resolve)
const AdmProblem = resolve => require(['@/pages/admin/order/problem'], resolve)
const AdmRefunds = resolve => require(['@/pages/admin/order/refunds'], resolve)
const AdmChangeOrders = resolve => require(['@/pages/admin/order/changeOrders'], resolve)
const AdmSystemFreeze = resolve => require(['@/pages/admin/order/systemFreeze'], resolve)
const AdmchangeOperation = resolve => require(['@/pages/admin/order/changeOperation'], resolve)

//平台系统管理
//属性管理
const AttributeManage = resolve => require(['@/pages/admin/system/attributeManage'], resolve)
// 属性模板管理
const TemplateManage = resolve => require(['@/pages/admin/system/templateManage'], resolve)
// 品类管理
const CategoryManage = resolve => require(['@/pages/admin/system/categoryManage'], resolve)

// 策略管理
const SettlementStrategy = resolve => require(['@/pages/admin/system/settlementStrategy'], resolve)
const RetreatStrategy = resolve => require(['@/pages/admin/system/retreatStrategy'], resolve)
const retreatStrategyList = resolve => require(['@/pages/admin/system/retreatStrategyList'], resolve)
const retreatStrategyAdd = resolve => require(['@/pages/admin/system/retreatStrategyAdd'], resolve)
const retreatStrategyEdit = resolve => require(['@/pages/admin/system/retreatStrategyEdit'], resolve)

/********************  平台管理 end  ******************/

/********************  分销商管理 start  ******************/
//订单管理
const DisPenddingCompletion = resolve => require(['@/pages/distributor/order/penddingCompletion'], resolve)
const DisCustomInfoCompletion = resolve => require(['@/pages/distributor/order/customInfoCompletion'], resolve)
const DisPendingPayment = resolve => require(['@/pages/distributor/order/pendingPayment'], resolve)
const DisInService = resolve => require(['@/pages/distributor/order/inService'], resolve)
const DisHistory = resolve => require(['@/pages/distributor/order/history'], resolve)
const DisOrderDetail = resolve => require(['@/pages/distributor/order/orderDetail'], resolve)
const confirmSheet = resolve => require(['@/pages/distributor/order/confirmSheet'], resolve)

/********************  分销商管理 end  ******************/

const routes = [
  {
    path: '/',
    redirect: '/home/welcome'
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
    path: '/home',
    name: '悦视觉系统',
    component: Layout,
    children: [
      { path: 'welcome', name: '首页', component: Home },
    ]
  },
  {
    path: '/provider/ware',
    name: '供应商-商品管理',
    component: Layout,
    children: [
      { path: 'brandManage', name: '品牌管理', component: BrandManage },
      { 
        path: 'new', name: '新建商品', component: WareNew,
        children: [
          { path: 'base', name: '基本信息', component: WareBase },
          { path: 'trip', name: '行程介绍', component: WareTrip },
          { path: 'multimedia', name: '多媒体', component: WareMultiMedia },
          { path: 'charge', name: '费用/预定限制', component: WareCharge },
          { path: 'storage', name: '价格库存', component: WareStorage },
          { path: 'service', name: '附加服务', component: WareService },
          { path: 'activity', name: '新增推荐活动', component: WareActivity },
        ] 
      },
      { 
        path: 'edit', name: '编辑商品', component: WareEdit,
        children: [
          { path: 'base', name: '基本信息编辑', component: WareBaseEdit },
          { path: 'trip', name: '行程介绍编辑', component: WareTrip },
          { path: 'multimedia', name: '多媒体编辑', component: WareMultiMedia },
          { path: 'charge', name: '费用/预定限制编辑', component: WareCharge },
          { path: 'storage', name: '价格库存编辑', component: WareStorage },
          { path: 'service', name: '附加服务编辑', component: WareServiceEdit },
          { path: 'activity', name: '推荐活动编辑', component: WareActivityEdit },
        ] 
      },
      { 
        path: 'serviceSkuSet', name: '附加服务-价格库存', component: ServiceSkuSet 
      },
      { 
        path: 'activitySkuSet', name: '推荐活动-价格库存', component: ActivitySkuSet 
      },
      { 
        path: 'wareManage', name: '商品管理', component: ProWareList 
      },
      { 
        path: 'wareDetail', name: '商品详情', component: ProWareDetail 
      },
      {
        path: 'storageManage', name: '商品库存管理', component: WareStorageList,
      },
      { path: 'serviceList', name: '附加服务库存', component: WareServiceList },
      { path: 'activityList', name: '推荐活动库存', component: WareActivityList },
      {
        path: 'storageSet', name: '商品库存设置', component: WareStorageSet
      },
      {
        path: 'shelfManage', name: '商品上下架', component: ProShelfManage
      },
      { path: 'serviceShelfList', name: '附加服务上下架', component: ServiceShelfList },
      { path: 'activityShelfList', name: '推荐活动上下架', component: ActivityShelfList },
    ]
  },
  {
    path: '/provider/order',
    name: '供应商-订单管理',
    component: Layout,
    children:[
      { path:'confirmed',name:'供应商-待确认订单',component: ProOrderConfirmed },
      { path:'orderDetail',name:'供应商-订单明细',component: ProOrderDetail },
      { path:'refundOrderDetail',name:'供应商-退款订单明细', component: ProRefundOrderDetail },
      {
        path:'changeOrderDetail',
        name:'供应商-改单订单明细',
        component: ProChangeOrderDetail
      },
      {
        path:'systemFreezeOrderDetail',
        name:'供应商-冻结订单明细',
        component: ProSystemFreezeOrderDetail
      },{
        path:'payment',
        name:'供应商-待支付订单',
        component: ProPendingPayment
      },{
        path:'inService',
        name:'供应商-服务中订单',
        component: ProInService,
      },{
        path:'settlement',
        name:'供应商-订单结算',
        component: ProSettlement
      },{
        path:'history',
        name:'供应商-历史订单',
        component: ProHistory
      },{
        path:'problem',
        name:'供应商-问题订单',
        component: ProProblem,
        children:[
          {
            path:'refunds',
            name:'供应商-退款',
            component: ProRefunds
          },{
            path:'changeOrders',
            name:'供应商-改单',
            component: ProChangeOrders
          },{
            path:'systemFreeze',
            name:'供应商-系统冻结',
            component: ProSystemFreeze
          }
        ]
      }
    ]
  },
  {
    path: '/admin/ware',
    name: '平台-商品管理',
    component: Layout,
    children: [
      { path: 'manage', name: '平台-商品列表', component: AdmWareManage },
      { path: 'detail', name: '平台-商品详情', component: AdmWareDetail },
      { path: 'verifyList', name: '商品审核列表', component: WareVerifyList },
      { path: 'verifyDetail', name: '商品审核详情', component: WareVerifyDetail },
      { path: 'shelfManage', name: '平台-商品上下架', component: AdmShelfManage },
      { path: 'priceManage', name: '平台-商品价格管理', component: WarePriceList },
      { path: 'priceSet', name: '平台-商品价格设置', component: WarePriceSet },
      { path: 'skuShow', name: '平台-商品价格库存', component: WareSkuShow },
    ]
  },
  {
    path: '/admin/system',
    name: '平台-系统管理',
    component: Layout,
    children: [
      {
        path: 'propertyManage',
        name: '属性管理',
        component: AttributeManage
      },
      {
        path: 'templateManage',
        name: '属性模板管理',
        component: TemplateManage
      },
      {
        path: 'categoryManage',
        name: '品类管理',
        component: CategoryManage
      },
      // {
      //   path: 'marketingStrategy',
      //   name: '营销策略管理',
      //   component: MarketingStrategy
      // },
      {
        path: 'settlementStrategy',
        name: '结算策略管理',
        component: SettlementStrategy
      },
      {
        path: 'retreatStrategy',
        name: '退改策略管理',
        component: RetreatStrategy,
        children:[
          {
            path: 'retreatStrategyList',
            name: '退改策略管理列表',
            component: retreatStrategyList
          },
          {
            path: 'retreatStrategyAdd',
            name: '退改策略管理新增',
            component: retreatStrategyAdd
          },
          {
            path: 'retreatStrategyEdit',
            name: '退改策略管理编辑',
            component: retreatStrategyEdit
          }
        ]
      },
    ]
  },
  {
    path: '/admin/order',
    name: '平台-订单管理',
    component: Layout,
    children:[
      {
        path:'orderDetail',
        name:'平台-订单明细',
        component: AdmOrderDetail
      },
      {
        path:'refundOrderDetail',
        name:'平台-退款订单明细',
        component: AdmRefundOrderDetail
      },
      {
        path:'changeOrderDetail',
        name:'平台-改单订单明细',
        component: AdmChangeOrderDetail
      },
      {
        path:'systemFreezeOrderDetail',
        name:'平台-冻结订单明细',
        component: AdmSystemFreezeOrderDetail
      },{
        path:'payment',
        name:'平台-待支付订单',
        component: AdmPendingPayment
      },{
        path:'inService',
        name:'平台-服务中订单',
        component: AdmInService,
      },{
        path:'settlement',
        name:'平台-订单结算',
        component: AdmSettlement
      },{
        path:'history',
        name:'平台-历史订单',
        component: AdmHistory
      },{
        path:'refundApplyingDetail',
        name:'退款操作',
        component: AdmRefundApplyingDetail
      },{
        path:'problem',
        name:'平台-问题订单',
        component: AdmProblem,
        children:[
          {
            path:'refunds',
            name:'平台-退款',
            component: AdmRefunds
          },{
            path:'changeOrders',
            name:'平台-改单',
            component: AdmChangeOrders
          },{
            path:'systemFreeze',
            name:'平台-系统冻结',
            component: AdmSystemFreeze
          }
        ]
      },{
        path:'changeOperation',
        name:'平台-改单操作',
        component: AdmchangeOperation
      }
    ]
  },
  // {
  //   path: '/admin/customer',
  //   name: '平台-顾客管理',
  //   component: Layout,
  //   children: [
  //     { path: 'query', name: '顾客查询', component: userManage }
  //   ]
  // },
  {
    path: '/distributor/order',
    name: '分销商-订单管理',
    component: Layout,
    children: [
      {
        path: 'complete',
        name: '分销商-待完善信息订单',
        component: DisPenddingCompletion
      },
      {
        path: 'payment',
        name: '分销商-待支付订单',
        component: DisPendingPayment
      },
       {
        path: 'inService',
        name: '分销商-服务中订单',
        component: DisInService
      },
      {
        path: 'history',
        name: '分销商-历史订单',
        component: DisHistory
      },
      {
        path: 'orderDetail',
        name: '分销商-订单明细',
        component: DisOrderDetail
      },
      {
        path: 'customInfoCompletion',
        name: '分销商-顾客信息完善',
        component: DisCustomInfoCompletion
      },
      { 
        path: 'confirmSheet',
        name: '分销商-确认单',
        component: confirmSheet
      }]
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
