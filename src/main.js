// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import urlParse from 'url-parse'
// import router from './router'
import store from './store'
// import './coms'
import App from './App'
import objectAssign from 'object-assign'
import { User, Version, Token, Access, SystemParams } from '#/storage'
import ENV from 'env'
import Util from '#/util'
import { AjaxPlugin, WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.use(VueRouter)
Vue.use(Util)
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
console.log(Vue.wechat)
require('es6-promise').polyfill()

console.log('env.debugmode', ENV.DebugMode)
if (ENV.DebugMode) {
  const VConsole = require('vconsole')
  const vConsole = new VConsole()
  vConsole.setOption({maxLogNumber: 5000})
}

const CancelToken = AjaxPlugin.$http.CancelToken
const vuxLocales = require('./locales/all.yml')
const componentsLocales = require('./locales/components.yml')
// const globalLocales = require('./locales/global_locales.yml') || {en: {}, 'zh-CN': {}}

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}
Vue.i18n.set('zh-CN')

FastClick.attach(document.body)

Vue.config.productionTip = false

// The following line will be replaced with by vux-loader with routes in ./page_list.json
const routes = []

routes.push({
  path: '/',
  name: 'tIndex',
  component: () => import('./pages/Center').then(m => m.default)
})

const router = new VueRouter({
  routes
})

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
})

let pendings = []
let cancelAllPendings = () => {
  for (let p of pendings) {
    console.info(`canceled request: ${p.u}`)
    p.f()
  }
  pendings = []
}

// 排除全局请求过滤器中的请求url
const rExcludeUrls = ENV.NoAccessUrls.map(url => {
  url = `${ENV.BokaApi}wx[a-zA-Z0-9]{16}${url}`
  return RegExp(url.replace(/\//g, '\\/').replace(/\*/g, '.*').replace(/\?/g, '\\?'))
})
const matchExclude = url => {
  for (let i = 0; i < rExcludeUrls.length; i++) {
    if (rExcludeUrls[i].test(url)) {
      return true
    }
  }
  return false
}

// let responseFail = false
// 请求拦截器
Vue.http.interceptors.request.use(config => {
  console.log('执行ajax请求', config.url)
  console.log(Token.get())
  if (!matchExclude(config.url) && config.url.indexOf('mobileLogin') < 0 && config.url.indexOf('VerifyMobile') < 0 && config.url.indexOf('miniSetting') < 0 && config.url.indexOf('addClues') < 0) {
    config.cancelToken = new CancelToken(c => {
      pendings.push({ u: config.url + '&' + config.method, f: c })
    })

    const token = Token.get()
    // console.log(`interceptors: ${config.url}`)
    // console.log(`interceptors: ${JSON.stringify(token)}`)
    if (Token.isExpired()) {
      // console.log(config.url)
      cancelAllPendings(config)
      console.log('跳转登录之前')
      // const url = location.href
      //             .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
      //               return `${p1}?${p3}${p2}`
      //             })
      //             .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
      //               return `${p1}&${p3}${p2}`
      //             })
      router.replace({path: '/login'})
      // access((path) => {
      //   router.replace({path: path})
      // })
    } else {
      console.log(`interceptors: Bearer ${token.token}`)
      config.headers['Authorization'] = `Bearer ${token.token}`
      if (ENV.ApiVersion === 'V2') {
        config.headers['Accept'] = ENV.ApiAccept
      }
    }
  } else {
    if (ENV.ApiVersion === 'V2') {
      config.headers['Accept'] = ENV.ApiAccept
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  console.log('请求结束')
  console.log(response)
  return response
}, error => {
  console.log('请求结束错误了')
  console.log(error)
})

// const access = success => {
//   // let query = ''
//   const url = location.href
//               .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
//                 // query = p3
//                 return `${p1}?${p3}${p2}` // '$1?$3$2'
//               })
//               .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
//                 // query = p3
//                 return `${p1}&${p3}${p2}` // '$1&$3$2'
//               })
//   const lUrl = urlParse(url, true)
//   // const token = lUrl.query.token
//   // const expiredAt = lUrl.query.expired_at
//   Vue.access(isPC => {
//     if (isPC) {
//       success && success()
//       console.log(lUrl.href)
//       // location.replace(lUrl.href)
//       // router.push({name: 'tLogin'})
//     } else {
//       success && success()
//       // const originHref = encodeURIComponent(location.href)
//       // // 微信授权
//       // location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_userinfo&state=defaultAccess#wechat_redirect`)
//     }
//   })
// }

const clearCache = () => {
  // const url = location.href
  //             .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
  //               return `${p1}?${p3}${p2}`
  //             })
  //             .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
  //               return `${p1}&${p3}${p2}`
  //             })
  // const lUrl = urlParse(url, true)
  // const from = lUrl.query.from
  if (ENV.Version !== Version.get()) {
    console.log('进入到了清除缓存操作')
    Token.remove()
    User.remove()
    Access.remove()
    Version.remove()
    Version.set(ENV.Version)
    SystemParams.remove()
  }
}

const vue = new Vue({
  store,
  router,
  render: h => h(App)
})

const render = () => {
  vue.$mount('#app-box')
}

clearCache()

// 页面入口
// let queryParam = ''
const url = location.href
          .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
            // queryParam = p3
            return `${p1}?${p3}${p2}` // '$1?$3$2'
          })
          .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
            // queryParam = p3
            return `${p1}&${p3}${p2}` // '$1&$3$2'
          })
const lUrl = urlParse(url, true)
let miniData = {}
let sysData = {}
let curAppid = lUrl.query.appid
let miniinfoStr = `${curAppid}-miniinfo`
let sysparaStr = `${curAppid}-syspara`
if (localStorage.getItem(miniinfoStr) && localStorage.getItem(miniinfoStr) !== '') {
  miniData = JSON.parse(localStorage.getItem(miniinfoStr))
  sysData = JSON.parse(localStorage.getItem(sysparaStr))
}
console.log('小程序数据')
console.log(location.href)
console.log(lUrl.query)
console.log(miniinfoStr)
console.log(miniData)
console.log(sysData)
console.log('获取到的用户信息')
console.log(User.get())
if (lUrl.query.state === 'miniAccess' && lUrl.query.code) {
  Vue.$vux.loading.show()
  let ajaxUrl = ENV.BokaApi
  ajaxUrl = `${ajaxUrl}/member/officialBind`
  // alert(ajaxUrl)
  // alert(lUrl.query.code)
  Vue.http.post(ajaxUrl, {code: lUrl.query.code}).then(res => {
    Vue.$vux.loading.hide()
    // alert(JSON.stringify(res))
    if (!res || !res.data || res.data.errcode || !res.data.flag) {
      Vue.$vux.alert.show({
        title: '提示',
        content: `用户信息获取失败，请重新进入`,
        onHide () {
          // router.push(`/center?appid=${lUrl.query.appid}`)
          router.push(`/center`)
          render()
        }
      })
      return
    }
    Vue.$vux.alert.show({
      title: '提示',
      content: `绑定公众号成功`,
      onHide () {
        // router.push(`/center?appid=${lUrl.query.appid}`)
        router.push(`/center`)
        render()
      }
    })
    render()
  }, res => {
    Vue.$vux.loading.hide()
    console.log('绑定')
    console.log(res)
    Vue.$vux.alert.show({
      title: '提示',
      content: `未获取到用户信息`,
      onHide () {
        // router.push(`/center?appid=${lUrl.query.appid}`)
        router.push(`/center`)
        render()
      }
    })
  })
} else {
  render()
  // if (!User.get()) {
  //   router.replace({path: '/login', query: lUrl.query})
  //   render()
  // } else {
    // render()
  // }
}
