/*
* @description: 新闻详情页
* @auther: gyp
* @created_date: 2021-01-21
*/
<style lang="less">
.news-page{
  width:100%;
  .middle-col{flex:1;}
  .news-title{
    font-size: 40px;
    line-height: 1.5;
    margin-bottom: 25px;
    color: #333;
    margin-top: 8px;
    text-align:center;
  }
  .news-content img{max-width:100%;}
}
</style>
<template>
  <div class="news-page">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <h1 class="news-title">{{viewData.title}}</h1>
        <div class="news-content" v-html="viewData.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import Time from '#/time'
import TopMenu from '@/components/TopMenu'
import ClassMenu from '@/components/ClassMenu'
export default {
  components: {TopMenu, ClassMenu},
  data () {
    return {
      query: {},
      viewData: {},
      hostName: ''
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  watch: {
    '$route': {
      handler (newVal, oldVal) {
        this.refresh()
      }
    }
  },
  methods: {
    getInfo () {
      this.$http.get(`${ENV.AdminApi}/api/content_n/info`, {
        params: {module: 'news', prefixdomain: this.hostName, id: this.query.id}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.viewData = data.data
          document.title = this.viewData.title
        }
      })
    },
    refresh () {
      this.hostName = this.$util.getHostName()
      this.query = this.$route.query
      this.viewData = {}
      this.getInfo()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
