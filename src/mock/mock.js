import axios from 'axios'
import Qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'
let _Users = Users

export default {
	bootstrap () {
		let mock = new MockAdapter(axios);

		mock.onGet('/success').reply(200, {
			msg: 'success'
		})
		mock.onGet('/error').reply(500, {
			msg: 'error'
		})
		// 登录
		mock.onPost('/login').reply(config => {
			let {username, password} = JSON.parse(config.data)
			return new Promise((resolve, reject) => {
				let user = null;
				setTimeout(() => {
					let hasUser = LoginUsers.some(u => {
						if (u.username === username && u.passowrd === password) {
							user = JSON.parse(JSON.stringify(u))
							user.password = undefined
							return true
						}
					})

					if (hasUser) {
						resolve([200, { code: 200, msg: '请求成功', user}])
					} else {
						resolve([200, { code: 500, msg: '账号密码错误'}])
					}
				}, 1000)
			})
		})
		// 用户列表
		mock.onGet('/user/list').reply(config => {
			let {name} = config.params;
			let mockUsers = _Users.filter(user => {
				if (name &&　user.name.indexOf(name) == -1) return false
				return true
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						users: mockUsers
					}])
				}, 1000)
			})
		})
		// 用户列表（分页）
		mock.onGet('/user/listpage').reply(config => {
			let {page, name} = config.params;
			let mockUsers = _Users.filter(user => {
				if (name && user.name.indexOf(name) == -1) return false;
			  return true;
			})
			let total = mockUsers.length;
			mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						total: total,
						users: mockUsers
					}])
				}, 1000)
			})
		})
		// 删除用户
		mock.onGet('/user/remove').reply(config => {
			let { id } = config.params;
			_Users = _Users.filter(u => u.id !== id)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 200,
						msg: '删除成功'
					}])
				}, 500)
			})
		})
		// 用户编辑
		mock.onGet('/user/edit').reply(config => {
			let { id, name, addr, age, birth, gender } = config.params;
			_Users.some(u => {
				if (u.id === id) {
					u.name = name;
					u.addr = addr;
					u.age = age;
					u.birth = birth;
					u.gender = gender
				}
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 200,
						msg: '编辑成功'
					}])
				}, 500)
			})
		})
		// 添加用户
		mock.onPost('/user/add').reply(config => {
			let { name, addr, age, birth, gender } = Qs.parse(config.data) 
			_Users.push({
				name: name,
				addr: addr,
				age: age,
				birth: birth,
				gender: gender
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 200,
						msg: '新增成功'
					}])
				}, 500)
			})
		})
	}
}