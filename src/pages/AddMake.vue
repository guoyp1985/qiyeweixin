<template>
  <div class="bg-page font14 user-list-page">
   <table class="add-make-list bg-white">
     <tr>
       <th colspan="4" class="align_center font20 padding15">制作需求单</th>
     </tr>
     <tr>
       <td class="title">项目名称<span>*</span></td>
       <td colspan="3">
         <el-input v-model="title" placeholder="请输入项目名称"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">品牌名称</td>
       <td>
         <el-input v-model="brand" placeholder="请输入品牌名称"></el-input>
       </td>
       <td class="title">视频类型</td>
       <td>
         <el-input v-model="videotype" placeholder="请输入视频类型"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">产品名称</td>
       <td>
         <el-input v-model="product" placeholder="请输入产品名称"></el-input>
       </td>
       <td class="title">效果目标</td>
       <td>
         <el-input v-model="target" placeholder="请输入效果目标"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">视频时长<span>*</span></td>
       <td>
         <el-select v-model="duration" placeholder="请选择视频时长">
           <el-option
              v-for="item in durationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
          </el-select>
        </td>
        <td class="title">视频比例<span>*</span></td>
        <td>
          <el-select v-model="ratio" placeholder="请选择视频比例">
            <el-option
              v-for="item in ratioOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
     </tr>
     <tr>
       <td class="title">视频数量</td>
       <td>
         <el-input v-model="videocount" placeholder="请输入视频数量"></el-input>
       </td>
       <td class="title">视频分类<span>*</span></td>
       <td>
         <el-select v-model="videoclass" placeholder="请选择视频分类">
            <el-option
              v-for="item in videoclassOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
     <tr>
       <td class="title">立项日期<span>*</span></td>
       <td>
         <el-date-picker
            v-model="starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择立项日期">
          </el-date-picker>
        </td>
        <td class="title">交付日期<span>*</span></td>
        <td>
          <el-date-picker
            v-model="endtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择交付日期">
          </el-date-picker>
        </td>
      </tr>
    <tr>
      <td class="title">全片LOGO<span>*</span></td>
      <td>
        <el-select v-model="logo_all" placeholder="请选择全片LOGO">
          <el-option
            v-for="item in logo_allOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </td>
      <td class="title">片尾LOGO<span>*</span></td>
      <td>
        <el-select v-model="logo_end" placeholder="请选择片尾LOGO">
          <el-option
            v-for="item in logo_endOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </td>
     </tr>
     <tr>
       <td class="title">相关链接</td>
       <td colspan="3">
         <el-input v-model="linkurl" placeholder="请输入相关链接"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">客户投诉</td>
       <td colspan="3">
         <el-input v-model="customerdemand" placeholder="请输入投诉内容"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">客户信息</td>
       <td colspan="3">
         <el-input v-model="customerinfo" placeholder="请输入客户信息"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">产品定位</td>
       <td colspan="3"><el-input v-model="productorientation" placeholder="请输入产品定位"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">产品买点<span class="font12 color-gray5">（核心买点需标注）</span></td>
       <td colspan="3">
         <el-input type="textarea" v-model="sellerpoint" placeholder="请输入产品买点"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">视频内必须展示的关键信息</td>
       <td colspan="3">
         <el-input type="textarea" v-model="keyinfo" placeholder="请输入关键信息"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">其他要求</td>
       <td>
         <el-input v-model="otherdemand" placeholder="请输入其他要求"></el-input>
       </td>
       <td>制作价格</td>
       <td>
         <el-input v-model="price" placeholder="请输入制作价格"></el-input>
       </td>
     </tr>
     <tr>
       <td class="padding10" colspan="4">
         <el-button type="primary" @click="onSubmit">立即提交</el-button>
       </td>
     </tr>
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
      logo_endOptions: [],
      issubmit: false
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/demands/fieldsList`).then(res => {
        const data = res.data
        if (data.flag) {
          this.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          for (let i in retdata.duration) {
            let item = {value: parseInt(i), label: retdata.duration[i]}
            this.durationOptions.push(item)
          }
          for (let i in retdata.ratio) {
            let item = {value: parseInt(i), label: retdata.ratio[i]}
            this.ratioOptions.push(item)
          }
          for (let i in retdata.videoclass) {
            let item = {value: parseInt(i), label: retdata.videoclass[i]}
            this.videoclassOptions.push(item)
          }
          for (let i in retdata.logo_all) {
            let item = {value: parseInt(i), label: retdata.logo_all[i]}
            this.logo_allOptions.push(item)
          }
          for (let i in retdata.logo_end) {
            let item = {value: parseInt(i), label: retdata.logo_end[i]}
            this.logo_endOptions.push(item)
          }
        }
      })
    },
    getInfo (id) {
      this.$http.post(`${ENV.BokaApi}/api/demands/info`, {id: id}).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.title = retdata.title
        this.brand = retdata.brand
        this.videotype = retdata.videotype
        this.product = retdata.product
        this.target = retdata.target
        this.videocount = retdata.videocount
        this.linkurl = retdata.linkurl
        this.customerdemand = retdata.customerdemand
        this.customerinfo = retdata.customerinfo
        this.productorientation = retdata.productorientation
        this.sellerpoint = retdata.sellerpoint
        this.keyinfo = retdata.keyinfo
        this.otherdemand = retdata.otherdemand
        this.price = retdata.price
        this.starttime = new Date(retdata.starttime * 1000)
        this.endtime = new Date(retdata.endtime * 1000)
        this.duration = retdata.duration
        this.ratio = retdata.ratio
        this.videoclass = retdata.videoclass
        this.logo_all = retdata.logo_all
        this.logo_end = retdata.logo_end
      })
    },
    refresh () {
      this.loginUser = User.get()
      if (this.loginUser) {
        this.query = this.$route.query
        console.log(this.query);
        this.durationOptions = []
        this.ratioOptions = []
        this.videoclassOptions = []
        this.logo_allOptions = []
        this.logo_endOptions = []
        this.title = ''
        this.brand = ''
        this.videotype = ''
        this.product = ''
        this.target = ''
        this.videocount = ''
        this.linkurl = ''
        this.customerdemand = ''
        this.customerinfo = ''
        this.productorientation = ''
        this.sellerpoint = ''
        this.keyinfo = ''
        this.otherdemand = ''
        this.price = ''
        this.starttime = ''
        this.endtime = ''
        this.duration = ''
        this.ratio = ''
        this.videoclass = ''
        this.logo_all = ''
        this.logo_end = ''
        this.issubmit = false
        this.$vux.loading.show()
        this.getData()
        if (this.query.id) {
          this.getInfo(this.query.id)
        }
      }
    },
    onSubmit () {
      let params = {title: this.title, starttime: this.starttime, endtime: this.endtime, duration: this.duration, ratio: this.ratio, videoclass: this.videoclass, logo_all: this.logo_all, logo_end: this.logo_end, price: this.price, videocount: this.videocount}
      if (this.brand !== '') params.brand = this.brand
      if (this.videotype !== '') params.videotype = this.videotype
      if (this.product !== '') params.product = this.product
      if (this.target !== '') params.target = this.target
      if (this.linkurl !== '') params.linkurl = this.linkurl
      if (this.customerdemand !== '') params.customerdemand = this.customerdemand
      if (this.customerinfo !== '') params.customerinfo = this.customerinfo
      if (this.productorientation !== '') params.productorientation = this.productorientation
      if (this.sellerpoint !== '') params.sellerpoint = this.sellerpoint
      if (this.keyinfo !== '') params.keyinfo = this.keyinfo
      if (this.otherdemand !== '') params.otherdemand = this.otherdemand
      if (this.query.id) params.id = parseInt(this.query.id)
      var rule1 = /^(0+)|[^\d]+/g
      if (!this.issubmit) {
        if (this.title === '' || this.starttime === '' || this.endtime === '' || this.duration === '' || this.ratio === '' || this.videoclass === '' ||
      this.logo_all === '' || this.logo_end === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
        } else if (this.endtime <= this.starttime) {
          this.$vux.toast.text('交付日期必须大于立项日期', 'middle')
        } else if (this.price !== '' && (isNaN(this.price) || parseFloat(this.price) < 0 || parseFloat(this.price).length > 7)) {
          this.$vux.toast.text('请输入正确的制作价格', 'middle')
        } else if (this.videocount !== '' && (isNaN(this.videocount) || parseInt(this.videocount) < 0 || rule1.test(this.videocount))) {
          this.$vux.toast.text('请输入正确的视频数量', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/demands/add`, params).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.$router.push({path: '/makeList'})
            this.issubmit = false
          })
        }
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
  .add-make-list{
    width: 99.9%;
    text-align: center;
    border-collapse:collapse;
    td{
      border: 1px solid #333;
    }
    .title{
      width: 10%;
      min-width: 80px;
      span{
        color: red;
      }
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
}
</style>
