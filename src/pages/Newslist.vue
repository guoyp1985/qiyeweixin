/*
* @description: 新闻列表页
* @auther: gyp
* @created_date: 2021-01-21
*/
<style lang="less">
.news-page{
  width:100%;
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
  .m-row2 .list-area .con h3 {line-height: 32px;min-height: 75px;}
  .m-row2 .list-area .con .binfo{
      position: relative;
      color: #666;
      font-size: 12px;
      height: 22px;
  }
}
</style>
<template>
  <div class="news-page">
    <top-menu></top-menu>
    <div class="main-area">
      <class-menu></class-menu>
      <div class="middle-col">
        <div class="m-row2 list-outer">
            <div class="list-area" template=".template3">
              <div class="item" v-for="(item, index) in listData" @click="toNews(item)">
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
            <div v-if="isLoading" class="loading-area flex_center hide" style="width:100%;height:50px;color:#ccc;">正加载中</div>
            <div v-if="isDone" class="loading-end-area flex_center hide" style="width:100%;height:50px;color:#ccc;">没有更多数据啦</div>
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
import jQuery from 'jquery'
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
  methods: {
    getList () {
      this.$http.get(`${ENV.GxkApi}/api/list_n/news`, {
        params: {module: 'news', classid: this.query.classid, pagestart: this.pagestart, limit: this.limit}
      }).then(res => {
        const data = res.data
        this.isLoading = false
        if (data.flag) {
          const retdata = data.data
          this.listData = retdata
          if (retdata.length < this.limit) {
            this.isDone = true
          }
        }
      })
    },
    scrollEvent () {
      const scrollarea = jQuery('#vux_view_box_body')[0]
      console.log('输出滚动区域')
      console.log(scrollarea)
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
      this.getList()
      this.scrollEvent()
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
