// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'
import App from './App'
import routes from './router'
import store from './vuex/store'
import moment from 'moment'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/base.scss'
import Mock from './mock'
import utils from '@/assets/js/utils'
import VueHtml5Editor from 'vue-html5-editor'
import FullCalendar from '@/components/fullcalendar'
import BackButton from '@/components/back-button'
import LinkStep from '@/components/step'
import LinkSteps from '@/components/steps'
import RegionPicker from '@/components/region-picker'
NProgress.configure({ ease: 'ease', speed: 500, minimum: 0.5, showSpinner: false})
// Mock.bootstrap()
Vue.prototype.$moment = moment
const globalVariable = {
  resError: '服务器响应失败，请重试'
}
Vue.prototype.GLOBAL = globalVariable
Vue.use(Router)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(FullCalendar)
Vue.use(BackButton)
Vue.use(LinkStep)
Vue.use(LinkSteps)
Vue.use(RegionPicker)
const editorOptions = {
    visibleModules: [
      "text",
      "color",
      "font",
      "align",
      "list",
      "link",
      "unlink",
      "tabulation",
      "image",
      "hr",
      "eraser",
      "undo",
      "full-screen",
    ],
    image: {
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传 
        upload: {
            url: '/imgUploadUrl',
            headers: {},
            params: {fileUrlType: 3},
            fieldName: 'fileName'
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩 
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG) 
        // set null to disable compression 
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // 响应数据处理，最终返回图片链接  
        uploadHandler (responseText) {
            let data = JSON.parse(responseText)
            if (data.code === '0001') {
              let filePath = 'http://192.168.199.211:8080/yue_yb2b/' + data.result.file.filePath;
              return filePath;
            } else {
              alert(data.message)
            }
        }
    },
    language: "zh-cn"
}
Vue.use(VueHtml5Editor, editorOptions)
Vue.config.productionTip = false
Vue.filter('DateFormat', (time) => {
	return moment(time).format('YYYY-MM-DD')
})
Vue.filter('DateTimeFormat', (time) => {
	return moment(time).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('TimeFormat', (time) => {
  return moment(time).format('HH:mm')
})
Vue.filter('currency', (amount) => {
  return amount && parseInt(amount) && amount.toFixed(2)
})
Vue.directive('title', {
  inserted (el, binding) {
    document.title = el.dataset.title
  }
})
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
	if(to.path === '/register' || to.path === '/login') {
    // localStorage.clear()
		return next()
	}
	let sessionId = localStorage.getItem('sessionId')
	if (!sessionId && to.path != '/login') {
		next('/login')
	} else {
		NProgress.start()
		next()
	}
})
router.afterEach((to, from, next) => {
  // console.log(to.path) 
  NProgress.done()
})
// request interceptors
axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  console.log('err')
  ElementUI.Message({
    message: '请求失败，请重试'
  })
  return Promise.reject(err)
})
// response interceptors
axios.interceptors.response.use((res) => {
  if (res.data.code ===  '0000') {
  	localStorage.clear()
    ElementUI.Message({
   	  message: '长时间未操作，请重新登录'
    })
    return router.push('/login')
  } else if (res.data.code === '9999') {
  	return router.push('/NoPermission')
  }
  return res;
}, (err) => {
  ElementUI.Message({
 	  message: '服务器响应错误，请重试'
  })
  return Promise.reject(err)
})
// catch error
Vue.prototype.catchError = (res) => {
  if (!res) {
    ElementUI.Message({ message: '服务器响应超时'})
    return;
  }
  if (res.status === 404) {
    ElementUI.Message({ message: '该方法不存在'})
  } else if (res.status === 500) {
    ElementUI.Message({ message: '服务器响应错误'})
  } else if (res.status === 504) {
    ElementUI.Message({ message: '网关超时'})
  } else {
    ElementUI.Message({ message: res.status})
  }
}    
new Vue({
	store,
  router,
  render: h => h(App)
}).$mount('#app')
