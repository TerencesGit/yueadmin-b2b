import axios from 'axios'
import Qs from 'qs'
axios.defaults.baseURL = '/baseUrl'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('sessionId')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [(data) => { return Qs.stringify(data) }]
axios.defaults.timeout = 5000

// 登录
export const requestLogin = data => { return axios.post('/ysj/auth/login.json', data) }

// 获取用户权限
export const getPermissionList = () => { return axios.get('/ysj/permission/getPermissionList.json')}

// 注册
export const requestRegister = data => { return axios.post('/register', data) }

// 登出
export const requestExit = params => { return axios.get('/ysj/auth/logout.json', {params: params})}

//商户管理页面-获取用户分页
export const paginationYueShops = params => { return axios.get('/ysj/yueShop/paginationYueShops.json', {params: params})}

//商户管理页面-商户接口-修改商户状态
export const updateYueShopStatusById = params => { return axios.get('/ysj/yueShop/updateYueShopStatusById.json', {params: params})}

//商户管理页面-商户接口 (添加或修改)
export const operateYueShop = data => { return axios.post('/ysj/yueShop/operateYueShop.json', data)}
