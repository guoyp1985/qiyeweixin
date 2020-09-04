<template lang="html">
  <div class="bg-white font14 fenjing-list-page">
    <div class="vux-tab-wrap">分镜脚本</div>
    <div class="s-container scroll-container mb20" style="top:44px;">
      <template v-if="disTabData">
        <div class="flex_left padding10">
          <div class="pr10">版本号</div>
          <div class="flex_cell">
            <el-select v-model="curVersion" placeholder="请选择版本号" @change="versionChange()">
              <el-option
                v-for="item in versionData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="file-item" v-for="(item,index) in fileList" :key="index" :item="item">
          <a type="primary" :href="item.url" style="color: #409EFF;" target="_blank">{{item.name}}</a>
         </div>
        <div class="videobox">
          <div class='demo'v-for="(item,index) in playerOptions"  :key="index">
           <video-player class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="item">
           </video-player>
          </div>
        </div>
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
              type="index"
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
            :label="title+version"
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
              v-if="(query.type && canedit === 1) || !query.type"
              min-width="120">
              <template slot-scope="scope">
                <template  v-if="query.type && canedit === 1"><el-button size="mini" @click="addFenJing(scope.row)">修改</el-button></template>
                <template v-if="!query.type"><el-button size="mini" @click="handleExamine(scope.row.id)">审批</el-button></template>
              </template>
            </el-table-column>
        </el-table>
        <div class="align_center mt20" v-if="query.type && canedit === 1">
          <el-button
            type="primary"
            @click="addFenJing">新增分镜脚本</el-button>
          <el-button
            type="primary"
            @click="submitExamine">提交审批</el-button>
        </div>
         <div class="align_center mt20" v-if="!query.type && cancheck === 1">
           <el-button
             v-if="!query.type && cancheck === 1"
             type="primary"
             @click="backModify">返回修改</el-button>
           <el-button
             type="primary"
             @click="agreeStoryBoard">审核通过</el-button>
         </div>
         <div class="align_center mt20" v-if="!query.type && (status === 5 || status === 6)">
           <el-button
             type="primary"
             @click="agreeRushVideo">审核通过</el-button>
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
            <div class="item-title">服装道具</div>
            <div class="item-cell"><el-input v-model="costumes" placeholder="请输入服装道具"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">后期制作</div>
            <div class="item-cell"><el-input v-model="postproduction" placeholder="请输入后期制作"></el-input></div>
          </div>
          <div class="from-item flex_left">
            <div class="item-title">备注</div>
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
      showReason: '请输入审批意见',
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
      isAddFenJing: false,
      version: 0,
      fenjingId: 0,
      canedit: 0,
      cancheck: 0,
      playerOptions: [],
      status: 0,
      videoid: 0,
      fileList: [],
      isManger: false, // 1:管理员
      isSale: false, // 4:业务员
      isCustomer: false, // 2:客户
      isSupplier: false, // 3:供应商
      versionData: [],
      curVersion: ''
    }
  },
  methods: {
    versionChange () {
      this.getData()
    },
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
        this.fenjingId = row.id
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
        this.fenjingId = 0
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
        this.status = retdata.status
        this.videoid = retdata.videoid
        if (retdata.video && retdata.video !== '') {
          let arr = retdata.video.split(',')
          for (let i = 0; i < arr.length; i++) {
            let arrs = {
              playbackRates: [1.0, 2.0, 3.0],
              autoplay: false,
              muted: false,
              loop: false,
              preload: 'auto',
              language: 'zh-CN',
              aspectRatio: '16:9',
              fluid: true,
              sources: [
                {
                  type: 'video/mp4',
                  src: arr[i]
                }
              ],
              poster: '',
              notSupportedMessage: '此视频暂无法播放，请稍后再试',
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true
              }
            };
            this.playerOptions.push(arrs);
          }
        }
        if (retdata.status === 4) {
          this.getData()
        } else {
          this.getData4()
        }
      })
    },
    getData () {
      let params = {demandid: parseInt(this.query.id)}
      if (this.curVersion && this.curVersion !== '') params.version = this.curVersion
      this.$http.post(`${ENV.BokaApi}/api/demands/getStoryBoard`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.tableData = retdata
          this.version = data.version
          this.canedit = data.canedit
          this.cancheck = data.cancheck
          this.disTabData = true
          this.versionData = this.$util.transSelectOption(data.allversions)
        }
      })
    },
    getData4 () {
      let params = {demandid: parseInt(this.query.id)}
      this.$http.post(`${ENV.BokaApi}/api/demands/rushVideoCheckList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          this.tableData = retdata
          this.disTabData = true
        }
      })
    },
    agreeStoryBoard () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/agreeStoryBoard`, {demandid: this.query.id, version: this.version}).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          if (this.isManger || this.isSale) {
            this.$router.push({path: '/makeList', query: {status: 5}})
          } else {
            this.$router.push({path: '/makeUserList', query: {status: 5}})
          }
        }
      })
    },
    agreeRushVideo () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/agreeRushVideo`, {demandid: this.query.id, videoid: this.videoid}).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          if (this.isManger || this.isSale) {
            this.$router.push({path: '/makeList', query: {status: 5}})
          } else {
            this.$router.push({path: '/makeUserList', query: {status: 5}})
          }
        }
      })
    },
    onSubmit () {
      if (this.issubmit) return false
      if (this.daynight === '' ||
      this.scene === '' ||
      this.photography === '' ||
      this.fieldofview === '' ||
      this.seconds === '' ||
      this.pictures === '' ||
      this.actorsline === '') {
        this.$vux.toast.text('必填项不能为空', 'middle')
        return false
      }
      let params = {
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
        memo: this.memo
      }
      if (this.fenjingId !== 0) params.id = this.fenjingId
      console.log(params);
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/addStoryBoard`, params).then(res => {
        let data = res.data
        this.$vux.toast.text(data.error, 'middle')
        this.getData()
        this.isAddFenJing = false
        this.issubmit = false
      })
    },
    handleExamine (id) {
      this.showExamine = true
      if (id) this.id = id
    },
    closeModal () {
      this.showExamine = false
      this.reason = ''
    },
    submitModal () {
      if (this.reason === '') {
        this.$vux.toast.text('请填写审批意见', 'middle')
        return false
      }
      let params = {id: this.id, checkresult: this.reason}
      if (this.status === 5 || this.status === 6) {
        params.type = 'rushvideo'
        params.videoid = this.videoid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/checkStoryBoard`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          this.closeModal()
          if (this.status === 4) {
            this.getData()
          } else {
            this.getData4()
          }
        }
      })
    },
    submitExamine () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/submitCensor`, {demandid: this.query.id, version: this.version}).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          this.getData()
        }
      })
    },
    backModify () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/demands/reworkStoryBoard`, {demandid: this.query.id, version: this.version}).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          this.getData()
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.$util.setUserRole(this)
      if (this.loginUser) {
        this.query = this.$route.query
        this.tableData = []
        this.fileList = []
        this.playerOptions = []
        this.isAddFenJing = false
        this.issubmit = false
        this.$vux.loading.show()
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
  .videobox{
    width: 50%;
    margin: auto;
  }
}
</style>
