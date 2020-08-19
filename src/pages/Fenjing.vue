<template lang="html">
  <div class="bg-page font14 fenjing-list-page">
    <div class="vux-tab-wrap">分镜脚本</div>
    <div class="s-container scroll-container" style="top:44px;">
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
              prop="id"
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
              v-if="query.type"
              min-width="120">
              <template slot-scope="scope">
                <template v-if="query.type"><el-button size="mini" @click="addFenJing(scope.row)">修改</el-button></template>
                <!-- <template v-if="!query.type"><el-button size="mini" @click="handleExamine(scope.row.id)">审批</el-button></template> -->
              </template>
            </el-table-column>
        </el-table>
         <div class="align_center mt20">
           <el-button
             v-if="query.type"
             type="primary"
             @click="addFenJing">新增分镜脚本</el-button>
             <el-button
               v-if="!query.type"
               type="primary"
               @click="handleExamine">审批</el-button>
         </div>
      </template>
      <div class="bg-white mt20" v-if="isAddFenJing">
        <div class="from bg-white from-list">
          <div class="from-item flex_left">
            <div class="item-title">日外/夜内<span>*</span></div>
            <div class="item-cell"><el-input v-model="daynight" placeholder="请输入日外/夜内"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">场景<span>*</span></div>
            <div class="item-cell"><el-input v-model="scene" placeholder="请输入场景"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">拍摄手法<span>*</span></div>
            <div class="item-cell"><el-input v-model="photography" placeholder="请输入拍摄手法"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">景别<span>*</span></div>
            <div class="item-cell"><el-input v-model="fieldofview" placeholder="请输入景别"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">时长<span>*</span></div>
            <div class="item-cell"><el-input v-model="seconds" placeholder="请输入时长"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">画面描述<span>*</span></div>
            <div class="item-cell"><el-input type="textarea" v-model="pictures" placeholder="请输入画面描述"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">台词/解说词<span>*</span></div>
            <div class="item-cell"><el-input type="textarea" v-model="actorsline" placeholder="请输入台词/解说词"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">服装道具<span>*</span></div>
            <div class="item-cell"><el-input v-model="costumes" placeholder="请输入服装道具"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">后期制作<span>*</span></div>
            <div class="item-cell"><el-input v-model="postproduction" placeholder="请输入后期制作"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">备注<span>*</span></div>
            <div class="item-cell"><el-input v-model="memo" placeholder="请输入备注"></el-input></div>
          </div>
          <div class="align_center">
             <el-button type="primary" @click="onSubmit">{{addText}}</el-button>
          </div>
        </div>
      </div>
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
      ratio: '',
      demandid: '',
      daynight: '',
      scene: '',
      photography: '',
      fieldofview: '',
      seconds: '',
      pictures: '',
      actorsline: '',
      costumes: '',
      postproduction: '',
      memo: '',
      addText: '立即提交',
      isAddFenJing: false
    }
  },
  methods: {
    addFenJing (row) {
      this.isAddFenJing = true
      if (row.daynight) {
        this.daynight = row.daynight
        this.scene = row.scene
        this.photography = row.photography
        this.fieldofview = row.fieldofview
        this.seconds = row.seconds
        this.pictures = row.pictures
        this.actorsline = row.actorsline
        this.costumes = row.costumes
        this.postproduction = row.postproduction
        this.memo = row.memo
        this.addText = '修改'
      } else {
        this.daynight = ''
        this.scene = ''
        this.photography = ''
        this.fieldofview = ''
        this.seconds = ''
        this.pictures = ''
        this.actorsline = ''
        this.costumes = ''
        this.postproduction = ''
        this.memo = ''
        this.addText = '立即提交'
      }
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
      this.$http.post(`${ENV.BokaApi}/api/demands/getStoryBoard`, {demandid: parseInt(this.query.id)}).then(res => {
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
    onSubmit () {
      if (!this.issubmit) {
        if (this.daynight === '' ||
        this.scene === '' ||
        this.photography === '' ||
        this.fieldofview === '' ||
        this.seconds === '' ||
        this.pictures === '' ||
        this.actorsline === '' ||
        this.costumes === '' ||
        this.postproduction === '' ||
        this.memo === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/addStoryBoard`, {
            demandid: parseInt(this.query.id),
            daynight: this.daynight,
            scene: this.scene,
            photography: this.photography,
            fieldofview: this.fieldofview,
            seconds: this.seconds,
            pictures: this.pictures,
            actorsline: this.actorsline,
            costumes: this.costumes,
            postproduction: this.postproduction,
            memo: this.memo,
            id: this.query.fenjingId
          }).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.getData()
            this.isAddFenJing = false
            this.issubmit = false
          })
        }
      }
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
        this.tableData = []
        this.isAddFenJing = false
        this.issubmit = false
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
  @media (min-width: 768px) {
    .modal-inner{
      width: 400px !important;
    }
  }
  .from-item-textarea{
    height: 100px;
    border:1px solid #bcbcbc;
    border-radius: 4px;
    .el-textarea,.el-textarea__inner{
      height: 100%;
      border: none !important;
    }
  }
  .from-list{
    padding: 20px;
    padding-bottom: 40px;
    .from-item{
      margin-bottom: 20px;
      .item-title{
        width: 100px;
        span{
          color: red;
        }
      }
      .item-cell{
        border-bottom: 1px solid #bcbcbc;
        flex: 1;
        span{
          color: #999;
          font-size: 13px;
        }
        .el-select,.el-input{
          width: 100%;
        }
        .el-textarea__inner{
          height: 80px;
        }
        .el-input__inner,.el-textarea__inner{
          border: none !important;
          min-width: 200px;
        }
      }
      .con-row{
        .item-cell{
          border-bottom: 1px solid #bcbcbc;
        }
      }
    }
  }
}
</style>
