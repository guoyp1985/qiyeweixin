<template>
    <div class="bg-white">
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
           <el-button type="primary" @click="onSubmit">立即提交</el-button>
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
      memo: ''
    }
  },
  methods: {
    onSubmit () {
      console.log(parseInt(this.query.id));
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
            memo: this.memo
          }).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.$router.push({path: '/fenJing', query: {id: this.query.id}})
            this.issubmit = false
          })
        }
      }
    },
    refresh () {
      this.loginUser = User.get()
      if (this.loginUser) {
        this.query = this.$route.query
        this.issubmit = false
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
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
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
</style>
