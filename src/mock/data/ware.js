import Mock from 'mockjs'
const Brands = []
for (let i = 0; i < 10; i++) {
	Brands.push(Mock.mock({
		brandId: parseInt(Mock.Random.id()),
		brandName: Mock.mock('@ctitle()'),
		logoUrl: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
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
for (let i = 0; i < 50; i++) {
	Wares.push(Mock.mock({
		wareId: Mock.Random.id(),
		wareCode: Mock.Random.id(),
		wareName: Mock.mock('@ctitle(5, 8)'),
		srcCityName: Mock.mock('@city'),
		dstCityName: Mock.mock('@city'),
		// wareKind: Mock.mock('@ctitle(3, 5)'),
		verifyStatus: Mock.Random.integer(0, 2),
		createTime: Mock.Random.datetime()
	}))
}
export { Brands, WareKind, Wares }