<template>
  <div class="bg-page font14 user-list-page">
    <tab class="b-tab" v-model="selectedIndex">
      <tab-item :selected="selectedIndex == 0" @on-item-click="clickTab(0,0)">新订单</tab-item>
      <tab-item :selected="selectedIndex == 1" @on-item-click="clickTab(1,1)">待分发</tab-item>
      <tab-item :selected="selectedIndex == 2" @on-item-click="clickTab(2,4)">创意期</tab-item>
      <tab-item :selected="selectedIndex == 3" @on-item-click="clickTab(3,5)">分镜脚本期</tab-item>
      <tab-item :selected="selectedIndex == 4" @on-item-click="clickTab(4,3)">样片期</tab-item>
    </tab>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
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
        :cell-style="{'text-align':'center'}">
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
              prop="ratio"
              label="视频比例"
              min-width="120">
            </el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <div class="options flex_around">
                  <div class="btn-item" v-if="scope.row.canedit === 1">
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleEdit(scope.row.id)">编辑</el-button>
                  </div>
                  <div class="btn-item" v-if="scope.row.cancensor === 1">
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleExamine(scope.row.id,scope.$index)">审核</el-button>
                  </div>
                  <div class="btn-item" v-if="selectedIndex === 1">
                    <el-button
                      size="mini"
                      type="text"
                      @click="chooseUser(scope.row.id,scope.$index)">选择用户</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="auto-modal flex_center" style="position:fixed;" v-if="showExamine">
      <div class="modal-inner">
        <div class="modal-content padding20">
            <div class="modal-header mb20">
              <el-radio-group v-model="radio" @change="changeExamine">
                <el-radio :label= "1">审批通过</el-radio>
                <el-radio :label= "2">审批不通过</el-radio>
              </el-radio-group>
            </div>
            <div class="modal-body mb20">
              <div class="from-item">
                <el-input type="textarea" v-model="reason" :placeholder="showReason" size="50"></el-input>
              </div>
            </div>
            <div class="modal-footer flex_right">
              <el-button @click="closeModal">取消</el-button>
              <el-button class="" type="primary" @click="submitModal">提交</el-button>
            </div>
        </div>
      </div>
    </div>
    <div class="auto-modal flex_center" style="position:fixed;" v-if="showChooseUser">
      <div class="modal-inner">
        <div class="modal-content padding20">
            <div class="modal-header mb20">
              选择用户
            </div>
            <div class="modal-body mb20">
              <div class="users-box scroll-container" ref="scrollContainer2" @scroll="handleScroll2('scrollContainer2',0)">
                <template v-if="disTabData2">
                  <div v-if="!tableData2.length" class="rw-item flex_center">暂无数据</div>
                  <el-checkbox-group v-else v-model="checkList">
                    <div v-for="(item,index) in tableData2" :key="index">
                      <div class="rw-item flex_left">
                        <el-checkbox :label="item.uid">{{item.linkman}}</el-checkbox>
                      </div>
                    </div>
                  </el-checkbox-group>
                </template>
              </div>
            </div>
            <div class="modal-footer flex_right">
              <el-button @click="closeUserModal">取消</el-button>
              <el-button class="" type="primary" @click="submitUserModal">提交</el-button>
            </div>
        </div>
      </div>
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
      tableData2: [],
      pageStart2: 0,
      disTabData2: false,
      keyword2: '',
      selectedIndex: 0,
      clickStatus: 0,
      showExamine: false,
      showReason: '请输入审批通过原因',
      radio: 1,
      reason: '',
      id: '',
      examineIndex: '',
      showChooseUser: false,
      checkList: []
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
    handleEdit (id) {
      this.$router.push({path: '/addMake', query: {id}})
    },
    handleExamine (id,index) {
      this.id = id
      this.showExamine = true
      this.examineIndex = index
    },
    changeExamine () {
      if (this.radio === 2) {
        this.showReason = '请输入审批不通过原因'
      } else {
        this.showReason = '请输入审批通过原因'
      }
      this.reason = ''
    },
    closeModal () {
      this.showExamine = false
      this.reason = ''
      this.radio = 1
      this.showReason = '请输入审批通过原因'
    },
    submitModal () {
      if (this.radio === 2 && this.reason === '') {
        this.$vux.toast.text('请填写审批不通过原因', 'middle')
        return false
      }
      let params = {id: this.id, agree: this.radio}
      if (this.reason) params.reason = this.reason
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/censor`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          this.closeModal ()
          this.tableData.splice(this.examineIndex, 1)
        }
      })
    },
    chooseUser (id,index) {
      if (!this.tableData2.length) {
        this.getData2()
      }
      this.showChooseUser = true
    },
    closeUserModal () {
      this.showChooseUser = false
      this.checkList = []
    },
    submitUserModal () {
      if (!this.checkList.length) {
        this.$vux.toast.text('请选择用户', 'middle')
        return false
      }

    },
    handleScroll2 (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.tableData2.length === (self.pageStart + 1) * self.limit) {
            self.pageStart2++
            self.$vux.loading.show()
            self.getData2()
          }
        }
      })
    },
    getData2 () {
      let params = {pagestart: this.pageStart2, limit: this.limit}
      if (this.keyword2 && this.keyword2 !== '') {
        params.keyword = this.keyword2
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/user/getList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.tableData2 = this.tableData2.concat(retdata)
          this.disTabData2 = true
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      if (this.loginUser) {
        this.pageStart = 0
        this.disTabData = false
        this.selectedIndex = 0
        this.tableData = []
        this.pageStart2 = 0
        this.disTabData2 = false
        this.tableData2 = []
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
    .flex_around{
      display: flex;
      flex-flow: wrap;
      align-items: center;
      .btn-item{
        width: 50%;
      }
      .el-button{margin: 5px 0px;}
    }
}
.users-box{
  max-height: 200px;
  overflow-y: scroll;
}
@media (min-width: 768px) {
  .modal-inner{
    width: 400px !important;
  }
}
.from-item{
  height: 100px;
  border:1px solid #bcbcbc;
  border-radius: 4px;
  .el-textarea,.el-textarea__inner{
    height: 100%;
    border: none !important;
  }
}
</style>
