/*
* @description: 商品列表页
* @auther: gyp
* @created_date: 2021-01-22
*/
<style lang="less">
.product-list-page{
  width:100%;height:100%;overflow-y:auto;
  .middle-col{flex:1;}
  .m-row2{}
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
  .m-row2 .list-area .con h3 {line-height: 32px;}
}
</style>
<template>
  <div class="product-list-page" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
    <top-menu :current="`productlist${query.classid ? query.classid : 0}`"></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <div class="m-row2 list-outer">
            <div class="list-area">
              <div class="item" v-for="(item, index) in listData" @click="toDetail(item)">
                <div class="item-inner">
                    <div class="pic">
                        <img :src="item.photo" />
                    </div>
                    <div class="con">
                        <h3>{{item.title}}</h3>
                        <div style="margin-bottom:5px;color:#ff0000;">{{item.sellingpoint}}</div>
                        <div style="color:#ff0000;">
                          <span>￥</span>
                          <span style="font-size:16px;font-weight:bold;">{{item.price}}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div v-if="isLoading" class="loading-area flex_center" style="width:100%;height:50px;color:#ccc;">正加载中</div>
            <div v-if="isDone" class="loading-end-area flex_center" style="width:100%;height:50px;color:#ccc;">没有更多数据啦</div>
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
      listData: [],
      pagestart: 0,
      limit: 15,
      isLoading: false,
      isDone: false
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
    toDetail (item) {
      this.$router.push({path: '/product', query: {id: item.id}})
    },
    getList () {
      this.$http.get(`${ENV.GxkApi}/api/list_n/product`, {
        params: {module: 'product', classid: this.query.classid, pagestart: this.pagestart, limit: this.limit}
      }).then(res => {
        const data = res.data
        this.isLoading = false
        if (data.flag) {
          const retdata = data.data
          this.listData = this.listData.concat(retdata)
          if (retdata.length < this.limit) {
            this.isDone = true
          }
        }
      })
    },
    handleScroll (refname) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (this.listData.length === (this.pagestart + 1) * this.limit) {
            this.pagestart++
            this.isLoading = true
            this.getList()
          }
        }
      })
    },
    refresh () {
      this.query = this.$route.query
      this.listData = []
      this.pagestart = 0
      this.limit = 15
      this.isLoading = false
      this.isDone = false
      this.getList()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
