<template>
  <div class="bg-page font14 user-list-page">
    <div class="vux-tab-wrap">线索列表</div>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
      <template v-if="disTabData">
        <template v-if="!tableData.length">
          <div class="scroll_list">
            <div class="emptyitem">
              <div class="t-table" style="padding-top:20%;">
                <div class="t-cell padding10">
                  <div>暂无数据</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="scroll_list ">
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                    prop="title"
                    align="center"
                    label="姓名"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    align="center"
                    label="手机号码"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="identity"
                    align="center"
                    label="身份"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    label="地址"
                    min-width="120">
                </el-table-column>
            </el-table>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      loginUser: {},
      query: {},
      tableData: [],
      limit: 20,
      pageStart: 0,
      disTabData: false
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    getData () {
      let params = {pagestart: this.pageStart, limit: this.limit}
      this.$http.post(`${ENV.BokaApi}/api/clues/getList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            let curd = retdata[i]
            curd.address = curd.province + ' ' + curd.city
            curd.identity === 1 ? curd.identity = '我是客户，需要制作视频' : curd.identity = '我是视频制作团队，求合作'
          }
          this.tableData = this.tableData.concat(retdata)
          this.disTabData = true
        }
      })
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.tableData.length === (self.pageStart + 1) * self.limit) {
            self.pageStart++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      if (this.loginUser) {
        this.pageStart = 0
        this.disTabData = false
        this.tableData = []
        this.$vux.loading.show()
        this.getData()
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.user-list-page{
  .vux-tab-wrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 44px;
  }
  .scroll_item{overflow:hidden;position:relative;}
    .btnicon{
      display: inline-block;
      color: #ea3a3a;
      border: 1px solid #ea3a3a;
      text-align: center;
      border-radius: 30px;
      letter-spacing: 0px;
      height: 21px;
      width: 41px;
      line-height: 21px;
    }
    .pro_list_top{
      width:100%;padding-bottom:9%;
      background: url(../assets/images/product_list_top.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
    .doBtn{height: 44px;line-height: 44px;width: 33.3%;text-align: center;}
    .flex_around{display: flex;justify-content: space-around; align-items: center;}
}
</style>
