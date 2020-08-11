/*
* @description: 跳转页
* @auther: gyp
* @created_date: 2020-05-13
*/
<template>
  <div class="redirect-page flex_center font14">
  </div>
</template>
<script>
import ENV from 'env'
import {Loading, TransferDom} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  data () {
    return {
      query: {},
      themeObject: {},
      miniInfo: {
        title: '',
        photo: 'https://tossharingsales.boka.cn/images/nopic.jpg'
      },
      syspara: {},
      isLoading: true
    }
  },
  watch: {
  },
  methods: {
  },
  created () {
  },
  activated () {
    this.query = this.$route.query
    if (this.query.code) {
      let ajaxUrl = ENV.BokaApi
      if (ENV.ApiVersion === 'V2' && this.query.appid) {
        ajaxUrl = `${ajaxUrl}${this.query.appid}`
      }
      ajaxUrl = `${ajaxUrl}/user/officialBind`
      this.$http.post(ajaxUrl, {code: this.query.code}).then(res => {
        if (!res || !res.data || res.data.errcode || !res.data.flag) {
          this.$vux.alert.show({
            title: '提示',
            content: `用户信息获取失败，请重新进入`,
            onHide () {
              this.$router.push(`/center`)
            }
          })
          return
        }
        this.$vux.alert.show({
          title: '提示',
          content: `绑定公众号成功`,
          onHide () {
            this.$router.push(`/center`)
          }
        })
      }, res => {
        console.log('绑定')
        console.log(res)
        this.$vux.alert.show({
          title: '提示',
          content: `未获取到用户信息`,
          onHide () {
            this.$router.push(`/center`)
          }
        })
      })
    }
  },
  mounted () {
  },
  beforeMount () {
  }
}
</script>
<style lang="less">
.redirect-page{
}
</style>
