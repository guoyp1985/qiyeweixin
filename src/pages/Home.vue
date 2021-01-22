/*
* @description: 首页
* @auther: gyp
* @created_date: 2021-01-21
*/
<style lang="less">
@import '../assets/swiper.less';
.home-page{
  width:100%;
  .banner-area{width:100%;height:272px;position:relative;overflow:hidden;}
  .banner-inner{position:absolute;left:0;top:0;right:0;bottom:0;}
  .banner-item{position:relative;float:left;display:block;}
  .banner-item img{width:100%;height:100%;object-fit:cover;position:absolute;overflow:hidden;}
  .banner-item .txt{
      width: 100%;
      background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.8)));
      background: -webkit-linear-gradient(top,transparent,rgba(0,0,0,.8));
      background: -o-linear-gradient(top,transparent 0,rgba(0,0,0,.8) 100%);
      background: linear-gradient(180deg,transparent,rgba(0,0,0,.8));
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      font-size: 20px;
      line-height: 30px;
      margin: 12px 20px 20px;
  }
  .banner-area .swiper-container-horizontal > .swiper-pagination-bullets {width:auto;left:auto;right:10px;bottom:12px;}
  .banner-area .swiper-pagination-bullet{
      display: inline-block;
      background: #fff;
      opacity: .5;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 4px;
      cursor: pointer;
  }
  .banner-area .swiper-pagination-bullet-active{opacity:1;}

  .m-row1{margin-bottom: 10px;height: 272px;display:flex;}
  .m-row1 .col1{width: 458px;position:relative;}
  .m-row1 .col2{width:230px;display:flex;justify-content:flex-end;margin-left:10px;}
  .m-row1 .list-area{width:100%;}
  .m-row1 .list-area .item{width:100%;height: 130px;position:relative;}
  .m-row1 .list-area .item:not(:first-child){margin-top:11px;}
  .m-row1 .list-area img {width: 100%;height: 100%;object-fit:cover;}
  .m-row1 .list-area .txt{
      width: 100%;padding:12px;box-sizing:border-box;
      background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.8)));
      background: -webkit-linear-gradient(top,transparent,rgba(0,0,0,.8));
      background: -o-linear-gradient(top,transparent 0,rgba(0,0,0,.8) 100%);
      background: linear-gradient(180deg,transparent,rgba(0,0,0,.8));
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      font-size: 14px;
      line-height: 18px;
  }

  .m-row2{margin-top:35px;}
  .m-row2 .row-head{color: #5889ec;}
  .m-row2 .list-area{}
  .m-row2 .item{border-top: 1px solid #e6e6e6;}
  .m-row2 .item:first-child{border-top:none;}
  .m-row2 .item-inner{width:100%;display:flex;padding: 20px 0;color:#333;}
  .m-row2 .item-inner:hover{color:#2291f7}
  .m-row2 .list-area .pic{
      margin-right: 20px;
      width: 230px;
      height: 130px;
      overflow: hidden;
  }
  .m-row2 .list-area img{width:100%;height:100%;object-fit:cover;}
  .m-row2 .list-area .con{height:130px;}
  .m-row2 .list-area .con h3 {line-height: 32px;min-height: 75px;}
  .m-row2 .list-area .con .binfo{
      position: relative;
      color: #666;
      font-size: 12px;
      height: 22px;
  }

  .right-col{flex:1;display:flex;justify-content: flex-end;}
  .right-col .right-inner{width:300px;}
  .r-list-area{}
  .r-list-area .list-head{padding: 0 0 13px 15px;}
  .r-list-area .list-head h2 {position: relative;width: 120px;height: 20px;line-height: 20px;}
  .r-list-area .list-head .txt {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 20px;
      color: #4889f3;
  }
  .r-list-area .list-con{background-color: #f7f8f9;padding: 5px 15px;margin-bottom: 35px;}
  .r-list-area .item {position: relative;padding: 10px 0;font-size: 14px;display:flex;}
  .r-list-area .item .pic {display:block;position: relative;width: 120px;height: 80px;overflow: hidden;}
  .r-list-area .item .pic img {
      position: relative;
      -webkit-transition: -webkit-transform .3s ease-out;
      transition: -webkit-transform .3s ease-out;
      -o-transition: transform .3s ease-out;
      transition: transform .3s ease-out;
      transition: transform .3s ease-out,-webkit-transform .3s ease-out;
      width: 100%;height:100%;object-fit:cover;
  }
  .r-list-area .item .txt {
      display:block;
      position: relative;
      width: 140px;
      padding-left: 10px;
      line-height: 22px;
      z-index: 1;color:#333;
  }
}
</style>
<template>
  <div class="home-page">
    <top-menu current="home0"></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <div class="m-row1">
            <div class="col1">
              <div class="banner-area">
                  <div class="banner-inner">
                      <div class="banner-swiper swiper-wrapper">
                        <div v-for="(item,index) in swiperData" :key="item.id" class="banner-item swiper-slide" @click="toNews(item)">
                            <img :src="item.photo" />
                            <div class="txt">{{item.title}}</div>
                        </div>
                      </div>
                      <div class="swiper-pagination"></div>
                  </div>
              </div>
            </div>
            <div class="col2">
              <div class="list-area" v-if="listData1.length">
                <div class="item" v-for="(item, index) in listData1" :key="item.id" @click="toNews(item)">
                  <img :src="item.photo" />
                  <div class="txt">{{item.title}}</div>
                </div>
              </div>
            </div>
        </div>
        <div class="m-row2">
            <div class="row-head"><h2>精选新闻</h2></div>
            <div class="list-area" v-if="listData2.length">
              <div class="item" v-for="(item, index) in listData2" :key="item.id">
                  <div class="item-inner "  @click="toNews(item)">
                      <div class="pic">
                          <img :src="item.photo" />
                      </div>
                      <div class="con">
                          <h3 class="dis_area" keyname="title">{{item.title}}</h3>
                          <div class="binfo">
                              <span>{{ item.dateline | dateformat }}</span>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
      <div class="right-col">
          <div class="right-inner">
              <div class="r-list-area" style="margin-top: unset;">
                  <div class="list-head">
                      <h2><span class="txt">精品原创</span></h2>
                  </div>
                  <div class="list-con">
                      <ul class="r-news-list" v-if="listData3.length">
                        <li class="item cf false" v-for="(item, index) in listData3" :key="item.id"  @click="toNews(item)">
                            <div class="pic">
                                <img :src="item.photo" />
                            </div>
                            <div class="txt">{{item.title}}</div>
                        </li>
                      </ul>
                  </div>
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
      swiperData: [],
      listData1: [],
      listData2: [],
      listData3: [],
      hostName: ''
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    toNews (item) {
      this.$router.push({path: '/news', query: {id: item.id}})
    },
    getSwiper () {
      this.$http.get(`${ENV.AdminApi}/api/content_n/getList`, {
        params: {module: 'news', prefixdomain: this.hostName, classid: 1, limit: 4}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.swiperData = data.data
          setTimeout(() => {
            return new Swiper('.banner-area .banner-inner', {
              loop: true,
              autoplay: {
                delay: 4000
              },
              speed: 2000,
              pagination: {
                el: '.banner-area .swiper-pagination',
                clickable: true
              }
            })
          }, 1000)
        }
      })
    },
    getData1 () {
      this.$http.get(`${ENV.AdminApi}/api/content_n/getList`, {
        params: {module: 'news', prefixdomain: this.hostName, classid: 2, limit: 2}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.listData1 = data.data
        }
      })
    },
    getData2 () {
      this.$http.get(`${ENV.AdminApi}/api/content_n/getList`, {
        params: {module: 'news', prefixdomain: this.hostName, classid: 1, limit: 10}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.listData2 = data.data
        }
      })
    },
    getData3 () {
      this.$http.get(`${ENV.AdminApi}/api/content_n/getList`, {
        params: {module: 'news', prefixdomain: this.hostName, classid: 2, limit: 4}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.listData3 = data.data
        }
      })
    },
    refresh () {
      this.hostName = this.$util.getHostName()
      this.getSwiper()
      this.getData1()
      this.getData2()
      this.getData3()
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
