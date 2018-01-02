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
import Md5 from '@/assets/js/md5'
import Mock from './mock'
import Utils from '@/assets/js/utils'
import VueHtml5Editor from 'vue-html5-editor'
import FullCalendar from '@/components/fullcalendar'
import BackButton from '@/components/back-button'
import LinkStep from '@/components/step'
import LinkSteps from '@/components/steps'
import RegionPicker from '@/components/region-picker'
NProgress.configure({ ease: 'ease', speed: 500, minimum: 0.5, showSpinner: false})
Mock.bootstrap()
Vue.prototype.$Md5 = Md5
Vue.prototype.$moment = moment
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
          url: '/b2b/file/upload',
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
        uploadHandler (response) {
          let data = JSON.parse(response)
          if (data.code === '0001') {
            let filePath = data.result.file.filePath;
            return filePath;
          } else {
            ElementUI.Message({
              type: 'error',
              message: data.message
            })
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
Vue.prototype.$catchError = (err) => {
  if(!err.data) {
    ElementUI.Message('服务器响应错误')
    return;
  }
  if(err.data.code) {
    ElementUI.Message(err.data.message)
  } else {
    ElementUI.Message('服务器响应超时')
  }
}
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  // Vue.prototype.$fromPath = from.path;
  let userId = Utils.getCookie('userId');
  let logRequired = to.path.indexOf('home') !== -1 || 
                    to.path.indexOf('admin') !== -1 ||
                    to.path.indexOf('provider') !== -1 ||
                    to.path.indexOf('distributor') !== -1;
  if(logRequired && !userId) {
    // localStorage.getItem('user') && ElementUI.Message('会话已过期，请重新登录')
    return router.push('/login')
  }
  NProgress.start()
  next() 
})
router.afterEach((to, from, next) => {
  NProgress.done()
})
axios.interceptors.request.use((config) => {
  return config;
}, (err) => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res =>{
  if (res.data.code === '0000') {
    router.push('/login')
    return Promise.reject(res)
  } else if (res.data.code === '9999') {
    router.push('/NoPermission')
    return Promise.reject(res)
  }
  return res;
}, err => {
  return Promise.reject(err)
})    
new Vue({
	store,
  router,
  render: h => h(App)
}).$mount('#app')
