import axios from 'axios'
import Qs from 'qs'
axios.defaults.baseURL = ''
axios.defaults.headers.common['Authorization'] = localStorage.getItem('sessionId')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [(data) => { return Qs.stringify(data) }]
axios.defaults.timeout = 5000
const instant = axios.create({ baseURL: '/baseUrl' })
const upload = axios.create({ 
	headers: {'Content-Type': 'multipart/form-data'},
  transformRequest: [function (data) {
    return data
  }]
})
// 登录
export const requestLogin = data => { return instant.post('/user/loginByMobileAndPassword.json', data) }
// 退出
export const requestExit = data => { return instant.post('/user/logout.json', data) }
// 获取用户信息
export const getCustomerUserInfo = data => { return instant.post('/user/getCustomerUserInfo.json', data) }
// 获取用户权限
export const getPermissionList = () => { return axios.get('/user/permissionList.json') }
// 用户列表
export const getUserListPage = params => { return axios.get('/user/listpage', {params: params}) }
// 用户删除
export const removeUser = params => { return axios.get('/user/remove', {params: params}) }
// 用户编辑
export const editUser = params => { return axios.get('/user/edit', {params: params}) }
// 用户新增
export const addUser = data => { return axios.post('/user/add', data) }
// 品牌列表
export const getBrandList = params => { return axios.get('/provider/ware/getBrandList', {params: params}) }
// 品牌编辑
export const brandEdit = data => { return axios.post('ware/brand/edit', data) }
// 品牌创建
export const brandAdd = data => { return axios.post('ware/brand/add', data) }
// 品牌删除
export const brandDel = data => { return axios.post('ware/brand/del', data) }
// 批量删除
export const brandBatchDel = data => { return axios.post('ware/brand/batchDel', data) }
// 获取品类列表
export const getKindList = () => { return axios.get('/ware/getKindList') }
// 新增品类
export const addKind = data => { return axios.post('/ware/addKind', data) }
// 删除品类
export const delKind = data => { return axios.post('/ware/delKind', data) }
// 商品列表
export const getWareList = params => { return axios.get('/ware/getWareList', {params: params}) }

//多媒体
export const uploadlist = data => { return axios.post('/upload/list', data) }

export const getRandomImage = () => { return axios.get('/user/getRandomImage.json') }

export const getMobileSmsCode = data => { return axios.post('/sms/getMobileSmsCode.json', data) }

export const requestRegister = data => { return axios.post('/user/registe.json', data) }

export const resetPassword = data => { return axios.post('/user/resetPasswordById.json', data) }

export const loginBySmsCode = data => { return axios.post('/user/loginByMobileAndSmsCode.json', data) }

export const modifyPassword = data => { return axios.post('/user/modifyPassword.json', data) }

export const getShopMechanismInfoList = data => { return axios.post('/appShop/getShopMechanismInfoList.json', data) }

export const getPartList = data => { return axios.post('/order/partList.json', data) }

export const createOrder = data => { return axios.post('/order/createOrder.json', data) }

export const getUserOrderApplyInfo = data => { return axios.post('/order/getUserOrderApplyInfo.json', data) }

export const confirmHarvestOrder = data => { return axios.post('/order/confirmHarvestOrder.json', data) }

export const updateCustomerUserInfo = data => { return axios.post('/user/updateCustomerUserInfo.json', data) }
