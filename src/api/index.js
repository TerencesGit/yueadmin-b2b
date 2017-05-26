import axios from 'axios'
import Qs from 'qs'
axios.defaults.baseURL = '/baseUrl'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('sessionId')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [(data) => { return Qs.stringify(data) }]
axios.defaults.timeout = 5000

// 登录
export const requestLogin = data => { return axios.post('/user/loginByMobileAndPassword.json', data) }
// 退出
export const requestExit = data => { return axios.post('/user/logout.json', data) }

export const getCustomerUserInfo = data => { return axios.post('/user/getCustomerUserInfo.json', data) }

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
