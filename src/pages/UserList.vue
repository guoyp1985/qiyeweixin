<template>
  <div class="bg-page font14 user-list-page">
    <tab class="b-tab" v-model="selectedIndex">
      <tab-item :selected="selectedIndex == 0" @on-item-click="clickTab(0,0)">全部</tab-item>
      <tab-item :selected="selectedIndex == 1" @on-item-click="clickTab(1,1)">管理员</tab-item>
      <tab-item :selected="selectedIndex == 2" @on-item-click="clickTab(2,4)">业务员</tab-item>
      <tab-item :selected="selectedIndex == 3" @on-item-click="clickTab(3,2)">客户</tab-item>
      <tab-item :selected="selectedIndex == 4" @on-item-click="clickTab(4,3)">供应商</tab-item>
    </tab>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
      <el-row class="padding10">
        <el-col :span="3" class="flex_left">
          <el-button @click="toBack" type="info" icon="el-icon-arrow-left">返回</el-button>
        </el-col>
        <el-col :span="18">
          <el-input placeholder="请输入手机号或昵称搜索" v-model="keyword" @keyup.enter.native="kwChange">
            <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3" class="flex_right">
          <el-button type="primary" @click.native="toLink('/addUser')">新增</el-button>
        </el-col>
      </el-row>
      <template v-if="disTabData">
        <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
            <el-table-column
              prop="linkman"
              label="姓名"
              min-width="100">
            </el-table-column>
            <el-table-column
              label="手机号码"
              min-width="120">
                <template slot-scope="scope">
                  <template v-if="!scope.row.mobile || scope.row.mobile == ''">无</template>
                  <template v-else>{{scope.row.mobile}}</template>
                </template>
            </el-table-column>
            <el-table-column
              label="身份"
              min-width="120">
                <template slot-scope="scope">{{scope.row.groupname}}</template>
            </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import {User} from '#/storage'
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
      clickGroupid: 0,
      isManager: false, // 1:管理员
      isSale: false, // 4:业务员
      isCustomer: false, // 2:客户
      isSupplier: false // 3:供应商
    }
  },
  methods: {
    toBack () {
      window.history.go(-1)
    },
    toLink (link) {
      this.$router.push({path: link})
    },
    clickTab (index, groupid) {
      this.keyword = ''
      this.selectedIndex = index
      this.clickGroupid = groupid
      this.pagestart = 0
      this.disTabData = false
      this.tableData = []
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
      this.getData()
    },
    getData () {
      let params = {pagestart: this.pageStart, limit: this.limit}
      if (this.keyword && this.keyword !== '') {
        params.keyword = this.keyword
      }
      if (this.clickGroupid) {
        params.groupid = this.clickGroupid
      }
      this.$http.post(`${ENV.BokaApi}/api/user/getList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
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
      this.$util.setUserRole(this)
      if (this.loginUser) {
        this.pageStart = 0
        this.disTabData = false
        this.selectedIndex = 0
        this.clickGroupid = 0
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
  .vux-tab-item{
    cursor: pointer;
  }
}
</style>
