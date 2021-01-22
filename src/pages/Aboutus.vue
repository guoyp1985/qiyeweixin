/*
* @description: 关于我们
* @auther: gyp
* @created_date: 2021-01-22
*/
<style lang="less">
.about-page{
  width:100%;
  .middle-col{flex:1;}
  .v-item{display:flex;padding:10px 0;font-size:18px;}
  .v-item .t-cell1{width:100px;text-align: justify;}
  .v-item .t-cell2{flex:1;}

  .big-title{font-size:30px;color:#5889ec;padding-bottom: 10px;margin-bottom: 40px;}
}
</style>
<template>
  <div class="about-page">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <h2 class="big-title">{{viewData.title}}</h2>
        <div v-if="viewData.content && viewData.content != ''"></div>
        <div class="v-item">
            <div class="t-cell1">营业执照: </div>
            <div class="t-cell2">
              <template v-if="viewData.yyzz && viewData.yyzz != ''">
                <img :src="viewData.yyzz" style="width:200px;" />
              </template>
            </div>
        </div>
        <div class="v-item">
            <div class="t-cell1">开户银行: </div>
            <div class="t-cell2">{{viewData.bankname}}</div>
        </div>
        <div class="v-item">
            <div>开户账号: </div>
            <div class="t-cell2">{{viewData.account}}</div>
        </div>
        <div class="v-item">
            <div>联系人: </div>
            <div class="t-cell2">{{viewData.contact}}</div>
        </div>
        <div class="v-item">
            <div>联系电话: </div>
            <div class="t-cell2">{{viewData.mobile}}</div>
        </div>
        <div class="v-item">
            <div>地址: </div>
            <div class="t-cell2">{{viewData.address}}</div>
        </div>
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
      viewData: {}
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    getInfo () {
      this.$http.get(`${ENV.GxkApi}/api/factory/info`, {
        params: {fid: ENV.Fid}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.viewData = data.data
        }
      })
    },
    refresh () {
      this.getInfo()
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
