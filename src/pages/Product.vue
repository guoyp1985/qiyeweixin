/*
* @description: 商品详情页
* @auther: gyp
* @created_date: 2021-01-22
*/
<style lang="less">
@import '../assets/swiper.less';
.product-page{
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
  .swiper-area{width:350px;height:350px;position:relative;overflow:hidden;}
  .swiper-inner{position:absolute;left:0;top:0;right:0;bottom:0;}
  .swiper-item{position:relative;float:left;display:block;}
  .swiper-item img{width:100%;height:100%;object-fit:cover;position:absolute;overflow:hidden;}
  .swiper-area .swiper-container-horizontal > .swiper-pagination-bullets {width:auto;left:auto;right:10px;bottom:12px;}
  .swiper-area .swiper-pagination-bullet{
      display: inline-block;
      background: #fff;
      opacity: .5;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 4px;
      cursor: pointer;
  }
  .swiper-area .swiper-pagination-bullet-active{opacity:1;}

  .p-title{font-weight: 700;color: #000;}
  .btn-buy{
      position:absolute;left:20px;bottom:0;border-radius:5px;
      background-color: #ff0036;
      border: 1px solid #ff0036;
      color: #fff;
      width: 178px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 16px;
  }
  .details-br{text-align: center;color: #bcbcbc;padding: 10px;background: #eeeeee;}
  .photo-list img{width:100%;display:block;}
  .details{}
  .detail-box{
    width:100%;padding:30rpx 20rpx;box-sizing: border-box;border-width:10rpx;border-style:solid;border-color:#ff0036;
    margin-bottom:10px;margin-top:10px;
  }
}
</style>
<template>
  <div class="product-page">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <div class="db-flex">
          <div class="swiper-area">
            <div class="swiper-inner">
              <div class="banner-swiper swiper-wrapper">
                <div v-for="(item,index) in swiperPhoto" :key="index" class="swiper-item swiper-slide">
                    <img :src="item" />
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
          <div class="flex_cell pl20" style="position:relative;">
            <h1 class="p-title mb5">{{viewData.title}}</h1>
            <div v-if="viewData.sellingpoint && viewData.sellingpoint != ''" style="color:#FF0036;">{{viewData.sellingpoint}}</div>
            <div class="mt20 color-red7">
              <span class="font18">￥</span>
              <span class="font36 bold" v-if="viewData.minprice && viewData.maxprice && viewData.minprice != '' && viewData.maxprice != '' && viewData.minprice != viewData.maxprice">{{viewData.minprice}}-{{viewData.maxprice}}</span>
              <span class="font36 bold" v-else-if="viewData.minprice && viewData.minprice != ''">{{viewData.minprice}}</span>
              <span class="font36 bold" v-else>{{viewData.price}}</span>
              <span class="font16 ml5 color-gray" style="text-decoration: line-through" v-if="viewData.oriprice && viewData.oriprice > 0">￥{{viewData.oriprice}}</span>
            </div>
            <div class="db-flex font12 mt20" style="color:#333;">
              <div>
                <span>运费: </span>
                <span v-if="viewData.postate > 0">{{viewData.postate}}</span>
                <span v-else>包邮</span>
              </div>
              <div class="ml20">
                <span>销量: </span>
                <span>{{viewData.saled}}</span>
              </div>
            </div>
            <div class="btn-buy">立即购买</div>
          </div>
        </div>
        <div class="details">
          <div class="details-br mt10">——详情——</div>
          <div class="detail-box" v-if="viewData.options.length || (viewData.deliverdesc_json && viewData.deliverdesc_json.length)">
            <div class="font18 bold align_center">{{viewData.title}}</div>
            <div v-if="viewData.options.length" :class="`db-flex pt5 pb5 ${(viewData.deliverdesc_json && viewData.deliverdesc_json.length) ? 'b_bottom_after' : ''}`">
              <div class="align_left">【规  格】</div>
              <div class="flex_cell flex_left">
                <template v-for="(o,oindex) in viewData.options">
                  {{o.title}}<template v-if="oindex < viewData.options.length - 1" class="ml3 mr3"> | </template>
                </template>
              </div>
            </div>
            <template v-if="viewData.deliverdesc_json && viewData.deliverdesc_json.length">
              <template v-for="(s,sindex) in viewData.deliverdesc_json">
                <div :class="`db-flex pt5 pb5 ${sindex < viewData.deliverdesc_json.length - 1 ? 'b_bottom_after' : ''}`">
                  <div class="align_left">{{s.title}}</div>
                  <div class="flex_cell flex_left">{{s.content}}</div>
                </div>
              </template>
            </template>
          </div>
          <div class="hide pt10 pb10" v-if="viewData.content && viewData.content != ''">{{viewData.content}}</div>
          <div class="photo-list pt10" v-if="contentPhoto.length">
            <img v-for="(item, index) in contentPhoto" :key="index" :src="item" />
          </div>
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
const Swiper = require('../../static/swiper')
export default {
  components: {TopMenu, ClassMenu},
  data () {
    return {
      query: {},
      viewData: {},
      swiperPhoto: [],
      contentPhoto: [],
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
      this.$http.get(`${ENV.GxkApi}/api/moduleInfo_n`, {
        params: {module: 'factoryproduct', prefixdomain: this.hostName, id: this.query.id}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          let retdata = data.data
          if (retdata.deliverdesc && retdata.deliverdesc !== '') {
            retdata.deliverdesc_json = JSON.parse(retdata.deliverdesc)
          }
          this.viewData = retdata
          if (this.viewData.photo && this.viewData.photo !== '') {
            this.swiperPhoto = this.viewData.photo.split(',')
          }
          if (this.viewData.contentphoto && this.viewData.contentphoto !== '') {
            this.contentPhoto = this.viewData.contentphoto.split(',')
          }
          document.title = this.viewData.title
          if (this.swiperPhoto.length > 1) {
            setTimeout(() => {
              return new Swiper('.swiper-area .swiper-inner', {
                loop: true,
                autoplay: {
                  delay: 4000
                },
                speed: 2000,
                pagination: {
                  el: '.swiper-area .swiper-pagination',
                  clickable: true
                }
              })
            }, 1000)
          }
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
