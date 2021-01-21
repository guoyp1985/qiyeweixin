/*
* @description: 首页
* @auther: gyp
* @created_date: 2021-01-21
*/
<style lang="less">
.index-page{
  width:100%;
}
</style>
<template>
  <div class="index-page">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
    </div>
  </div>
</template>
<script>
// import ENV from 'env'
import TopMenu from '@/components/TopMenu'
import ClassMenu from '@/components/ClassMenu'
export default {
  components: {TopMenu, ClassMenu},
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
