<template>
  <div class="bg-page font14 user-list-page">
    <tab class="b-tab" v-model="selectedIndex">
      <tab-item :selected="selectedIndex == 0" @on-item-click="clickTab(0,0)">新订单</tab-item>
      <tab-item :selected="selectedIndex == 1" @on-item-click="clickTab(1,1)">待分发</tab-item>
      <tab-item :selected="selectedIndex == 2" @on-item-click="clickTab(2,2)">创意期</tab-item>
      <tab-item :selected="selectedIndex == 4" @on-item-click="clickTab(4,4)">分镜脚本期</tab-item>
      <tab-item :selected="selectedIndex == 5" @on-item-click="clickTab(5,5)">样片期</tab-item>
    </tab>
    <div class="s-container scroll-container makeList-page" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
      <el-row class="padding10">
        <el-col :span="18">
          <el-input placeholder="请输入项目名称搜索" v-model="keyword" @keyup.enter.native="kwChange">
            <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" class="flex_right">
          <el-button type="primary" @click.native="toLink('/addMake')">新增</el-button>
        </el-col>
      </el-row>
      <template v-if="disTabData">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @row-click="handleEdit">
            <el-table-column
              prop="demandno"
              label="项目编号"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="title"
              label="项目名称"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="videotype"
              label="项目类别"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="datetime"
              label="项目起止时间"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="price"
              label="项目价格"
              min-width="120">
            </el-table-column>
            <el-table-column
              label="特殊备注"
              min-width="120">
              <template slot-scope="scope">
                <template v-if="!scope.row.otherdemand || scope.row.otherdemand == ''">无</template>
                <template v-else>{{scope.row.otherdemand}}</template>
              </template>
            </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { User } from '#/storage'
import {Tab, TabItem} from 'vux'
export default {
  components: {
    Tab, TabItem
  },
  data () {
    return {
      loginUser: {},
      query: {},
      tableData: [],
      limit: 20,
      pageStart: 0,
      disTabData: false,
      keyword: '',
      selectedIndex: 0,
      clickStatus: 0
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    clickTab (index, status) {
      this.keyword = ''
      this.selectedIndex = index
      this.clickStatus = status
      this.pagestart = 0
      this.disTabData = false
      this.tableData = []
      this.$vux.loading.show()
      this.getData()
    },
    kwChange () {
      if (event.keyCode === 13) {
        this.searchEvent()
      }
    },
    searchEvent () {
      this.pagestart = 0
      this.disTabData = false
      this.tableData = []
      this.$vux.loading.show()
      this.getData()
    },
    getData () {
      let params = {pagestart: this.pageStart, limit: this.limit, status: this.clickStatus}
      if (this.keyword && this.keyword !== '') {
        params.keyword = this.keyword
      }
      this.$http.post(`${ENV.BokaApi}/api/demands/getList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            let curd = retdata[i]
            let startdate = new Date(curd.starttime * 1000)
            let startyear = startdate.getFullYear()
            let startmonth = startdate.getMonth() + 1
            let startday = startdate.getDate()
            let enddate = new Date(curd.endtime * 1000)
            let endyear = enddate.getFullYear()
            let endmonth = enddate.getMonth() + 1
            let endday = enddate.getDate()
            curd.datetime = startyear + '/' + startmonth + '/' + startday + ' - ' + endyear + '/' + endmonth + '/' + endday
          }
          this.tableData = this.tableData.concat(retdata)
          this.disTabData = true
        }
      })
    },
    handleScroll (refname) {
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
    handleEdit (row) {
      let id = row.id
      if (this.clickStatus === 4) {
        this.$router.push({path: '/fenJing', query: {id: id}})
      } else {
        this.$router.push({path: '/makeDetails', query: {id: id}})
      }
    },
    refresh () {
      this.loginUser = User.get()
      if (this.loginUser) {
        this.query = this.$route.query
        this.pageStart = 0
        this.disTabData = false
        this.selectedIndex = 0
        this.clickStatus = 0
        this.tableData = []
        if (this.query.status) {
          this.selectedIndex = parseInt(this.query.status)
          this.clickStatus = parseInt(this.query.status)
        }
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
  .makeList-page .el-table__row,.vux-tab-item{
    cursor: pointer;
  }
}
</style>
