import axios from 'axios'
import Qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
import { Users, UserPerssionList } from './data/user'
import { Brands } from './data/ware'
let _Users = Users
let _Brands = Brands

export default {
	bootstrap () {
		let mock = new MockAdapter(axios);

		mock.onGet('/success').reply(200, {
			msg: 'success'
		})
		mock.onGet('/error').reply(500, {
			msg: 'error'
		})
		// 用户权限
		mock.onGet('/user/permissionList.json').reply(config => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						permissionList: UserPerssionList
					}])
				})
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
		// 品牌管理
		mock.onGet('/provider/ware/getBrandList').reply(config => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						brandList: _Brands
					}])
				})
			})
		})
		// 品牌编辑
		mock.onPost('/ware/brand/edit').reply(config => {
			let { brandId, brandName, logoUrl, content, brandPage, status } = Qs.parse(config.data)
			Brands.some(b => {
				if (b.brandId === brandId) {
					b.brandName = brandName;
					b.logoUrl = logoUrl;
					b.content = content;
					b.brandPage = brandPage;
					b.status = parseInt(status);
					return true;
				}
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						brandList: Brands
					}])
				}, 500)
			})
		})
		// 品牌创建
		mock.onPost('ware/brand/add').reply(config => {
			let { brandName, logoUrl, content, brandPage, status } = Qs.parse(config.data)
			Brands.push({
				brandName: brandName,
				logoUrl: 'https://avatars0.githubusercontent.com/u/26806103?v=3&s=460',
				content: content,
				brandPage: brandPage,
				status: parseInt(status)
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '创建成功'
					}])
				}, 1000)
			})
		})
		// 品牌删除
		mock.onPost('ware/brand/del').reply(config => {
			let { id } = Qs.parse(config.data)
			_Brands = _Brands.filter(b => b.brandId !== id)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '删除成功'
					}])
				}, 1000)
			})
		})
	}
}