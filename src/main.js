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
import { User, Version, Token, Access, MiniApp } from '#/storage'
import ENV from 'env'
import Util from '#/util'
import { AjaxPlugin, WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'

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
const rExcludeUrls = ENV.NoAccessUrls.map(url => RegExp(url.replace(/\*/g, '.*').replace(/\?/g, '\\?')))
const matchExclude = url => {
  for (let i = 0; i < rExcludeUrls.length; i++) {
    if (rExcludeUrls[i].test(url)) {
      return true
    }
  }
  return false
}

// 请求拦截器
Vue.http.interceptors.request.use(config => {
  if (!matchExclude(config.url)) {
    config.cancelToken = new CancelToken(c => {
      pendings.push({ u: config.url + '&' + config.method, f: c })
    })

    const token = Token.get()
    console.log('in interceptors')
    console.log(token)
    if (Token.isExpired()) {
      // console.log(config.url)
      cancelAllPendings(config)
      access((path) => {
        router.push({path: path})
      })
    } else {
      config.headers['Authorization'] = `Bearer ${token.token}`
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    if (error.response.status === 401) {
      console.error('未授权请求')
      access()
    }
  }
})

const access = success => {
  const lUrl = urlParse(location.href, true)
  const token = lUrl.query.token
  const expiredAt = lUrl.query.expired_at
  const code = lUrl.query.code
  const state = lUrl.query.state
  alert('in access lurl')
  alert(lUrl)
  alert(code)
  if (token && token !== '') {
    Token.set({token: token, expired_at: expiredAt})
    Vue.http.get(`${ENV.BokaApi}/api/user/show`)
    .then(
      res => {
        if (!res) return
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
        router.push(lUrl.hash.replace(/#/, ''))
      }
    )
  } else if (state === 'defaultAccess' && code) {
    alert('defaultAccess')
    // 401授权，取得token
    let authUrl = `${ENV.BokaApi}/api/authLogin/${code}`
    let authParams = {}
    if (MiniApp.getOpenId() && MiniApp.getAppId()) {
      authUrl = `${ENV.BokaApi}/api/withMiniLogin`
      authParams = {code: code, miniopenid: MiniApp.getOpenId(), appid: MiniApp.getAppId()}
    }
    Vue.http.get(authUrl, {
      params: authParams
    }).then(
      res => {
        alert('after authUrl')
        alert(JSON.stringify(res))
        MiniApp.removeOpenId()
        MiniApp.removeAppId()
        if (!res || !res.data || res.data.errcode) return
        Token.set(res.data.data)
        // 取用户信息
        return Vue.http.get(`${ENV.BokaApi}/api/user/show`)
      }
    )
    .then(
      res => {
        alert('user show')
        alert(JSON.stringify(res))
        if (!res) return
        User.set(res.data)
        alert(lUrl.hash.replace(/#/, ''))
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
        success && success(lUrl.hash.replace(/#/, ''))
      }
    )
  } else {
    Vue.access(isPC => {
      if (isPC) {
        success && success()
        router.push({name: 'tLogin'})
      } else {
        const originHref = encodeURIComponent(location.href)
        // 微信授权
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=defaultAccess#wechat_redirect`)
      }
    })
  }
}

const clearCache = () => {
  if (ENV.Version !== Version.get()) {
    Token.remove()
    User.remove()
    Access.remove()
    Version.remove()
    Version.set(ENV.Version)
  }
}

const render = () => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app-box')
}

clearCache()

// 页面入口
if (!Token.get() || Token.isExpired()) {
  access(() => {
    render()
  })
} else {
  render()
}
