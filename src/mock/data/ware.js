import Mock from 'mockjs'
const Brands = []
for (let i = 0; i < 15; i++) {
	Brands.push(Mock.mock({
		brandId: parseInt(Mock.Random.id()),
		brandName: Mock.mock('@ctitle()'),
		// logoUrl: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
		logoUrl: Mock.Random.image('200x100', '#'+(Math.random()*0xffffff<<0).toString(16), 
															'#'+(Math.random()*0xffffff<<0).toString(16), 'Logo'),
		content: Mock.mock('@csentence()'),
		brandPage: Mock.mock('@url'),
		updateBy: Mock.Random.cname(),
		updateTime: Mock.mock('@datetime'),
		status: Mock.Random.integer(0, 1)
	}))
}
const WareKind = [{
	  kindId: 10001,
	  kindName: '旅拍',
	  kindDesc: '旅拍旅拍旅拍',
	  parentId: 0,
	  children: [{
	    kindId: 10002,
	    kindName: '婚纱',
	    parentId: '10001',
	    sortId: '2',
	    templateId: '2001'
	  }, {
	    kindId: 10003,
	    kindName: '旅游',
	    parentId: '10001',
	    sortId: '3',
	    templateId: '2002'
	  }]
	}]
const Wares = []
for (let i = 0; i < 30; i++) {
	Wares.push(Mock.mock({
		wareId: Mock.Random.id(),
		wareCode: Mock.Random.id(),
		wareName: Mock.mock('@ctitle(5, 8)'),
		providerName: Mock.mock('@ctitle(5, 6)'),
		srcCityName: Mock.mock('@city'),
		dstCityName: Mock.mock('@city'),
		// wareKind: Mock.mock('@ctitle(3, 5)'),
		verifyStatus: Mock.Random.integer(0, 3),
		createTime: Mock.Random.datetime(),
		upDownTime: Mock.Random.datetime(),
		status: Mock.Random.integer(-1, 1),
	}))
}
const Files = []
for(let i = 0; i < 5; i++) {
	Files.push(Mock.mock({
		fileId: Mock.Random.id(),
		filePath: Mock.Random.image('200x100', '#'+(Math.random()*0xffffff<<0).toString(16), 
															'#'+(Math.random()*0xffffff<<0).toString(16), 'Image'),
		createName: Mock.Random.cname(),
		createTime: new Date(),
		isMainPic: 0,
		status: Mock.Random.integer(0, 1),
	}))
}
const SkuList = []
const currDate = new Date()
for(let i = 1; i <= 30; i++) {
	SkuList.push({
		start: new Date(currDate.getFullYear(), currDate.getMonth(), i),
		skuId: currDate.getTime(),
    skuDate: new Date(currDate.getFullYear(), currDate.getMonth(), i),
    storageNum: Math.floor(Math.random() * 100),
    adultPrice: Math.floor(Math.random() * 10000),
    childPrice: Math.floor(Math.random() * 10000),
    singlePrice: Math.floor(Math.random() * 5000),
	})
}
const ServiceList = []
for(let i = 0; i < 5; i++) {
	ServiceList.push(Mock.mock({
		wareId: Mock.Random.id(),
    wareCode: Mock.Random.id(),
  	wareName: Mock.mock('@ctitle(6, 8)'),
  	briefName: Mock.mock('@ctitle(3, 5)'),
  	keyWords: Mock.mock('@ctitle(3)'),
  	wareDesc: Mock.mock('@csentence(10, 15)'),
  	updateTime: new Date(),
  	suggestedPrice: Math.floor(Math.random() * 10000),
    status: 1
	}))
}
const AttributeInfo = {
	id: 1000001,
	introduce: '<img data-v-5639af09="" src="https://dimg04.c-ctrip.com/images/300h0i0000009k0kr26D9.jpg">',
	charge: `
	<p>1.往返经济舱机票、燃油附加费（以实际收费标准为准）、
	机场建设费</p>
	<p>2.行程所列酒店住宿费用</p>
	<p>3.行程内所列餐食（行程中注明的自理餐除外，
	飞机餐是否收费请参照航空公司规定）。</p>
	<p>4.领队和当地中文导游服务。</p>`,
	explains: `
	<p>5.安排当地专属用车(除部分特殊路段因当地规定及安全考量，
	则依规定派遣小型车)。</p>
	<p>6.行程中所列景点首道大门票，详见行程</p>
	<p>7.新加坡团签、旅游签证费用。</p>
	<p>8.年龄2--12周岁（不含）,不占床,+600，占床+900，添加可选项，
	服务标准同成人</p>`,
	notice: `
	<ol><li>本产品不接受非大陆籍客人预订，敬请谅解！</li>
	<li>本产品不接受81岁以上(含)客人预订，敬请原谅。</li>
	<li>18岁以下未成年人需要至少一名家长或成年旅客全程陪同。</li>
	<li>70周岁（含）以上老年人预订出行需确保身体健康适宜旅游，
	并有25周岁以上家属或朋友（因服务能力所限无法接待及限制接待的人除外）
	程陪同出行。</li>
	<li>本产品不接受儿童按成人提交订单，敬请谅解。</li>
	<li>报价是按照2人入住1间房计算的价格，如您的订单产生单房，
	将安排您与其他客人拼房入住；在无法拼房的情况下，
	将会安排3人间加床（温馨提示：当地酒店面积小，
	加床可能会引起您的不便，敬请谅解）。如您要求享受单房，请在后续附加产品页面中选择单人房差选项。</li></ol>`,
}
export { Brands, WareKind, Wares, Files, SkuList, ServiceList, AttributeInfo }