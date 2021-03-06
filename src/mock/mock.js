import axios from 'axios'
import Qs from 'qs'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import Utils from '@/assets/js/utils'
import { UserList, UserPerssionList } from './data/user'
import { Brands, WareKind, Wares, Files, SkuList, ServiceList, 
				AttributeInfo, TripDetailList, OrderList } from './data/ware'
let _UserList = UserList,
		_Brands = Brands,
		_KindList = WareKind,
		_Wares = Wares,
		_TripDetailList = TripDetailList,
		_FileList = Files,
		_OrderList = OrderList;
const retObj = {
	code: '0001',
	message: '操作成功',
	result: {}
}
const retExpireObj = {
	code: '0000',
	message: '尚未登录或当前会话已过期',
	result: {}
}
export default {
	bootstrap () {
		let mock = new MockAdapter(axios);
		// 登录
		mock.onPost('/login').reply(config => {
			let { username, password } = JSON.parse(config.data);
			let loginUser = _UserList.filter(user => user.email === username)[0];
			if(loginUser) {
				if(loginUser.password === password) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							retObj.result.userInfo = loginUser;
							resolve([200, retObj])
						}, 500)
					})
				} else {
					let retObj = {
						code: '1002',
						message: '密码错误'
					}
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve([200, retObj])
						}, 500)
					})
				}
			} else {
				let retObj = {
					code: '1001',
					message: '用户名不存在'
				}
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retObj])
					}, 500)
				})
			}
		})
		// 登出
		mock.onGet('/logout').reply(config => {
			Utils.delCookie('userId')
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 查询邮箱或手机号是否已被使用
		mock.onGet('/baseInter/accountFind.do').reply(config => {
			let { account } = config.params;
			// console.log(account)
			let _user = _UserList.filter(user => user.email === account);
			let finded = _user.length > 0 ? true : false;
			retObj.result = {
				finded
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 发送找回密码邮件
		mock.onPost('/baseInter/sendForgotPwdEmail.do').reply(config => {
			let { email } = JSON.parse(config.data)
			console.log(email)
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 重置密码
		mock.onPost('/baseInter/resetPasswd.do').reply(config => {
			let { passwd, passwd2 } = JSON.parse(config.data)
			console.log(passwd, passwd2)
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 获取当前用户信息
		mock.onGet('/accountInter/getMyInfo.do').reply(config => {
			let userId = Utils.getCookie('userId');
			if(!userId) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retExpireObj])
					}, 500)
				})
			}
			let _userInfo = _UserList.filter(user => user.userId == userId)[0];
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					userInfo: _userInfo
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
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
				if (name && user.name.indexOf(name) == -1) return false
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
		mock.onGet('ware/readBrandList').reply(config => {
			let { brandName, currPage, pageSize } = config.params;
			// let _BrandList = _Brands
			// .filter(brand => {
			// 	if (brand && brand.brandName.indexOf(brandName) === -1) return false;
			//   return true;
			// })
			let total = _Brands.length;
			let _BrandList = []
			if(!currPage) {
				_BrandList = _Brands;
			} else {
				_BrandList = _Brands.filter((brand, index) => index < pageSize * currPage && index >= pageSize * (currPage - 1))
			}
			retObj.result = {
				brandInfo: _BrandList,
				pageInfo: {
					count: total
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 1000)
			})
		})
		// 品牌新增/编辑
		mock.onPost('ware/saveBrandInfo').reply(config => {
			let { brandId, brandName, logoUrl, content, brandPage, status } = Qs.parse(config.data)
			if(brandId) {
				Brands.some(b => {
					if(b.brandId === brandId) {
						b.brandName = brandName;
						b.logoUrl = logoUrl;
						b.content = content;
						b.brandPage = brandPage;
						b.status = parseInt(status);
						return true;
					}
				})
			} else {
				Brands.push({
					brandName: brandName,
					logoUrl: logoUrl,
					content: content,
					brandPage: brandPage,
					status: status
				})
			}
			return new Promise((resolve, reject) => {
				let total = Brands.length;
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						brandList: Brands,
						pageInfo: {
							count: total
						}
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
		// 品牌状态设置
		mock.onPost('/ware/updateBrandStatus').reply(config => {
			let { brandId } = Qs.parse(config.data)
			Brands.some(brand => {
				if(brand.brandId === brandId) {
					retObj.result = {};
					return true;
				} else {
					let retObj = {
						code: '1002',
						message: '该品牌不存在'
					}
				}
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				})
			})
		})
		// 品牌删除
		mock.onPost('ware/deleteBrandInfo').reply(config => {
			let { brandId } = Qs.parse(config.data)
			console.log(brandId)
			_Brands = _Brands.filter(b => b.brandId !== brandId)
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
		mock.onPost('ware/batchDelBrand').reply(config => {
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
		mock.onGet('/ware/readWareList').reply(config => {
			let { currPage, pageSize, verifyStatus } = config.params;
			// console.log(currPage, pageSize, verifyStatus)
			let pageInfo = {
				count: _Wares.length
			}
			let wareList = [];
			if(verifyStatus > 3 ) {
				wareList = _Wares.filter((b, index) => index < pageSize * currPage && index >= pageSize * (currPage - 1))
			} else {
				let _wareList = _Wares.filter(ware => ware.verifyStatus === verifyStatus)
				pageInfo.count = _wareList.length;
				wareList = _wareList.filter((b, index) => index < pageSize * currPage && index >= pageSize * (currPage - 1))
			}
			retObj.result = {
				wareList: wareList,
				pageInfo: pageInfo
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品信息
		mock.onGet('/ware/readWareInfo').reply(config => {
			let { wareId } = config.params;
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {}
			}
			retObj.result = {
				wareInfo: {
					wareId,
					wareCode: wareId,
					wareName: '巴厘岛蜜月旅拍婚纱摄影3天2晚游',
					tripDays: 3,
					brandId: 10001,
          keyWords: '巴厘岛',
          openDate: new Date(),
          closeDate:  new Date(),
          srcCityCode: 1,
          dstCityCode: 6,
          wareDesc: '巴厘岛蜜月旅拍婚纱摄影3天2晚游',
          briefName: '巴厘岛蜜月旅拍',
          suggestedPrice: '6688',
          srcCityName: '北京',
          dstCityName: '巴厘岛',
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品行程信息
		mock.onGet('/ware/readTripDetailList').reply(config => {
			let { wareId } = config.params;
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {}
			}
			retObj.result = {
				tripDetailList: _TripDetailList
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品行程信息新增/编辑
		mock.onPost('/ware/saveWareTripDetail').reply(config => {
			let { id, tripDayNum, programType, programTime, programTitle, 
				programIsFree, programDuration, programDetail} = Qs.parse(config.data);
			if(id) {
				_TripDetailList.some(trip => {
					if(trip.id == id) {
						trip.programType = programType; 
						trip.programTime = programTime; 
						trip.programTitle = programTitle; 
						trip.programIsFree = programIsFree + 0; 
						trip.programDuration = programDuration; 
						trip.programDetail = programDetail;
					}
				})
			} else {
				_TripDetailList.push({
					id: new Date().getTime(),
					tripDayNum: tripDayNum * 1,
					programType, 
					programTime, 
					programTitle, 
					programIsFree: programIsFree + 0, 
					programDuration, 
					programDetail,
				})
			}
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			}) 
		})
		// 商品行程删除
		mock.onPost('/ware/deleteTripDetail').reply(config => {
			let { id } = Qs.parse(config.data)
			_TripDetailList = _TripDetailList.filter(trip => trip.id != id)
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		//商品图片新增
		mock.onPost('/ware/createWareFile').reply(config => {
			let { wareId, fileList } = Qs.parse(config.data)
			fileList.forEach(filePath => {
				_FileList.push({
					fileId: Mock.Random.id(),
					filePath,
					createName: Mock.Random.cname(),
					createTime: new Date(),
					isMainPic: 0,
					status: 1,
				})
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		//商品图片列表
		mock.onGet('/ware/readWare_FileList').reply(config => {
			let { wareId } = config.params;
			retObj.result.fileList = _FileList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品图片显示
		mock.onPost('/ware/updateState').reply(config => {
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品图片设为主图
		mock.onPost('/ware/updateIsMainPic').reply(config => {
			let { fileId } = Qs.parse(config.data)
			_FileList.some(file => {
				if(file.fileId === fileId) {
					file.isMainPic = 1
				}
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品图片删除
		mock.onPost('/ware/updateImgIsEnable').reply(config => {
			let { fileIdList } = Qs.parse(config.data)
			fileIdList.forEach(fileId => {
				_FileList = _FileList.filter(file => file.fileId !== fileId.fileId)
			})
			retObj.result = {} 
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 商品属性
 		mock.onGet('/ware/readAttribute').reply(config => {
 			let { wareId } = config.params
 			retObj.result = {
 				AttributeInfo
 			}
 			return new Promise((resolve, reject) => {
 				setTimeout(() => {
 					resolve([200, retObj])
 				}, 500)
 			})
 		})
 		// 商品库存
 		mock.onGet('/ware/readSkuInfoList').reply(config => {
 			let { wareId } = config.params
 			retObj.result = {
 				skuList: SkuList
 			}
 			return new Promise((resolve, reject) => {
 				setTimeout(() => {
 					resolve([200, retObj])
 				}, 500)
 			})
 		})
 		// 附加服务列表
 		mock.onGet('/ware/readWareService').reply(config => {
 			let { wareId } = config.params;
 			retObj.result = {
 				wareServiceList: ServiceList
 			}
 			return new Promise((resolve, reject) => {
 				setTimeout(() => {
 					resolve([200, retObj])
 				}, 500)
 			})
 		})
 		// 推荐活动列表
 		mock.onGet('/ware/readWareActivity').reply(config => {
 			let { wareId } = config.params;
 			retObj.result = {
 				wareActivityList: ServiceList
 			}
 			return new Promise((resolve, reject) => {
 				setTimeout(() => {
 					resolve([200, retObj])
 				}, 500)
 			})
 		})
 		// 商品上下架
		mock.onPost('/ware/shelfManage').reply(config => {
			let { wareId, status } = Qs.parse(config.data)
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: '0001',
						message: '操作成功',
						result: null
					}])
				}, 500)
			})
 		})
 		// 订单列表
 		mock.onGet('/order/readOrderList').reply(config => {
 			let { pageNo, pageSize, status } = config.params;
 			// console.log(pageNo, pageSize, status)
 			// let _orderList = _OrderList.filter(order => order.status == status)
 			let count = _OrderList.length;
 			console.log(_OrderList)
 			let orderPage = _OrderList.filter((order, index) => index < pageNo * pageSize && index >= (pageNo - 1) * pageSize)
 			let retObj = {
 				code: '0001',
				message: '操作成功',
				result: {}
 			}
 			retObj.result = {
 				orderList: orderPage,
 				pageInfo: {
 					count
 				}
 			}
 			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
 		})
	}
}