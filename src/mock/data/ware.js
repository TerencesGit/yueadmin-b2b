import Mock from 'mockjs'

// 商品品牌
const Brands = []
for (let i = 0; i < 50; i++) {
	Brands.push(Mock.mock({
		brandId: Mock.Random.guid(),
		brandName: Mock.mock('@ctitle()'),
		logoUrl: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
		content: Mock.mock('@csentence()'),
		brandPage: Mock.mock('@url'),
		updateTime: Mock.Random.date(),
		status: Mock.Random.integer(0, 1)
	}))
}
const WareKind = [{
	  kindId: 10001,
	  kindName: '旅拍',
	  kindDesc: '旅拍旅拍旅拍',
	  parentId: 0,
	  children: [{
	    kindId: 10007,
	    kindName: '婚纱',
	    parentId: '10001',
	    sortId: '2',
	    templateId: '2001'
	  }, {
	    kindId: 10008,
	    kindName: '旅游',
	    parentId: '10001',
	    sortId: '3',
	    templateId: '2002'
	  }]
	}]
export { Brands, WareKind }