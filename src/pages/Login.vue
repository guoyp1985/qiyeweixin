/*
* @description: 用户登录
* @auther: gyp
* @created_date: 2020-03-30
*/
<template>
  <div class="login-page flex_center font14">
    <div class="bg" :style="`${themeObject.bgStyle}`"></div>
    <div class="login-area">
      <div class="avatar-area">
        <img :src="miniInfo.photo" />
      </div>
      <div class="mt10 bold font16 flex_center">{{miniInfo.title}}</div>
      <div class="form-area flex_left" :style="`${themeObject.borderStyle}margin-top:40px;`">
        <div class="ico flex_center">
          <div class="al al-yonghu"></div>
        </div>
        <input v-model="mobile" type="text" class="flex_cell input" placeholder="请输入手机号码" />
      </div>
      <div class="flex_left mt20">
        <div class="form-area flex_left flex_cell" :style="`${themeObject.borderStyle}`">
          <div class="ico flex_center">
            <div class="al al-suo font20"></div>
          </div>
          <input v-model="code" type="text" class="flex_cell input" placeholder="请输入验证码" />
        </div>
        <div class="flex_right pl10">
          <div v-if="showGetcode" class="font12 bold" :style="`${themeObject.colorStyle}`" @click="getcode">获取验证码</div>
          <div v-else class="color-gray" style="width:70px;box-sizing:border-box;">{{ timenum }} 秒</div>
        </div>
      </div>
      <div class="btn-area flex_center">
        <div v-if="verifyCode && verifyCode != ''" @click="loginEvent" class="btn" :style="`${themeObject.bgStyle}`">登录</div>
        <div v-else class="btn bg-gray color-white">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import {Token, User} from '#/storage'
export default {
  data () {
    return {
      query: {},
      themeObject: {},
      miniInfo: {
        title: '',
        photo: 'https://tossharingsales.boka.cn/images/nopic.jpg'
      },
      syspara: {},
      mobile: '',
      code: '',
      verifyCode: '',
      showGetcode: true,
      timer: null,
      timenum: 60,
      applyMobile: null,
      isSubmit: false
    }
  },
  watch: {
  },
  methods: {
    getcode () {
      console.log(111)
      let iscontinue = this.$util.validateQueue([
        { telephone: this.$util.trim(this.mobile), r: 'Phone' }
      ],
        model => {
          switch (model.key) {
            case 'telephone':
              this.$vux.toast.text('请输入正确的手机号', 'middle')
              break
            default:
              this.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (!iscontinue) {
        return false
      }
      this.$vux.loading.show()
      let ajaxUrl = ENV.BokaApi
      ajaxUrl = `${ajaxUrl}/api/Visitor/VerifyMobile`
      this.$http.post(ajaxUrl, {
        mobile: this.$util.trim(this.mobile)
      }).then(res => {
        console.log(res)
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.error,
          type: data.flag ? 'success' : 'warn',
          time: this.$util.delay(data.error)
        })
        if (data.flag === 1) {
          this.applyMobile = this.mobile
          this.verifyCode = data.data
          this.showGetcode = false
          this.timer = setInterval(() => {
            this.timenum--
            if (this.timenum === 0) {
              clearInterval(this.timer)
              this.showGetcode = true
              this.timenum = 60
            }
          }, 1000)
        } else {
          this.applyMobile = null
        }
      })
    },
    loginEvent () {
      if (this.isSubmit) return false
      if (this.$util.trim(this.mobile) === '') {
        this.$vux.toast.show({
          text: '请验证手机号',
          type: 'text'
        })
        return false
      }
      if (this.$util.trim(this.code) === '') {
        this.$vux.toast.show({
          text: '请输入验证码',
          type: 'text'
        })
        return false
      }
      if (this.code !== this.verifyCode) {
        this.$vux.toast.show({
          text: '验证码不正确',
          type: 'text'
        })
        return false
      }
      this.isSubmit = true
      localStorage.setItem('mobile', this.mobile)
      this.$vux.loading.show()
      let ajaxUrl = ENV.BokaApi
      ajaxUrl = `${ajaxUrl}/api/Visitor/mobileLogin`
      this.$http.post(ajaxUrl, {
        mobile: this.$util.trim(this.mobile),
        securecode: this.code
      }).then(res => {
        let data = res.data
        this.isSubmit = false
        this.$vux.loading.hide()
        if (data.flag === 1) {
          User.set(data.userinfo)
          Token.set(data.token)
          let navParams = this.$util.handleAppParams(this.query, {})
          this.$router.push({path: '/center', query: navParams})
        } else {
          this.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: this.$util.delay(data.error)
          })
        }
      })
    }
  },
  created () {
    this.query = this.$route.query
    let topColor = '#ff0000'
    let themeColor = '#ff0000'
    this.themeObject = {
      topColor: topColor,
      themeColor: themeColor,
      colorStyle: `color:${themeColor} !important;`,
      bgStyle: `background-color:${themeColor} !important;color:#fff;`,
      linearBgStyle: `background:linear-gradient(${topColor}, ${themeColor});`,
      borderStyle: `border-color:${themeColor} !important;`,
      switchShadowStyle: `box-shadow:0 1px 3px ${themeColor};`
    }
    let storageMobile = localStorage.getItem('mobile')
    if (storageMobile) {
      this.mobile = storageMobile
    }
  },
  activated () {
  },
  mounted () {
  },
  beforeMount () {
  }
}
</script>
<style lang="less">
.login-page{
  height:100%;background-color:#f7f7f7;position:relative;
  .bg{
    width:100%;max-height:300px;overflow:hidden;position:relative;
    position:absolute;left:0;top:0;right:0;
  }
  .bg:after{content:'';display:block;padding-top:75%;}
  .login-area{
    width:85%;background-color:#fff;padding:0 20px 20px;border-radius:10px;box-sizing: border-box;
    position:relative;z-index:1;
  }
  .avatar-area{
    margin-top:-50px;
    img{width:100px;height:100px;display:block;margin:0 auto;border-radius:50%;}
  }
  .form-area{
    border-width:1px;border-style:solid;border-radius:60px;
    .ico{width:40px;height:40px;}
    .al{color:#999;}
    .input{margin-right:10px;height:40px;color:#999;border-radius:60px;}
  }
  .btn-area{
    margin-top:40px;
    .btn{
      border-radius:60px;
      width:150px;height:40px;text-align:center;line-height:40px;
    }
  }
}
</style>
