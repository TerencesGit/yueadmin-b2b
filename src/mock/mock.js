import axios from 'axios'
import Qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
import { Users, UserPerssionList } from './data/user'
import { Brands, WareKind, Wares } from './data/ware'
let _Users = Users
let _Brands = Brands
let _KindList = WareKind
let _Wares = Wares

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
			let { name, page, pageSize } = config.params;
			let _BrandList = _Brands.filter(brand => {
				if (brand && brand.brandName.indexOf(name) == -1) return false;
			  return true;
			})
			let total = _BrandList.length;
			_BrandList = _BrandList.filter((b, index) => index < pageSize * page && index >= pageSize * (page - 1))
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						brandList: _BrandList,
						total: total
					}])
				}, 1000)
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
		// 批量删除
		mock.onPost('ware/brand/batchDel').reply(config => {
			let { ids } = Qs.parse(config.data)
			ids = ids.split(',');
			console.log(ids)
      _Brands = _Brands.filter(b => !ids.includes(b.brandId));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: '0001',
            msg: '删除成功'
          }]);
        }, 500);
      });
		})
		// 商品品类列表
		mock.onGet('/ware/getKindList').reply(config => {
			console.log(_KindList)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						KindList: _KindList,
					}])
				}, 1000)
			})
		})
		// 新增商品品类
		mock.onPost('/ware/addKind').reply(config => {
			let kind = Qs.parse(config.data)
			console.log(kind)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '添加成功'
					}])
				}, 1000)
			})
		})
		// 商品列表
		mock.onGet('/ware/getWareList').reply(config => {
			let { page, pageSize } = config.params;
			let total = _Wares.length;
			_Wares = _Wares.filter((b, index) => index < pageSize * page && index >= pageSize * (page - 1))
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						wareList: _Wares,
						total: total
					}])
				}, 1000)
			})
		})
		//多媒体表单
		mock.onPost('/upload/list').reply(config => {
			let { country, view, tag, desc, copyright, url, les } = Qs.parse(config.data);
			let upload={
					country: country,
					view: view,
					tag: tag,
					desc: desc,
					copyright: copyright,
					url: url,
					les: les
			}
			let uploads=[];
			for(let i=0;i<upload.les;i++){
				uploads.push(upload);
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						uploads: uploads
					}])
				}, 500)
			})
		})
		mock.onPost('/ware/shelfManage').reply(config => {
			let { wareId, status } = Qs.parse(config.data)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						result: null
					}])
				})
			})
 		})
	}
}