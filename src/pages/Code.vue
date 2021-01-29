<style lang="less">
.code-page{
  width:100%;height:100%;
  .pic{
    text-align:center;
    img{max-width:100%;}
  }
  .txt-area{
    width:100%;padding:20px;box-sizing: border-box;text-align:left;
  }
}
</style>
<template>
  <div class="code-page flex_center font14">
    <div class="w_100">
      <div class="pic">
        <img :src="codeSrc">
      </div>
      <div class="txt-area">
        <div class="align_left">
          <span class="color-red7">注意: </span>扫码前必需先关注公众号【<span class="bold">{{gzhName}}</span>】
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import {Token} from '#/storage'
export default {
  data () {
    return {
      query: {},
      codeSrc: '',
      codeInterval: null,
      verifycode: null,
      gzhName: ENV.GzhName
    }
  },
  watch: {
  },
  methods: {
    ajaxScan () {
      this.codeInterval = setInterval(() => {
        this.$http.get(`${ENV.GxkApi}/api/scanlogin/${this.verifycode}`).then(res => {
          const data = res.data
          if (data.flag) {
            clearInterval(this.codeInterval)
            Token.remove()
            Token.set(data.data)
            this.$router.push('/register')
          }
        })
      }, 200)
    },
    refresh () {
      this.query = this.$route.query
      clearInterval(this.codeInterval)
      this.$http.get(`${ENV.GxkApi}/api/qrcode/login`).then(res => {
        const data = res.data
        this.codeSrc = data.url
        this.verifycode = data.verifycode
        this.ajaxScan()
      })
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
