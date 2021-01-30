<style lang="less">
.channel-page{
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
@media (max-width: 1199px) {
  .channel-page.mobile{
    .middle-col{flex:1;margin-right:10px;overflow:hidden;}
  }
}
</style>
<template>
  <div class="channel-page">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <h1 class="news-title">{{viewData.title}}</h1>
        <template v-if="viewData && viewData.id">
          <template v-if="newsFormat == 'json' && viewData.content && viewData.content != ''">
            <template v-for="(item, index) in viewData.content">
              <div v-if="item.content && item.content != ''" class="padding10">{{item.content}}</div>
              <template v-for="(photo,index1) in item.photo" index="index1" item="photo">
                <div class="flex_center">
                  <img :src="photo" style="max-width:100%;"/>
                </div>
              </template>
            </template>
          </template>
          <template v-else>
          <div class="news-content" v-html="viewData.content"></div>
          </template>
        </template>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import ENV from 'env'
import Time from '#/time'
import TopMenu from '@/components/TopMenu'
import ClassMenu from '@/components/ClassMenu'
import Footer from '@/components/Footer'
export default {
  components: {TopMenu, ClassMenu, Footer},
  data () {
    return {
      query: {},
      viewData: {},
      hostName: '',
      newsFormat: '',
      contentArr: []
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
      this.$http.get(`${ENV.GxkApi}/api/moduleInfo_n`, {
        params: {module: 'channel', prefixdomain: this.hostName, id: this.query.id}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          let retdata = data.data
          if (retdata.c_format === 'json') {
            this.newsFormat = 'json'
          } else {
            this.newsFormat = ''
          }
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
