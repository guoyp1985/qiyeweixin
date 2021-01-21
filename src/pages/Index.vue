/*
* @description: 首页
* @auther: gyp
* @created_date: 2021-01-21
*/
<template>
  <div class="index-page">
    <top-menu></top-menu>
  </div>
</template>
<script>
// import ENV from 'env'
import TopMenu from '@/components/TopMenu'
export default {
  components: {TopMenu},
  data () {
    return {
      query: {}
    }
  },
  watch: {
  },
  methods: {
    refresh () {
    }
  },
  created () {
    this.query = this.$route.query
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
.login-page{
}
</style>
