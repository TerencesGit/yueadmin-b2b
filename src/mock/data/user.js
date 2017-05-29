import Mock from 'mockjs'
const LoginUsers = [
	{
		id: 1,
		username: 'admin',
		password: '123456',
		name: 'Transform'
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

export { LoginUsers, Users }