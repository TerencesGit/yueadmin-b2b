import axios from 'axios'
import Qs from 'qs'
axios.defaults.baseURL = ''
axios.defaults.headers.common['Authorization'] = localStorage.getItem('sessionId')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [(data) => { 
	return Qs.stringify(data)
}]
axios.defaults.timeout = 5000
const loginUrl = axios.create({ baseURL: '/loginUrl' })
const baseUrl = axios.create({ baseURL: '/baseUrl' })
const jsonUrl = axios.create({
	baseURL: '/baseUrl',
	headers: {'Content-Type': 'application/json'},
  transformRequest: [function (data) {
    return data  
  }]
})
/**
 * ############### 用户登录 ###############
 */  
export const requestLogin = data => { return loginUrl.post('/user/loginByMobileAndPassword.json', data) }
export const requestExit = data => { return loginUrl.post('/user/logout.json', data) }
export const getCustomerUserInfo = data => { return loginUrl.post('/user/getCustomerUserInfo.json', data) }
/**
 * ############### 供应商-商品管理 ###############
 */
// 商品品牌管理
export const getBrandInfoList = params => { return baseUrl.get('/brand/readBrandInfoList', {params: params}) }
export const saveBrandInfo = data => { return jsonUrl.post('/brand/createOrUpdateBrandInfo', data) }

// 商品录入-基本信息
export const saveWareInfo = data => { return jsonUrl.post('/ware/createOrUpdateWareInfo', data) }

// 商品录入-多媒体
export const getWareFileList = params => { return baseUrl.get('/ware/file/readWareFileInfo', {params: params}) }
export const createWareFile = data => { return jsonUrl.post('/ware/file/createWareFile', data) }
export const updatetWareFileState = data => { return baseUrl.post('/ware/file/updateState', data) }
export const updateWareFileIsMainPic = data => { return baseUrl.post('/ware/file/updateIsMainPic', data) }
export const deleteWareFile = data => { return baseUrl.post('/ware/file/updateImgIsEnable', data) }

/**
 *  Mock测试
 */
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
// 商品上下架
export const setShelfStatus = data => { return axios.post('/ware/shelfManage', data) }
// 获取商品库存
export const getStockByWareId = params => { return axios.get('/ware/getStockByWareId', {params: params}) }
//多媒体
export const uploadlist = data => { return axios.post('/upload/list', data) }

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

export const getRandomImage = () => { return axios.get('/user/getRandomImage.json') }

export const getMobileSmsCode = data => { return axios.post('/sms/getMobileSmsCode.json', data) }

export const requestRegister = data => { return axios.post('/user/registe.json', data) }

export const resetPassword = data => { return axios.post('/user/resetPasswordById.json', data) }

export const loginBySmsCode = data => { return axios.post('/user/loginByMobileAndSmsCode.json', data) }

export const modifyPassword = data => { return axios.post('/user/modifyPassword.json', data) }
