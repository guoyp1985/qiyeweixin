/*
* @description: 错误页面
* @auther: gyp
* @created_date: 2021-01-22
*/
<style lang="less">
.sos-page{
  width:100%;height:100%;background-color:#F2F3F7;padding-top:20px;box-sizing: border-box;
  .sos-inner{width:600px;background-color:#fff;padding:20px;box-sizing:border-box;margin:0 auto;}
  .big-title{font-size:30px;color:#ff0000;padding-bottom: 10px;margin-bottom: 40px;text-align:center;}
}
</style>
<template>
  <div class="sos-page">
    <div class="sos-inner">
        <div class="big-title">您还没有申请注册</div>
        <div @click="topage" style="color:#5889ec;text-align:center;">去这里注册吧</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      query: {}
    }
  },
  methods: {
    topage () {
      location.href = 'https://www.bsa.cn'
    },
    refresh () {
      this.query = this.$route.query
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
