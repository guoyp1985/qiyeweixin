<template lang="html">
  <div class="bg-white font14 fenjing-list-page">
    <div class="vux-tab-wrap">
      <span>分镜脚本</span>
      <div style="position:absolute;left:10px;top:0;bottom:0;" class="flex_left">
        <el-button @click="toBack" type="info" size="small" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <div class="s-container scroll-container mb20" style="top:44px;">
      <template v-if="disTabData">
        <div class="flex_left padding10" v-if="versionData.length">
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
          :row-class-name="tableRowClassName"
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
              label="日外/夜内"
              min-width="100">
              <template slot-scope="scope">
                <el-input v-if="storyData.canedit" v-model="scope.row.daynight" placeholder="必填,日外/夜内"></el-input>
                <div v-else>{{scope.row.daynight}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="场景"
              min-width="100">
              <template slot-scope="scope">
                <el-input v-if="storyData.canedit" v-model="scope.row.scene" placeholder="必填,场景"></el-input>
                <div v-else>{{scope.row.scene}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="拍摄手法"
              min-width="100">
              <template slot-scope="scope">
                <el-input v-if="storyData.canedit" v-model="scope.row.photography" placeholder="必填,拍摄手法"></el-input>
                <div v-else>{{scope.row.photography}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="景别"
              min-width="100">
              <template slot-scope="scope">
                <el-input v-if="storyData.canedit" v-model="scope.row.fieldofview" placeholder="必填,景别"></el-input>
                <div v-else>{{scope.row.fieldofview}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            :label="viewData.title"
            min-width="100">
            <el-table-column
              label="时长"
              min-width="100">
              <template slot-scope="scope">
                <el-input v-if="storyData.canedit" v-model="scope.row.seconds" placeholder="必填,时长"></el-input>
                <div v-else>{{scope.row.seconds}}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="画面描述"
              min-width="200">
              <template slot-scope="scope">
                <div class="page-table">
                  <div class="tr">
                    <div class="td">人物</div>
                    <div class="td">
                      <el-input v-if="storyData.canedit" type="textarea" v-model="scope.row.renwu" placeholder="必填,人物描述"></el-input>
                      <div v-else>{{scope.row.renwu}}</div>
                    </div>
                  </div>
                  <div class="tr">
                    <div class="td">情节</div>
                    <div class="td">
                      <el-input v-if="storyData.canedit" type="textarea" v-model="scope.row.qingjie" placeholder="必填,情节描述"></el-input>
                      <div v-else>{{scope.row.qingjie}}</div>
                    </div>
                  </div>
                  <div class="tr">
                    <div class="td">动作</div>
                    <div class="td">
                      <el-input v-if="storyData.canedit" type="textarea" v-model="scope.row.dongzuo" placeholder="必填,动作描述"></el-input>
                      <div v-else>{{scope.row.dongzuo}}</div>
                    </div>
                  </div>
                </div>
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
                <div class="page-table">
                  <div class="tr">
                    <div class="td">情绪</div>
                    <div class="td">
                      <el-input v-if="storyData.canedit" type="textarea" v-model="scope.row.qingxu" placeholder="必填,情绪"></el-input>
                      <div v-else>{{scope.row.qingxu}}</div>
                    </div>
                  </div>
                  <div class="tr">
                    <div class="td">语速</div>
                    <div class="td">
                      <el-input v-if="storyData.canedit" type="textarea" v-model="scope.row.yusu" placeholder="必填,语速"></el-input>
                      <div v-else>{{scope.row.yusu}}</div>
                    </div>
                  </div>
                  <div class="tr">
                    <div class="td">台词</div>
                    <div class="td">
                      <el-input v-if="storyData.canedit" type="textarea" v-model="scope.row.taici" placeholder="必填,台词"></el-input>
                      <div v-else>{{scope.row.taici}}</div>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            :label="ratioOptions[viewData.ratio]"
            min-width="100">
            <el-table-column
              label="服装道具"
              min-width="120">
                <template slot-scope="scope">
                  <el-input v-if="storyData.canedit" v-model="scope.row.costumes" placeholder="请输入服装道具"></el-input>
                  <div v-else>{{scope.row.costumes}}</div>
                </template>
            </el-table-column>
            <el-table-column
              label="后期制作"
              min-width="120">
                <template slot-scope="scope">
                  <el-input v-if="storyData.canedit" v-model="scope.row.postproduction" placeholder="请输入后期制作"></el-input>
                  <div v-else>{{scope.row.postproduction}}</div>
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
                  <el-input v-if="storyData.canedit" v-model="scope.row.memo" placeholder="请输入备注"></el-input>
                  <div v-else>{{scope.row.memo}}</div>
                </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            :label="viewData.demandno"
            min-width="100">
            <el-table-column
              v-if="!isSupplier"
              label="客户意见"
              min-width="200">
                <template slot-scope="scope" v-if="scope.row.dataType != 'add'">
                  <template v-if="storyData.cancheck && isCustomer">
                    <el-input @input="adviceChangeEvent" type="textarea" v-model="scope.row.customeradvice" placeholder="请输入客户意见"></el-input>
                  </template>
                  <template v-else>
                    <template v-if="!scope.row.customeradvice || scope.row.customeradvice == ''">无</template>
                    <template v-else>{{scope.row.customeradvice}}</template>
                  </template>
                </template>
            </el-table-column>
            <el-table-column
              v-if="isManager || isSale || isSupplier"
              label="审核意见"
              min-width="200">
                <template slot-scope="scope" v-if="scope.row.dataType != 'add'">
                  <template v-if="storyData.cancheck">
                    <el-input @input="resultChangeEvent" type="textarea" v-model="scope.row.checkresult" placeholder="请输入审核意见"></el-input>
                  </template>
                  <template v-else>
                    <template v-if="!scope.row.checkresult || scope.row.checkresult == ''">无</template>
                    <template v-else>{{scope.row.checkresult}}</template>
                  </template>
                </template>
            </el-table-column>
          </el-table-column>
            <el-table-column
              v-if="storyData.canedit || storyData.canzhuan || storyData.canzhuanvideo || storyData.cancheckvideo"
              label="操作"
              min-width="160">
              <template slot-scope="scope">
                <template v-if="scope.row.dataType == 'add'">
                  <el-button type="primary" size="mini" @click="addEvent(scope.row)">新增</el-button>
                </template>
                <template v-else-if="!storyData.canback">
                  <template v-if="storyData.canedit">
                    <div>
                      <el-button type="primary" size="mini" @click="addEvent(scope.row)">保存修改</el-button>
                    </div>
                    <div class="mt5">
                      <el-button type="danger" size="mini" @click="deleteEvent(scope.row)">删除</el-button>
                    </div>
                    <div class="mt5">
                      <el-button type="warning" size="mini" @click="moveEvent(scope.row, 'up')" v-if="scope.row.rowIndex > 0">上移</el-button>
                      <el-button type="warning" size="mini" @click="moveEvent(scope.row, 'down')" v-if="scope.row.rowIndex < tableData.length - 2">下移</el-button>
                    </div>
                  </template>
                  <el-button v-if="storyData.canzhuan" type="primary" size="mini" @click="handleExamine(scope.row.id, 'trans', scope.row)">转交供应商</el-button>
                  <el-button v-if="storyData.canzhuanvideo" type="primary" size="mini" @click="handleExamine(scope.row.id, 'trans', scope.row)">转发客户意见</el-button>
                  <el-button v-if="storyData.cancheckvideo" type="primary" size="mini" @click="handleExamine(scope.row.id)">修改建议</el-button>
                </template>
              </template>
            </el-table-column>
        </el-table>
        <div class="align_center mt20" v-if="controlBtn.length">
          <el-button v-for="(item,index) in controlBtn" :key="index" :type="item.type" @click="buttonEvent(item.id)">{{item.title}}</el-button>
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
      <div class="mt20" v-if="showPhotoSwiper && viewData.videophotos_arr && viewData.videophotos_arr.length">
        <swiper
          class="pic-swiper"
          dots-position="center"
          :interval=6000
          :show-dots="viewData.videophotos_arr && viewData.videophotos_arr.length > 1"
          :aspect-ratio="1/1"
          loop>
          <swiper-item v-for="(item,index) in viewData.videophotos_arr" :key="index">
            <img class="db imgcover w_100 h_100" :src="item" default-src="https://tossharingsales.boka.cn/images/nopic.jpg" @click="showBigimg1(index)" />
          </swiper-item>
        </swiper>
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
import {Swiper, SwiperItem} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {Swiper, SwiperItem},
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
      showReason: '请输入审核意见',
      ratioOptions: '',
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
      fenjingId: 0,
      playerOptions: [],
      status: 0,
      fileList: [],
      isManager: false, // 1:管理员
      isSale: false, // 4:业务员
      isCustomer: false, // 2:客户
      isSupplier: false, // 3:供应商
      isInvitor: false, // 被邀请者
      versionData: [],
      curVersion: '',
      storyData: {},
      controlBtn: [],
      viewData: {},
      disCensorBtn: true,
      showPhotoSwiper: false,
      listData: [],
      submitData: {},
      issubmit: false,
      haveResult: false,
      haveAdvice: false
    }
  },
  methods: {
    toBack () {
      window.history.go(-1)
    },
    handleBtn () {
      // 1. canedit=1，行里的修改，下面的新增，提交审核
      // 2. canback==1，行里没有，下面的撤回审核
      // 3. cancheck=1，行里的审核，下面的返回修改，审核通过。
      // 4. canzhuan==1,行里”转交供应商”，下面，返回修改。
      this.controlBtn = []
      if (this.storyData.canedit && this.isSupplier) {
        // this.controlBtn.push({id: 1, title: '新增', type: 'success'})
        this.controlBtn.push({id: 2, title: '提交审核', type: 'primary'})
      }
      if (this.storyData.canback) {
        this.controlBtn.push({id: 3, title: '撤回审核', type: 'primary'})
      }
      if (this.storyData.canrework) {
        this.controlBtn.push({id: 4, title: '返回修改', type: 'info'})
      }
      if (this.storyData.cantongguo && this.disCensorBtn) {
        this.controlBtn.push({id: 5, title: '审核通过', type: 'primary'})
      }
      if (this.storyData.cansubmit) {
        if (this.isManager || this.isSale) {
          if (!this.haveResult) {
            this.controlBtn.push({id: 6, title: '提交客户', type: 'primary'})
          }
        } else if (this.isCustomer) {
          if (!this.haveAdvice) {
            this.controlBtn.push({id: 9, title: '审核通过', type: 'primary'})
          }
        }
      }
      if (this.storyData.cancheckphoto) {
        this.controlBtn.push({id: 7, title: '审核照片', type: 'primary'})
      }
      if (this.storyData.canapply && !this.haveResult && !this.haveAdvice) {
        this.controlBtn.push({id: 8, title: '申请修改', type: 'success'})
      }
    },
    buttonEvent (id) {
      switch (id) {
        case 1:
          // 新增 storyData.canedit
          this.addFenJing()
          break
        case 2:
          // 提交审核 storyData.canedit && this.isSupplier
          this.submitExamine()
          break
        case 3:
          // 撤回审核 storyData.canback
          this.backCensor()
          break
        case 4:
          // 返回修改 storyData.canrework
          this.backModify()
          break
        case 5:
          // 审核通过 storyData.cantongguo
          this.agreeRushVideo()
          break
        case 6:
          // 提交客户 storyData.cansubmit && (this.isManager || this.isSale)
          this.submitToCustomer()
          break
        case 9:
          // 审核通过 storyData.cansubmit && isCustomer
          this.censorEvent()
          break
        case 7:
          // 审核通过 storyData.cancheckphoto
          this.showPhotoSwiper = true
          break
        case 8:
          // 申请修改 storyData.canapply
          this.applyChange()
          break
      }
    },
    versionChange () {
      this.getData()
    },
    resultChangeEvent () {
      let isempty = true
      for (let i = 0; i < this.tableData.length; i++) {
        let curd = this.tableData[i]
        if (this.$util.trim(curd.checkresult) !== '') {
          isempty = false
          break
        }
      }
      if (isempty) {
        this.haveResult = false
      } else {
        this.haveResult = true
      }
      this.handleBtn()
    },
    adviceChangeEvent () {
      let isempty = true
      for (let i = 0; i < this.tableData.length; i++) {
        let curd = this.tableData[i]
        if (this.$util.trim(curd.customeradvice) !== '') {
          isempty = false
          break
        }
      }
      if (isempty) {
        this.haveAdvice = false
      } else {
        this.haveAdvice = true
      }
      this.handleBtn()
    },
    backModify () {
      if (this.issubmit) return false
      this.$confirm('确定要返回修改吗？').then(() => {
        let postData = []
        for (let i = 0; i < this.tableData.length; i++) {
          let curd = this.tableData[i]
          if (this.isCustomer) {
            postData.push({id: curd.id, customeradvice: curd.customeradvice})
          } else {
            postData.push({id: curd.id, checkresult: curd.checkresult})
          }
        }
        this.$vux.loading.show()
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/reworkStoryBoard`, {
          demandid: this.query.id, result: postData
        }).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: 'text',
            time: this.$util.delay(data.error),
            onHide: () => {
              this.issubmit = false
              if (data.flag === 1) {
                this.refresh()
              }
            }
          })
        })
      })
    },
    applyChange () {
      if (this.issubmit) return false
      this.$confirm('确定要修改吗？申请修改后将不能提交供应商返工').then(() => {
        this.$vux.loading.show()
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/applyEdit`, {
          demandid: this.query.id
        }).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: 'text',
            time: this.$util.delay(data.error),
            onHide: () => {
              this.issubmit = false
              if (data.flag === 1) {
                this.refresh()
              }
            }
          })
        })
      })
    },
    backCensor () {
      if (this.issubmit) return false
      this.$confirm('您是否确认撤回提交的审核？').then(() => {
        this.$vux.loading.show()
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/submitCensor`, {
          demandid: this.query.id, version: this.curVersion, isback: 1
        }).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: 'text',
            time: this.$util.delay(data.error),
            onHide: () => {
              this.issubmit = false
              if (data.flag === 1) {
                this.refresh()
              }
            }
          })
        })
      })
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
        }
      })
    },
    getInfo (id) {
      this.$http.post(`${ENV.BokaApi}/api/demands/info`, {id: id}).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.$util.infoSetRole(data.identity, this)
        this.viewData = retdata
        this.viewData.videophotos_arr = []
        if (retdata.videophotos && retdata.videophotos !== '') {
          this.viewData.videophotos_arr = retdata.videophotos.split(',')
        }
        this.status = retdata.status
        if (retdata.video && retdata.video !== '') {
          if (location.href.indexOf('https') < 0) {
            retdata.video = retdata.video.replace(/https/g, 'http')
          }
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
      this.tableData = []
      this.$http.post(`${ENV.BokaApi}/api/demands/getStoryBoard`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          let retdata = data.data ? data.data : data
          this.storyData = data
          for (let i = 0; i < retdata.length; i++) {
            let d = {...retdata[i]}
            if (retdata[i].pictures && retdata[i].pictures !== '') {
              let picturesObject = JSON.parse(retdata[i].pictures)
              d.picturesObject = picturesObject
              d.renwu = picturesObject.renwu
              d.qingjie = picturesObject.qingjie
              d.dongzuo = picturesObject.dongzuo
            }
            if (retdata[i].actorsline && retdata[i].actorsline !== '') {
              let actorslineObject = JSON.parse(retdata[i].actorsline)
              d.actorslineObject = actorslineObject
              d.qingxu = actorslineObject.qingxu
              d.yusu = actorslineObject.yusu
              d.taici = actorslineObject.taici
            }
            this.tableData.push(d)
          }
          if (this.storyData.canedit) {
            this.tableData.push({
              dataType: 'add',
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
              picturesObject: {},
              actorslineObject: {},
              renwu: '',
              qingjie: '',
              dongzuo: '',
              qingxu: '',
              yuse: '',
              taici: ''
            })
          }
          this.curVersion = data.version
          this.versionData = this.$util.transSelectOption(data.allversions, 'int')
          this.disTabData = true
          this.handleBtn()
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
          this.storyData = data
          this.tableData = retdata
          this.disTabData = true
          this.handleBtn()
        }
      })
    },
    agreeCensor () {
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/agreeStoryBoard`, {demandid: this.query.id, version: this.curVersion}).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            this.issubmit = false
            if (data.flag === 1) {
              this.refresh()
            }
          }
        })
      })
    },
    submitToCustomer () {
      if (this.issubmit) return false
      this.$confirm('确定要提交到客户审核吗？').then(() => {
        this.agreeCensor()
      })
    },
    censorEvent () {
      if (this.issubmit) return false
      this.$confirm('确定要审核通过吗？').then(() => {
        this.agreeCensor()
      })
    },
    agreeRushVideo () {
      if (this.issubmit) return false
      this.$confirm('确定要审核通过吗？').then(() => {
        this.$vux.loading.show()
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/agreeRushVideo`, {demandid: this.query.id, videoid: this.viewData.videoid}).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: 'text',
            time: this.$util.delay(data.error),
            onHide: () => {
              this.issubmit = false
              if (data.flag === 1) {
                this.refresh()
              }
            }
          })
        })
      })
    },
    tableRowClassName (row) {
      row.row.rowIndex = row.rowIndex
    },
    moveEvent (itemdata, moveType) {
      console.log('in move')
      if (this.issubmit) return false
      let curIndex = itemdata.rowIndex
      let moveIndex = curIndex - 1
      if (moveType === 'down') {
        moveIndex = curIndex + 1
      }
      let moveData = this.tableData[moveIndex]
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/changeOrder`, {id1: itemdata.id, id2: moveData.id}).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            this.issubmit = false
            if (data.flag === 1) {
              this.refresh()
            }
          }
        })
      })
    },
    deleteEvent (itemdata) {
      if (this.issubmit) return false
      this.$confirm('确定要删除该数据吗？').then(() => {
        this.$vux.loading.show()
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/deleteStory`, {id: itemdata.id}).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: 'text',
            time: this.$util.delay(data.error),
            onHide: () => {
              this.issubmit = false
              if (data.flag === 1) {
                this.refresh()
              }
            }
          })
        })
      })
    },
    addEvent (itemdata) {
      if (this.issubmit) return false
      let iscontinue = true
      // let requiredData = ['daynight', 'scene', 'photography', 'fieldofview', 'seconds', 'pictures', 'actorsline']
      let requiredData = ['daynight', 'scene', 'photography', 'fieldofview', 'seconds']
      for (let i = 0; i < requiredData.length; i++) {
        let curName = requiredData[i]
        if (this.$util.trim(itemdata[curName]) === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      let renwu = itemdata.renwu
      let qingjie = itemdata.qingjie
      let dongzuo = itemdata.dongzuo
      let qingxu = itemdata.qingxu
      let yusu = itemdata.yusu
      let taici = itemdata.taici
      if (this.$util.trim(renwu) === '' || this.$util.trim(qingjie) === '' || this.$util.trim(dongzuo) === '') {
        this.$vux.toast.text('请完善画面描述', 'middle')
        return false
      }
      if (this.$util.trim(qingxu) === '' || this.$util.trim(yusu) === '' || this.$util.trim(taici) === '') {
        this.$vux.toast.text('请完善台词/解说词', 'middle')
        return false
      }
      let picturesObject = {renwu: itemdata.renwu, qingjie: itemdata.qingjie, dongzuo: itemdata.dongzuo}
      let actorslineObject = {qingxu: itemdata.qingxu, yusu: itemdata.yusu, taici: itemdata.taici}
      let postData = {
        demandid: this.query.id,
        daynight: itemdata.daynight,
        scene: itemdata.scene,
        photography: itemdata.photography,
        fieldofview: itemdata.fieldofview,
        seconds: itemdata.seconds,
        pictures: JSON.stringify(picturesObject),
        actorsline: JSON.stringify(actorslineObject),
        costumes: itemdata.costumes,
        postproduction: itemdata.postproduction,
        memo: itemdata.memo
      }
      if (itemdata && itemdata.id) {
        postData.id = itemdata.id
      }
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/addStoryBoard`, postData).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error),
          onHide: () => {
            this.issubmit = false
            if (data.flag === 1) {
              this.refresh()
            }
          }
        })
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
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/addStoryBoard`, params).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            this.issubmit = false
            if (data.flag === 1) {
              this.refresh()
            }
          }
        })
      })
    },
    handleExamine (id, type, item) {
      if (type === 'trans' && item.customeradvice && item.customeradvice !== '') {
        this.reason = `【客户意见】${item.customeradvice}`
      }
      this.showExamine = true
      if (id) this.id = id
    },
    closeModal () {
      this.showExamine = false
      this.reason = ''
    },
    submitModal () {
      if (this.issubmit) return false
      if (this.reason === '') {
        this.$vux.toast.text('请填写审核意见', 'middle')
        return false
      }
      let params = {id: this.id, checkresult: this.reason}
      if (this.status === 5 || this.status === 6) {
        params.type = 'rushvideo'
        params.videoid = this.viewData.videoid
      }
      this.$vux.loading.show()
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/checkStoryBoard`, params).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: 'text',
          time: this.$util.delay(data.error),
          onHide: () => {
            this.issubmit = false
            if (data.flag === 1) {
              this.refresh()
            }
          }
        })
        // if (data.flag) {
        //   this.$vux.loading.hide()
        //   this.closeModal()
        //   this.disCensorBtn = false
        //   if (this.status === 4) {
        //     this.getData()
        //   } else {
        //     this.getData4()
        //   }
        // }
      })
    },
    submitExamine () {
      if (this.issubmit) return false
      this.$confirm('您是否确认提交审核？提交审核以后将不能再修改。').then(() => {
        this.$vux.loading.show()
        this.issubmit = true
        this.$http.post(`${ENV.BokaApi}/api/demands/submitCensor`, {demandid: this.query.id, version: this.curVersion}).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: 'text',
            time: this.$util.delay(data.error),
            onHide: () => {
              this.issubmit = false
              if (data.flag === 1) {
                this.refresh()
              }
            }
          })
        })
      })
    },
    initData () {
      this.curVersion = ''
      this.disTabData = false
      this.tableData = []
      this.fileList = []
      this.playerOptions = []
      this.isAddFenJing = false
      this.issubmit = false
    },
    refresh () {
      this.loginUser = User.get()
      this.$util.setUserRole(this)
      if (this.loginUser) {
        this.query = this.$route.query
        this.initData()
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

  .pic-swiper{box-sizing: border-box;width:100%;}
  .pic-swiper:after{content:"";padding-top:80%;display:block;}
  .pic-swiper .vux-swiper{
    position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
  }

  .page-table{
    width:100%;
    .tr{
      display:flex;
      .td{display:flex;justify-content:center;align-items:center;text-align:left;}
      .td:nth-child(1){padding-right:10px;}
      .td:nth-child(2){flex:1;}
    }
    .tr:not(:first-child){margin-top:10px;}
  }
}
</style>
