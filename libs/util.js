import Vue from 'vue'
import Reg from './reg'
import ENV from 'env'
import SHA1 from 'js-sha1'
import Time from './time'
import urlParse from 'url-parse'
import { User, Roomid } from './storage'
const Util = {}
Util.install = function (Vue, options) {
  Vue.prototype.$util = {
    // 去空格
    trim: (str) => str ? str.toString().replace(Reg.rSpace, '') : '',
    // 判空
    isNull: function (str) {
      if (!str) {
        return true
      }
      return !Reg.rNoSpace.test(this.trim(str))
    },
    // 判终端
    isPC: function () {
      const userAgentInfo = navigator.userAgent
      return !Reg.rPlatfrom.test(userAgentInfo)
    },
    isAndroid: function() {
      const userAgentInfo = navigator.userAgent
      return Reg.rAndroid.test(userAgentInfo)
    },
    // 判授权
    access: function (response, authorization) {
      const isPC = this.isPC()
      if (response.status === 401) {
        authorization(isPC)
      }
    },
    validate: (model, reg, failHandle) => {
      let re = null
      let stop = null
      reg = typeof reg === 'string' ? new RegExp(reg) : reg
      if (reg && model) {
        re = reg.test(model.value)
      }
      return re ? re : (stop = failHandle(model))
    },
    validateQueue: function (items, failHandle) {
      let re = true
      failHandle = failHandle ? failHandle : () => false
      for (let item of items) {
        let rs = null
        for (let n in item) {
          if (!/^r|required$/.test(n)) {
            const k = n
            const v = item[n]
            if (item.required == undefined || item.required || ( item.required === false && (this.trim(v) !== '') )) {
              rs = this.validate({key: k, value: v}, Reg[`r${item.r}`] || Reg.rHas, failHandle)
            } else if (!item.required && (this.trim(v) == '')) {
              rs = true
            }
          }
        }
        !rs && (re = false)
        if (rs === false) return false
      }
      return re;
    },
    getItem: function(list, id) {
      for (let item of list) {
        if (item.id === id) {
          return item
        }
      }
    },
    deleteItem: function (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    changeItem: function (list, id, callback) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          let item = callback(list[i])
          list.splice(i, 1, item)
          break
        }
      }
      return list
    },
    emotPrase: function(text) {
      if(!Reg.rEmot.test(text)) return text
      text = text.replace(Reg.rEmot, (match, p1, offset, string) => {
        const emotStr = p1.match(/\[([^\]]+)\]/)[1]
        let eIndex = 0
        for (let i = 0; i < ENV.Emots.length; i++) {
          if (ENV.Emots[i] === emotStr) {
            eIndex = i
            break
          }
        }
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${eIndex}.gif"/>`
      })
      return this.emotPrase(text)
    },
    // checkMobile: function (mobile) {
    //   if (isNaN(mobile)) return false;
    //   if (!mobile || mobile=="" || mobile.length!=11) {
    //   	return false;
    //   }
    //   if (/^13\d{9}$/g.test(mobile) || (/^15[0-35-9]\d{8}$/g.test(mobile)) || (/^18[012345-9]\d{8}$/g.test(mobile)) || (/^17[06578]\d{8}$/g.test(mobile)) || (/^16[6]\d{8}$/g.test(mobile)) || (/^19[89]\d{8}$/g.test(mobile)) || (/^14[57]\d{8}$/g.test(mobile))) {
    //   	return true;
    //   }
    //   return false;
    // },
    wxAccess: function () {
      const user = User.get()
      const lUrl = urlParse(location.href, true)
      const code = lUrl.query.code
      if (user && user.subscribe === 0) {
        if (code) {
          alert(code)
          Vue.http.get(`${ENV.BokaApi}/api/authUser/${code}`)
          .then(
            res => {
              if (res.data.flag) {
                User.set({
                  ...user,
                  ...res.data.data
                })
                alert(JSON.stringify(User.get()))
                location.replace(`http://${lUrl.hostname}/${lUrl.hash}`)
              }
            },
            error => {
              Vue.$vux.toast.show({
                text: '服务器错误',
                type: 'warn',
              })
            }
          )
        } else {
          const originHref = encodeURIComponent(location.href)
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_userinfo&state=fromWx#wechat_redirect`)
        }
      } else {
        Vue.http.get(`${ENV.BokaApi}/api/user/show`)
        .then(res => {
          User.set(res.data)
        })
      }
    },
    delay: (text) => {
      let ret = 1000
      let len = text.length
      if (len > 0) {
        ret = len * 200
        if (ret < 1000) {
          ret = 1000
        } else if (ret > 600000) {
          ret = 600000
        }
      }
      return ret
    },
    timeStamp : () => Math.floor(new Date().getTime()/1000).toString(),
    randomStr: (len) => {
      if (!len) {
        len = 16
      }
      const strLen = ENV.FeedChars.length;
      let ret = '';
      for (let i = 0; i < len; i++) {
        ret += ENV.FeedChars.charAt(Math.floor(Math.random() * strLen));
      }
      return ret;
    },
    wxSign: (accessToken, appId, nonceStr, timeStamp, url) => {
      alert(`accesstoken=${accessToken}&appid=${appId}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`)
      SHA1(`accesstoken=${accessToken}&appid=${appId}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`)
    },
    query: (url) => {
      if (!url) {
        url = location.href
      }
      let query = {}
      let lastindex = url.lastIndexOf('?')
      if (lastindex >= 0) {
        url = url.substr(lastindex + 1)
      } else {
        return query
      }
      let params = url.split('&')
      for (let i = 0; i < params.length; i++ ) {
        let p = params[i].split('=')
        query[p[0]] = p[1]
      }
      return query
    },
    wxShareSuccess: function (params) {
      let self = this
      let wxData = params.data
      let postparams = {
        id: wxData.moduleid,
        lastshareuid: wxData.lastshareuid,
        type: params.type
      }
      Vue.http.post(`${ENV.BokaApi}/api/share/${wxData.module}`, postparams).then(function (res) {
        let data = res.data
        params.successCallback && params.successCallback(data)
      })
    },
    wxConfig: function (callback) {
      Vue.http.get(`${ENV.BokaApi}/api/jsconfig`,
        { params: { url: encodeURIComponent(location.href) } }
      ).then(res => {
        Vue.wechat.config(res.data)
        Vue.wechat.error(function () {
          // alert("微信还没有准备好，请刷新页面");
          Vue.$vux.toast.show({
            text: '微信还没有准备好，请刷新页面',
            type: 'warn',
          })
        })
        callback && callback()
      })
    },
    wxShare: function (params) {
      const self = this
      let wxData = params.data
      let isUpdate = false
      Vue.wechat.ready(function () {
        params.readyCallback && params.readyCallback()
        Vue.wechat.showMenuItems({
          menuList: [
            'menuItem:profile',
            'menuItem:addContact'
          ]
        })
        Vue.wechat.hideMenuItems({
          menuList: [
            'menuItem:exposeArticle',
            'menuItem:setFont',
            'menuItem:readMode',
            'menuItem:share:qq',
            'menuItem:share:QZone',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook'
          ]
        })
        let wxshareurl = wxData.link
        let query = self.query(wxshareurl)
        if (query.openid) {
            wxshareurl = wxshareurl.replace(`&openid=${query.openid}`, '').replace(`openid=${query.openid}`, '')
        }
        Vue.wechat.checkJsApi({
          jsApiList: ['onMenuShareAppMessage'],
          success: function(res) {
            if (!res.checkResult.onMenuShareAppMessage) {
              isUpdate = true
            }
          }
        })
        Vue.wechat.onMenuShareAppMessage({
          title: wxData.title,
          desc: wxData.desc,
          link: wxshareurl,
          imgUrl: wxData.photo,
          type: wxData.type,
          dataUrl:wxData.dataUrl,
          trigger: function (res) {
            //分享之前执行
            //	alert('用户点击发送给朋友');
            params.beforeShare && params.beforeShare()
            if (wxData.desc == "undefined" || wxData.desc == undefined) {
              alert("微信还没准备好分享，请稍后再试");
            }
            if (res.shareTo == "favorite") {
              self.wxShareSuccess({
                data: wxData,
                type: 'favorite',
                successCallback: params.successCallback
              })
            }
          },
          success: function (resp) {
            if (isUpdate) {
              alert("微信版本太低，请先升级微信客户端!")
            }
            self.wxShareSuccess({
              data: wxData,
              type: 'friend',
              successCallback: params.successCallback
            })
          },
          cancel: function (resp) {
          }
        })
        Vue.wechat.onMenuShareTimeline({
          title: wxData.title,
          link: wxshareurl,
          imgUrl: wxData.photo,
          trigger: function (res) {
            //分享之前执行
            //	alert('用户点击发送给朋友');
            params.beforeShare && params.beforeShare()
            if (wxData.desc === "undefined" || wxData.desc === undefined) {
              alert("微信还没准备好分享，请稍后再试");
            }
          },
          success: function (resp) {
            self.wxShareSuccess({
              data: wxData,
              type: 'timeline',
              successCallback: params.successCallback
            })
          },
          cancel: function (resp) {
          }
        })
        Vue.wechat.onMenuShareQQ({
          title: wxData.title,
          desc: wxData.desc,
          link: wxshareurl,
          imgUrl: wxData.photo,
          trigger: function (res) {
            //分享之前执行
            //	alert('用户点击发送给朋友');
            params.beforeShare && params.beforeShare()
            if (wxData.desc === "undefined" || wxData.desc === undefined) {
              alert("微信还没准备好分享，请稍后再试");
            }
          },
          success: function (resp) {
            self.wxShareSuccess({
              data: wxData,
              type: 'qq',
              successCallback: params.successCallback
            })
          },
          cancel: function (resp) {
          }
        })
      })
    },
    handleWxShare: function (os) {
      const self = this
      let data = os.data
      let sharetitle = os.title
      let sharedesc = os.desc
      let sharephoto = os.photo
      if (data) {
        sharetitle = (data.seotitle && self.trim(data.seotitle) !== '') ? data.seotitle : data.title
        sharedesc = data.title
        if (data.seodescription && self.trim(data.seodescription) !== '') {
          sharedesc = data.seodescription
        } else if (data.summary && self.trim(data.summary) !== '') {
          sharedesc = data.summary
        } else if (data.seotitle && self.trim(data.seotitle) !== '') {
          sharedesc = data.seotitle
        }
        sharephoto = data.photo
        let photoarr = []
        if (data.photo && self.trim(data.photo) !== '') {
          photoarr = data.photo.split(',')
        } else if (data.contentphoto && self.trim(data.contentphoto) !== '') {
          photoarr = data.contentphoto.split(',')
        }
        if (photoarr.length > 0) {
          sharephoto = photoarr[0]
        }
      }
      sharephoto = self.getPhoto(sharephoto)
      let wxData = {
        module: os.module,
        moduleid: os.moduleid,
        title: sharetitle,
        desc: sharedesc,
        link: os.link,
        photo: sharephoto
      }
      if (os.lastshareuid) {
        wxData.lastshareuid = os.lastshareuid
      }
      self.wxShare({
        data: wxData,
        successCallback: function (data) {
          if (data.flag === 1) {
            os.successCallback && os.successCallback(data)
          } else {
            Vue.$vux.toast.show({
              text: data.error,
              type: 'warn',
              time: self.delay(data.error)
            })
          }
        }
      })
    },
    wxPreviewImage: function(viewId) {
      const triggerView = document.querySelector(viewId)
      triggerView.addEventListener('click', function(event) {
        const images = document.querySelectorAll(`${viewId} .wx__img-preview`)
        if (!images.length) return
        const urls = []
        for (let img of images) {
          urls.push(img.src)
        }
        const target = event.target
        if (target.nodeName.toLowerCase() === 'img' && /\wx__img-preview/.test(target.getAttribute('class'))) {
          Vue.wechat.previewImage({
            current: target.src,
            urls: urls
          })
        }
      }, false)
    },
    taskData: function (os) {
      let data = os.data
      const handleFunction = os.handleFunction
      if(data && data.length > 0) {
        const ascdesc = os.ascdesc ? os.ascdesc : "asc"
        const callback = os.callback
        let tasks = []
        const _serial = function () {
          if (tasks.length === 0) {
            callback && callback()
            return
          }
          const task = tasks[0]
          tasks.splice(0, 1)
          task(_serial)
        }
        if (ascdesc === 'asc') {
          for (let i = 0; i < data.length; i++) {
            tasks.push(handleFunction(data[i], i))
          }
        } else {
          for (let i = data.length - 1; i >= 0; i++) {
            tasks.push(handleFunction(data[i], i))
          }
        }
        _serial()
      }
    },
    wxUploadImage: function (os) {
      const self = this
      let maxnum = os.maxnum ? os.maxnum : 9
      Vue.wechat.chooseImage({
        count: maxnum,
        success: function (res) {
          let localIds = res.localIds
          if(localIds.length > maxnum){
            localIds = localIds.slice(0, maxnum)
          }
          Vue.$vux.loading.show()
          let arr = localIds
          if (maxnum === 1) {
            arr = [ localIds ]
          }
          self.taskData({
            data: arr,
            callback: function () {
              Vue.$vux.loading.hide()
            },
            handleFunction: function (d) {
              return function (done) {
                Vue.wechat.uploadImage({
                  localId: d.toString(),
                  isShowProgressTips: 0,
                  success: function (res1) {
                    Vue.http.post(`${ENV.BokaApi}/api/weixinUpload`, {
                      imgid: res1.serverId
                    }).then(function (res) {
                      let data = res.data
                      os.handleCallback && os.handleCallback(data)
                      done()
                    })
                  },
                  fail: function (res2) {
                    Vue.$vux.toast.show({
                      text: '上传失败'
                    })
                    Vue.$vux.loading.hide()
                    done()
                  }
                })
              }
            }
          })
        },
        fail: function (r) {
        }
      })
    },
    deleteItem: function (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    deleteValue: function (list, val) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === val) {
          list.splice(i, 1)
          break
        }
      }
    },
    scrollEvent: (() => {
      let oScrollHeight = 0
      return (os) => {
        let _ele = os.element
        let scrollTop = _ele.scrollTop
        let scrollHeight = _ele.scrollHeight
        let height = _ele.offsetHeight;
        let distance = os.distance ? os.distance : 50
        if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
          distance = parseInt(distance, 10) / 100 * height
        }
        if (distance > height) {
          distance = height
        }
        if ((scrollTop + height >= scrollHeight - distance) && (oScrollHeight != scrollHeight)) {
          os.callback && os.callback()
          oScrollHeight = scrollHeight
        }
      }
		})(),
    getDateState: function (dt) {
      let newtime = new Time(dt * 1000)
      let year = newtime.year()
      let month = newtime.month()
      let date = newtime.date()
      let nowtime = new Time(new Date())
      let nowyear = nowtime.year()
      let nowmonth = nowtime.month()
      let nowdate = nowtime.date()
      let state = ''
      if (year === nowyear && month === nowmonth) {
        if (date === nowdate) {
          state = '今'
        } else if (date + 1 === nowdate) {
          state = '昨'
        } else if (date + 2 === nowdate) {
          state = '前'
        }
      }
      return state
    },
    getDateClass: function (dt) {
      const self = this
      let state = self.getDateState(dt)
      let ret = 'datestate '
      if (state !== '') {
        if (state === '今') {
          ret += 'today'
        } else if (state === '昨') {
          ret += 'yesterday'
        } else if (state === '前') {
          ret += ''
        } else {
          ret += 'hide'
        }
      } else {
        ret += 'hide'
      }
      return ret
    },
    getHost: function (url) {
      if (!url) {
        url = location.href
      }
      url = url.replace(/\?from=singlemessage&isappinstalled=0/g,'')
      let index = url.indexOf('/#/')
      let ret = url.substr(0, index)
      return ret
    },
    previewerImgdata: function (arr) {
      let ret = []
      for (let i = 0; i < arr.length; i++) {
        let p = arr[i]
        ret.push({
          msrc: p,
          src: p
        })
      }
      return ret
    },
    setPhoto: function (src) {
      return src.replace(/,/g, '||')
    },
    getPhoto: function (src) {
      if (!src) {
        return ''
      }
      let arr = src.split(',')
      if (arr.length > 0) {
        src = arr[0]
      }
      return src.replace(/\|\|/g, ',')
    }
  }
}

export default Util
