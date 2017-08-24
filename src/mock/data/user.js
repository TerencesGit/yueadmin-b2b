import Mock from 'mockjs'
const UserPerssionList = [
    {
      name: '供应商-商品管理',
      icon: 'fa-paw',
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
    	icon: 'fa-paw',
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
      icon: 'fa-desktop',
      children: [
        {name: '属性管理', link: '/admin/system/propertyManage', index: '/admin/system/propertyManage'},
        {name: '属性模板管理', link: '/admin/system/templateManage', index: '/admin/system/templateManage'},
        {name: '品类管理', link: '/admin/system/categoryManage', index: '/admin/system/categoryManage'},
        // {name: '营销策略管理', link: '/admin/system/marketingStrategy', index: '/admin/system/marketingStrategy'},
        {name: '结算策略管理', link: '/admin/system/settlementStrategy', index: '/admin/system/settlementStrategy'},
        {name: '退改策略管理', link: '/admin/system/retreatStrategy', index: '/admin/system/retreatStrategy'},
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
    // 	name: '平台-顾客管理',
    // 	icon: 'fa-desktop',
    //   children: [
    //   	{name: '顾客查询', link: '/admin/customer/query', index: '/admin/customer/query'},
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
] 
const Users = []
for (let i = 0; i < 20; i++) {
	Users.push(Mock.mock({
		id: Mock.Random.guid(),
		name: Mock.Random.cname(),
		addr: Mock.mock('@county(true)'),
		'age|18-30': 1,
		birth: Mock.Random.date(),
		gender: Mock.Random.integer(0, 1)
	}))
}

export { Users, UserPerssionList }