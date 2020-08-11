<template>
  <div class="bg-page font14 user-list-page">
   <table class="add-make-list bg-white">
     <tr><th colspan="4" class="align_center font20 padding15">制作需求单</th></tr>
     <tr><td class="title">项目名称</td><td colspan="3"><el-input v-model="title" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">品牌名称</td><td><el-input v-model="brand" placeholder="请输入内容"></el-input></td><td class="title">视频类型</td><td><el-input v-model="videotype" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">产品名称</td><td><el-input v-model="product" placeholder="请输入内容"></el-input></td><td class="title">效果目标</td><td><el-input v-model="target" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">视频时长</td><td><el-select v-model="duration" placeholder="请选择">
    <el-option
      v-for="item in durationOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></td><td class="title">视频比例</td><td><el-select v-model="ratio" placeholder="请选择">
    <el-option
      v-for="item in ratioOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></td></tr>
     <tr><td class="title">视频数量</td><td><el-input v-model="videocount" placeholder="请输入内容"></el-input></td><td class="title">视频分类</td><td><el-select v-model="videoclass" placeholder="请选择">
    <el-option
      v-for="item in videoclassOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></td></tr>
     <tr><td class="title">立项日期</td><td><el-date-picker
      v-model="starttime"
      type="date"
      placeholder="选择日期">
    </el-date-picker></td><td class="title">交付日期</td><td><el-date-picker
      v-model="endtime"
      type="date"
      placeholder="选择日期">
    </el-date-picker></td></tr>
    <tr><td class="title">全片LOGO</td><td><el-select v-model="logo_all" placeholder="请选择">
      <el-option
        v-for="item in logo_allOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></td><td class="title">片尾LOGO</td><td><el-select v-model="logo_end" placeholder="请选择">
      <el-option
        v-for="item in logo_endOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></td></tr>
     <tr><td class="title">相关链接</td><td colspan="3"><el-input v-model="linkurl" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">客户投诉</td><td colspan="3"><el-input v-model="customerdemand" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">客户信息</td><td colspan="3"><el-input v-model="customerinfo" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">产品定位</td><td colspan="3"><el-input v-model="productorientation" placeholder="请输入内容"></el-input></td></tr>
     <tr rowspan="2"><td class="title">产品买点（核心买点需标注）</td><td colspan="3"><el-input type="textarea" v-model="sellerpoint" placeholder="请输入内容"></el-input></td></tr>
     <tr rowspan="2"><td class="title">视频内必须展示的关键信息</td><td colspan="3"><el-input type="textarea" v-model="keyinfo" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="title">其他要求</td><td><el-input v-model="otherdemand" placeholder="请输入内容"></el-input></td><td>制作价格</td><td><el-input v-model="price" placeholder="请输入内容"></el-input></td></tr>
     <tr><td class="padding10" colspan="4"><el-button type="primary" @click="onSubmit">立即创建</el-button></td></tr>
   </table>
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
      title: '',
      brand: '',
      videotype: '',
      product: '',
      target: '',
      videocount: '',
      linkurl: '',
      customerdemand: '',
      customerinfo: '',
      productorientation: '',
      sellerpoint: '',
      keyinfo: '',
      otherdemand: '',
      price: '',
      starttime: '',
      endtime: '',
      duration: '',
      ratio: '',
      videoclass: '',
      logo_all: '',
      logo_end: '',
      durationOptions: [],
      ratioOptions: [],
      videoclassOptions: [],
      logo_allOptions: [],
      logo_endOptions: []
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    getData () {
      let params = {pagestart: this.pageStart, limit: this.limit}
      this.$http.post(`${ENV.BokaApi}/api/demands/fieldsList`, params).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          for (let i in retdata.duration) {
            let item = {value: i, label: retdata.duration[i]}
            this.durationOptions.push(item)
          }
          for (let i in retdata.ratio) {
            let item = {value: i, label: retdata.ratio[i]}
            this.ratioOptions.push(item)
          }
          for (let i in retdata.videoclass) {
            let item = {value: i, label: retdata.videoclass[i]}
            this.videoclassOptions.push(item)
          }
          for (let i in retdata.logo_all) {
            let item = {value: i, label: retdata.logo_all[i]}
            this.logo_allOptions.push(item)
          }
          for (let i in retdata.logo_end) {
            let item = {value: i, label: retdata.logo_end[i]}
            this.logo_endOptions.push(item)
          }
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
        this.durationOptions = []
        this.ratioOptions = []
        this.videoclassOptions = []
        this.logo_allOptions = []
        this.logo_endOptions = []
        this.$vux.loading.show()
        this.getData()
      }
    },
    onSubmit () {

    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.user-list-page{
  .add-make-list{
    width: 100%;
    text-align: center;
    border-collapse:collapse;
    td{
      border: 1px solid #333;
    }
    .title{
      width: 10%;
      max-width: 100px;
    }
    .el-select{
      width: 100%;
    }
    .el-input__inner,.el-textarea__inner{
      border: none !important;
    }
  }
}
</style>
