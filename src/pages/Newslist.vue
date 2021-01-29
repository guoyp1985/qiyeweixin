<style lang="less">
.news-list-page{
  width:100%;height:100%;overflow-y:auto;
  .middle-col{flex:1;}
  .m-row2{}
  .m-row2 .list-area{}
  .m-row2 .item{border-top: 1px solid #e6e6e6;}
  .m-row2 .item:first-child{border-top:none;}
  .m-row2 .item-inner{width:100%;display:flex;padding: 20px 0;color:#333;}
  .list-area .item:first-child .item-inner{padding-top:0;}
  .list-area .item:hover{cursor:pointer;}
  .m-row2 .item-inner:hover{color:#2291f7}
  .m-row2 .list-area .pic{
      margin-right: 20px;
      width: 230px;
      height: 130px;
      overflow: hidden;
  }
  .m-row2 .list-area img{width:100%;height:100%;object-fit:cover;}
  .m-row2 .list-area .con{height:130px;flex:1;}
  .m-row2 .list-area .con h3 {line-height: 32px;min-height: 75px;}
  .m-row2 .list-area .con .binfo{
      position: relative;
      color: #666;
      font-size: 12px;
      height: 22px;
  }
}
@media (max-width: 1199px) {
  .news-list-page.mobile{
    .middle-col{flex:1;margin-right:10px;overflow:hidden;}
  }
}
</style>
<template>
  <div class="news-list-page" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
    <top-menu :current="`newslist${query.classid ? query.classid : 0}`"></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <div class="m-row2 list-outer">
            <div class="list-area" template=".template3">
              <div class="item" v-for="(item, index) in listData" @click="toDetail(item)">
                <div class="item-inner">
                    <div class="pic">
                        <img :src="item.photo" />
                    </div>
                    <div class="con">
                        <h3>{{item.title}}</h3>
                        <div class="binfo">
                          <span>{{ item.dateline | dateformat }}</span>
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
      listData: [],
      pagestart: 0,
      limit: 15,
      isLoading: false,
      isDone: false,
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
    getview (to, from) {
      this.name = this.$route.query.name
    },
    toDetail (item) {
      this.$router.push({path: '/news', query: {id: item.id}})
    },
    getList () {
      this.$http.get(`${ENV.GxkApi}/api/list_n/factorynews`, {
        params: {module: 'factorynews', prefixdomain: this.hostName, classid: this.query.classid, pagestart: this.pagestart, limit: this.limit}
      }).then(res => {
        const data = res.data
        this.isLoading = false
        if (data.flag) {
          const retdata = data.data
          this.listData = this.listData.concat(retdata)
          if (retdata.length < this.limit && this.listData.length > this.limit / 2) {
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
      this.hostName = this.$util.getHostName()
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
