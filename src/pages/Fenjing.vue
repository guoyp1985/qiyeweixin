<template lang="html">
  <div class="bg-page font14 fenjing-list-page">
    <div class="vux-tab-wrap">分镜脚本</div>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer',0)">
      <template v-if="disTabData">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
          <el-table-column
            label="《制作需求单》附件："
            min-width="100">
            <el-table-column
              prop="version"
              label="镜号"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="daynight"
              label="日外/夜内"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="scene"
              label="场景"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="photography"
              label="拍摄手法"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="fieldofview"
              label="景别"
              min-width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column
            :label="title"
            min-width="100">
            <el-table-column
              prop="seconds"
              label="时长"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="pictures"
              label="画面描述"
              min-width="200">
              <template slot-scope="scope">
                <div v-if="!scope.row.pictures || scope.row.pictures == ''">无</div>
                <div class="align_left pre-wrap" v-else>{{scope.row.pictures}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="分镜脚本"
            min-width="100">
            <el-table-column
              label="台词/解说词"
              min-width="200">
              <template slot-scope="scope">
                <div v-if="!scope.row.actorsline || scope.row.actorsline == ''">无</div>
                <div class="align_left pre-wrap" v-else>{{scope.row.actorsline}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            :label="ratioOptions[ratio]"
            min-width="100">
            <el-table-column
              label="服装道具"
              min-width="120">
                <template slot-scope="scope">
                  <template v-if="!scope.row.costumes || scope.row.costumes == ''">无</template>
                  <template v-else>{{scope.row.costumes}}</template>
                </template>
            </el-table-column>
            <el-table-column
              label="后期制作"
              min-width="120">
                <template slot-scope="scope">
                  <template v-if="!scope.row.postproduction || scope.row.postproduction == ''">无</template>
                  <template v-else>{{scope.row.postproduction}}</template>
                </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="项目编号"
            min-width="100">
            <el-table-column
              label="备注"
              min-width="120">
                <template slot-scope="scope">
                  <template v-if="!scope.row.memo || scope.row.memo == ''">无</template>
                  <template v-else>{{scope.row.memo}}</template>
                </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            :label="demandno"
            min-width="100">
            <el-table-column
              label="审核意见"
              min-width="200">
                <template slot-scope="scope">
                  <template v-if="!scope.row.checkresult || scope.row.checkresult == ''">无</template>
                  <template v-else>{{scope.row.checkresult}}</template>
                </template>
            </el-table-column>
          </el-table-column>
            <el-table-column
              label="操作"
              min-width="120">
              <template slot-scope="scope">
                <template v-if="query.type"><el-button size="mini" @click="addFenJing(scope.row.id)">修改</el-button></template>
                <template v-if="!query.type"><el-button size="mini" @click="handleExamine(scope.row.id)">审批</el-button></template>
              </template>
            </el-table-column>
        </el-table>
         <div class="align_center mt20">
           <el-button
             v-if="query.type"
             type="primary"
             @click="addFenJing">新增分镜脚本</el-button>
         </div>
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
              <div class="from-item-textarea">
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
  </div>
</template>

<script>
import ENV from 'env'
import { User } from '#/storage'
export default {
  data () {
    return {
      loginUser: {},
      query: {},
      tableData: [],
      limit: 20,
      pageStart: 0,
      disTabData: false,
      id: '',
      radio: 1,
      reason: '',
      examineIndex: '',
      showExamine: false,
      showReason: '请输入审批通过原因',
      title: '',
      demandno: '',
      ratioOptions: '',
      ratio: ''
    }
  },
  methods: {
    addFenJing () {
      this.$router.push({path: '/addFenJing', query: {id: this.query.id}})
    },
    getData1 () {
      this.$http.post(`${ENV.BokaApi}/api/demands/fieldsList`).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.ratioOptions = retdata.ratio
          console.log(this.ratioOptions);
        }
      })
    },
    getInfo (id) {
      this.$http.post(`${ENV.BokaApi}/api/demands/info`, {id: id}).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.title = retdata.title
        this.demandno = retdata.demandno
        this.ratio = retdata.ratio
      })
    },
    getData () {
      let params = {pagestart: this.pageStart, limit: this.limit, demandid: parseInt(this.query.id)}
      this.$http.post(`${ENV.BokaApi}/api/demands/getStoryBoard`, params).then(res => {
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
    handleExamine (id) {
      this.showExamine = true
      if (id) this.id = id
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
          this.closeModal()
          this.getInfo(this.query.id)
          this.$router.push({path: '/makeList', query: {status: 5}})
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      if (this.loginUser) {
        this.query = this.$route.query
        this.pageStart = 0
        this.disTabData = false
        this.selectedIndex = 0
        this.clickGroupid = 0
        this.tableData = []
        this.$vux.loading.show()
        this.getData()
        this.getData1()
        this.getInfo(parseInt(this.query.id))
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.fenjing-list-page{
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
  .pre-wrap{
    white-space: pre-wrap;
  }
}
</style>
