<template>
  <div class="bg-page font14 assign-sale-page">
    <div class="vux-tab-wrap">分配业务员</div>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
      <!-- <template v-if="disList1">
        <el-card class="box-card" v-if="!listData1.length">
          <div class="text item">暂无已分配业务员</div>
        </el-card>
        <el-card class="box-card" v-else>
          <div slot="header" class="clearfix">
            <span>已分配业务员</span>
          </div>
          <div v-for="(item,index) in listData1" :key="index" class="text item">{{item.linkman}}</div>
        </el-card>
      </template> -->
      <div v-if="disList1 &&disList2">
        <el-card class="box-card" v-if="!listData2.length && !listData1.length">
          <div class="text item">暂无可选业务员</div>
        </el-card>
        <template v-else>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>业务员</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="saveEvent">保存</el-button>
            </div>
            <el-checkbox-group v-model="salearr">
              <el-checkbox v-for="(item,index) in listData1" :label="item.uid">{{item.linkman}}</el-checkbox>
              <el-checkbox v-for="(item,index) in listData2" :label="item.uid">{{item.linkman}}</el-checkbox>
            </el-checkbox-group>
          </el-card>
        </template>
      </div>
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
      disTabData: false,
      listData1: [],
      disList1: false,
      listData2: [],
      disList2: false,
      salearr: []
    }
  },
  methods: {
    saveEvent () {
      console.log(this.salearr)
      this.$http.post(`${ENV.BokaApi}/api/demands/addDemandUser?type=pm`, {
        type: 'pm', demandid: this.query.id, uids: this.salearr
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.text(data.error, 'middle')
      })
    },
    toLink (link) {
      this.$router.push({path: link})
    },
    getData () {
      let params = {demandid: this.query.id, type: 'pm'}
      this.$http.post(`${ENV.BokaApi}/api/demands/getDemandUser`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.listData1 = retdata
          this.disList1 = true
        }
        return this.$http.post(`${ENV.BokaApi}/api/user/getList`, {
          groupid: 4, pagestart: this.pageStart, limit: 10000
        })
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          let retdata = data.data ? data.data : data
          for (let i = 0; i < this.listData1.length; i++) {
            this.salearr.push(this.listData1[i].uid)
            for (let j = 0; j < retdata.length; j++) {
              if (this.listData1[i].uid === retdata[j].uid) {
                retdata.splice(j, 1)
                break
              }
            }
          }
          this.listData2 = retdata
          this.disList2 = true
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
      this.query = this.$route.query
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
.assign-sale-page{
  .s-container{padding:10px;box-sizing: border-box;}
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
