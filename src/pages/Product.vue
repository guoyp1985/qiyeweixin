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
  .swiper-outer{display:flex;}
  .p-info{flex:1;padding-left:20px;}
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
  .price-area{
    margin-top:20px;
    .txt1{font-size:18px;}
    .txt2{font-size:36px;}
    .txt3{font-size:16px;}
  }
  .sale-area{margin-top:20px;font-size:14px;color:#999;}
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
  .details{width:100%;overflow:hidden;}
  .detail-box{
    width:100%;padding:30rpx 20rpx;box-sizing: border-box;border-width:10rpx;border-style:solid;border-color:#ff0036;
    margin-bottom:10px;margin-top:10px;
  }
}
@media (max-width: 1199px) {
  .product-page.mobile{
    .middle-col{flex:1;margin-right:10px;overflow:hidden;}
    .swiper-area{width:200px;height:200px;position:relative;overflow:hidden;}
    .p-title{font-size:24px;line-height:1.2;}
    .price-area{
      margin-top:0px;
      .txt1{font-size:14px;}
      .txt2{font-size:24px;}
      .txt3{font-size:12px;}
    }
    .sale-area{margin-top:10px;}
  }
}
@media (max-width: 750px) {
  .product-page.mobile{
    .main-area{
      width:100%;display:block;
      .left-col{
        width:100%;margin-right:0;
        .left-inner{position:relative;width:100%;}
        .left-menu{width:100%;}
        .hd{width:100%;}
        .bd{width:100%;}
        ul,li{width:100%;}
      }
    }
    .swiper-outer{display:block;}
    .p-info{width:100%;padding-left:0;}
  }
}
</style>
<template>
  <div class="product-page mobile">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <div class="swiper-outer">
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
          <div class="p-info" style="position:relative;">
            <h1 class="p-title mb5">{{viewData.title}}</h1>
            <div v-if="viewData.sellingpoint && viewData.sellingpoint != ''" style="color:#FF0036;">{{viewData.sellingpoint}}</div>
            <div class="price-area color-red7">
              <span class="txt1">￥</span>
              <span class="txt2 bold" v-if="viewData.minprice && viewData.maxprice && viewData.minprice != '' && viewData.maxprice != '' && viewData.minprice != viewData.maxprice">{{viewData.minprice}}-{{viewData.maxprice}}</span>
              <span class="txt2 bold" v-else-if="viewData.minprice && viewData.minprice != ''">{{viewData.minprice}}</span>
              <span class="txt2 bold" v-else>{{viewData.price}}</span>
              <span class="txt3 ml5 color-gray" style="text-decoration: line-through" v-if="viewData.oriprice && viewData.oriprice > 0">￥{{viewData.oriprice}}</span>
            </div>
            <div class="sale-area db-flex">
              <div>
                <span>运费: </span>
                <span v-if="viewData.postate > 0">{{viewData.postate}}</span>
                <span v-else>包邮</span>
              </div>
            </div>
            <div class="btn-buy">立即购买</div>
          </div>
        </div>
        <div class="details">
          <div class="details-br mt10">——详情——</div>
          <div class="detail-box" v-if="(viewData.options && viewData.options.length) || (viewData.deliverdesc_json && viewData.deliverdesc_json.length)">
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
          <div class="photo-list pt10" v-if="contentPhoto && contentPhoto.length">
            <img v-for="(item, index) in contentPhoto" :key="index" :src="item" />
          </div>
        </div>
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
const Swiper = require('../../static/swiper')
export default {
  components: {TopMenu, ClassMenu, Footer},
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
          retdata.deliverdesc_json = []
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
          if (this.swiperPhoto && this.swiperPhoto.length > 1) {
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
