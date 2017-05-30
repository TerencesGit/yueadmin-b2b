import Mock from 'mockjs'

const Brands = []

for (let i = 0; i < 20; i++) {
	Brands.push(Mock.mock({
		brandId: Mock.Random.guid(),
		brandName: Mock.mock('@ctitle()'),
		content: Mock.mock('@csentence()'),
		brandPage: Mock.mock('@url'),
		updateTime: Mock.Random.date(),
		status: Mock.Random.integer(0, 1)
	}))
}
export { Brands }