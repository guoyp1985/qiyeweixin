<template>
  <div class="bg-page font14 user-list-page">
    <tab class="b-tab" v-model="selectedIndex">
      <tab-item :selected="selectedIndex == 0" @on-item-click="clickTab(0,0)">全部</tab-item>
      <tab-item :selected="selectedIndex == 1" @on-item-click="clickTab(1,1)">管理员</tab-item>
      <tab-item :selected="selectedIndex == 2" @on-item-click="clickTab(2,4)">业务员</tab-item>
      <tab-item :selected="selectedIndex == 3" @on-item-click="clickTab(3,5)">客户</tab-item>
      <tab-item :selected="selectedIndex == 4" @on-item-click="clickTab(4,3)">供应商</tab-item>
    </tab>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
      <el-row class="padding10">
        <el-col :span="18">
          <el-input placeholder="请输入手机号或昵称搜索" v-model="keyword" @keyup.enter.native="kwChange">
            <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" class="flex_right">
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
              width="120">
                <template slot-scope="scope">
                  <template v-if="!scope.row.mobile || scope.row.mobile == ''">无</template>
                  <template v-else>{{scope.row.mobile}}</template>
                </template>
            </el-table-column>
            <el-table-column
              label="身份"
              width="120">
                <template slot-scope="scope">{{scope.row.groupname}}</template>
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
      clickGroupid: 0
    }
  },
  methods: {
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
