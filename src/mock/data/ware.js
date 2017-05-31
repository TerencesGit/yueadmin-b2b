import Mock from 'mockjs'

// 商品品牌
const Brands = []
for (let i = 0; i < 20; i++) {
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
export { Brands }