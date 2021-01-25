/*
* @description: 二维码页
* @auther: gyp
* @created_date: 2021-01-21
*/
<template>
  <div class="code-page flex_center font14">
    <img :src="codeSrc">
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
      verifycode: null
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
<style lang="less">
.code-page{
  width:100%;height:100%;
  img{max-width:100%;}
}
</style>
