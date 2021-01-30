<style lang="less">
.about-page{
  width:100%;
  .middle-col{flex:1;}
  .v-item{display:flex;padding:10px 0;font-size:18px;}
  .v-item .t-cell1{width:100px;text-align: justify;}
  .v-item .t-cell2{flex:1;}

  .big-title{font-size:30px;color:#5889ec;padding-bottom: 10px;margin-bottom: 40px;}
}
@media (max-width: 1199px) {
  .about-page.mobile{
    .middle-col{flex:1;margin-right:10px;overflow:hidden;}
  }
}
</style>
<template>
  <div :class="`about-page ${viewData && viewData.viplevel > 0 ? 'mobile' : ''}`">
    <top-menu current="aboutus0"></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <h2 class="big-title">{{viewData.title}}</h2>
        <div style="margin-bottom:20px;" v-if="viewData.content && viewData.content != ''">{{viewData.content}}</div>
        <div class="v-item">
            <div class="t-cell1">开户银行: </div>
            <div class="t-cell2">{{viewData.bankname}}</div>
        </div>
        <div class="v-item">
            <div class="t-cell1">开户账号: </div>
            <div class="t-cell2">{{viewData.newbankcardno}}</div>
        </div>
        <div class="v-item">
            <div class="t-cell1">联系人: </div>
            <div class="t-cell2">{{viewData.newbankuser}}</div>
        </div>
        <div class="v-item">
            <div class="t-cell1">联系电话: </div>
            <div class="t-cell2">{{viewData.mobile}}</div>
        </div>
        <div class="v-item">
            <div class="t-cell1">地址: </div>
            <div class="t-cell2">{{viewData.province}}{{viewData.city}}{{viewData.county}}{{viewData.address}}</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import ENV from 'env'
import Time from '#/time'
import { Factory } from '#/storage'
import TopMenu from '@/components/TopMenu'
import ClassMenu from '@/components/ClassMenu'
import Footer from '@/components/Footer'
export default {
  components: {TopMenu, ClassMenu, Footer},
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
  methods: {
    getInfo () {
      this.$http.get(`${ENV.GxkApi}/api/moduleInfo_n`, {
        params: {module: 'factory', prefixdomain: this.hostName}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.viewData = data.data
        }
      })
    },
    refresh () {
      this.hostName = this.$util.getHostName()
      this.query = this.$route.query
      this.viewData = Factory.get()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
