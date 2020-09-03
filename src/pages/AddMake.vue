<template>
  <div class="bg-white font14 add-make-page">
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
       <td class="title">视频类型<span>*</span></td>
       <td>
         <el-select v-model="videotype" placeholder="请选择视频类型">
           <el-option
              v-for="item in videotypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
          </el-select>
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
     <tr v-if="isManger">
       <td class="title">选择客户</td>
       <td colspan="3" class="align_left">
         <div class="padding10">
           <div v-if="selectedCustomer" @click="clickCustomer">{{selectedCustomer.linkman}}</div>
           <el-button v-else type="primary" size="small" @click="clickCustomer">选择客户</el-button>
         </div>
       </td>
     </tr>
     <tr v-if="isManger && !isSale">
       <td class="title">选择业务员</td>
       <td colspan="3" class="align_left">
         <div class="padding10">
           <div v-if="selectedSale" @click="clickSale">{{selectedSale.linkman}}</div>
           <el-button v-else type="primary" size="small" @click="clickSale">选择业务员</el-button>
         </div>
       </td>
     </tr>
     <tr>
       <td class="title">上传附件</td>
       <td colspan="3" class="align_left">
         <div class="align_left padding10" style="display:inline-block;">
            <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadApi"
            :headers="uploadHeaders"
            :multiple="1 == 1"
            name="photo"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-success="afterUpload"
            :file-list="fileList"
            :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" v-if="disUploadBtn">上传文件</el-button>
            </el-upload>
        </div>
       </td>
     </tr>
     <tr>
       <td class="title">相关链接</td>
       <td colspan="3">
         <el-input v-model="linkurl" placeholder="请输入相关链接"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">客户诉求</td>
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
       <td class="title">产品卖点<span class="font12 color-gray5">（核心卖点需标注）</span></td>
       <td colspan="3">
         <el-input type="textarea" v-model="sellerpoint" placeholder="请输入产品卖点"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">视频内必须展示的关键信息</td>
       <td colspan="3">
         <el-input type="textarea" v-model="keyinfo" placeholder="请输入关键信息"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">创意思路</td>
       <td colspan="3">
         <el-input type="textarea" v-model="customeridea" placeholder="请输入创意思路"></el-input>
       </td>
     </tr>
     <tr>
       <td class="title">特殊备注</td>
       <td>
         <el-input v-model="otherdemand" placeholder="请输入特殊备注"></el-input>
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
   <el-dialog class="addmake-dialog" title="选择客户" :visible.sync="showCustomerDialog">
     <template v-if="disCustomerList">
      <template v-if="customerData.length">
        <el-radio-group v-model="selectedCustomerUid" size="small">
          <el-radio v-for="(item,index) in customerData" :key="item.uid" :label="item.uid">{{item.linkman}}</el-radio>
        </el-radio-group>
      </template>
      <div v-else>暂无客户</div>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showCustomerDialog = false">取 消</el-button>
      <el-button type="primary" @click="submitCustomer">确 定</el-button>
    </span>
   </el-dialog>
   <el-dialog class="addmake-dialog" title="选择业务员" :visible.sync="showSaleDialog">
     <template v-if="disSaleList">
      <template v-if="saleData.length">
        <el-radio-group v-model="selectedSaleUid" size="small">
          <el-radio v-for="(item,index) in saleData" :key="item.uid" :label="item.uid">{{item.linkman}}</el-radio>
        </el-radio-group>
      </template>
      <div v-else>暂无业务员</div>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showSaleDialog = false">取 消</el-button>
      <el-button type="primary" @click="submitSale">确 定</el-button>
    </span>
   </el-dialog>
  </div>
</template>
<script>
import ENV from 'env'
import {User, Token} from '#/storage'
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
      customeridea: '',
      durationOptions: [],
      ratioOptions: [],
      videoclassOptions: [],
      logo_allOptions: [],
      logo_endOptions: [],
      videotypeOptions: [],
      issubmit: false,
      uploadApi: ENV.BokaApi + '/api/upload/singleFile?field=photo',
      uploadHeaders: {},
      fileList: [],
      disUploadBtn: false,
      viewData: {},
      isManger: false, // 1:管理员
      isSale: false, // 4:业务员
      isCustomer: false, // 2:客户
      isSupplier: false, // 3:供应商
      showCustomerDialog: false,
      showSaleDialog: false,
      customerData: [],
      saleData: [],
      disCustomerList: false,
      disSaleList: false,
      limit: 20,
      customerPageStart: 0,
      salePageStart: 0,
      selectedCustomerUid: 0,
      selectedSaleUid: 0,
      selectedCustomer: null,
      selectedSale: null,
      customerObject: {},
      saleObject: {}
    }
  },
  methods: {
    clickCustomer () {
      this.showCustomerDialog = true
      if (!this.customerData.length) {
        this.$http.post(`${ENV.BokaApi}/api/user/getList`, {
          groupid: 2, pageStart: this.customerPageStart, limit: this.limit
        }).then(res => {
          const data = res.data
          if (data.flag) {
            const retdata = data.data
            for (let i = 0; i < retdata.length; i++) {
              this.customerObject[retdata[i].uid] = retdata[i]
            }
            this.customerData = this.customerData.concat(retdata)
            this.disCustomerList = true
          }
        })
      }
    },
    clickSale () {
      this.showSaleDialog = true
      if (!this.saleData.length) {
        this.$http.post(`${ENV.BokaApi}/api/user/getList`, {
          groupid: 4, pageStart: this.salePageStart, limit: this.limit
        }).then(res => {
          const data = res.data
          if (data.flag) {
            const retdata = data.data
            for (let i = 0; i < retdata.length; i++) {
              this.saleObject[retdata[i].uid] = retdata[i]
            }
            this.saleData = this.customerData.concat(retdata)
            this.disSaleList = true
          }
        })
      }
    },
    submitCustomer () {
      if (!this.selectedCustomerUid || this.selectedCustomerUid === '') {
        this.$vux.toast.text('请选择客户', 'middle')
        return false
      }
      this.selectedCustomer = this.customerObject[this.selectedCustomerUid]
      this.showCustomerDialog = false
    },
    submitSale () {
      if (!this.selectedSaleUid || this.selectedSaleUid === '') {
        this.$vux.toast.text('请选择业务员', 'middle')
        return false
      }
      this.selectedSale = this.saleObject[this.selectedSaleUid]
      this.showSaleDialog = false
    },
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
          for (let i in retdata.videotype) {
            let item = {value: i, label: retdata.videotype[i]}
            this.videotypeOptions.push(item)
          }
        }
      })
    },
    onSubmit () {
      if (this.issubmit) return false
      let params = {title: this.title, starttime: this.starttime, endtime: this.endtime, duration: this.duration, ratio: this.ratio, videoclass: this.videoclass, logo_all: this.logo_all, logo_end: this.logo_end, price: this.price, videocount: this.videocount, videotype: this.videotype}
      if (this.brand !== '') params.brand = this.brand
      if (this.product !== '') params.product = this.product
      if (this.target !== '') params.target = this.target
      if (this.linkurl !== '') params.linkurl = this.linkurl
      if (this.customerdemand !== '') params.customerdemand = this.customerdemand
      if (this.customerinfo !== '') params.customerinfo = this.customerinfo
      if (this.productorientation !== '') params.productorientation = this.productorientation
      if (this.sellerpoint !== '') params.sellerpoint = this.sellerpoint
      if (this.keyinfo !== '') params.keyinfo = this.keyinfo
      if (this.otherdemand !== '') params.otherdemand = this.otherdemand
      if (this.customeridea !== '') params.customeridea = this.customeridea
      if (this.isManger || this.isSale) {
        if (!this.selectedCustomerUid) {
          this.$vux.toast.text('请选择客户', 'middle')
          return false
        }
      }
      let attachment = []
      for (let i = 0; i < this.fileList.length; i++) {
        let cur = this.fileList[i]
        if (cur.response && cur.response.flag) {
          attachment.push(cur.name)
        }
      }
      if (attachment.length) params.attachment = attachment.join(',')
      var rule1 = /^(0+)|[^\d]+/g
      if (this.title === '' || this.starttime === '' || this.endtime === '' || this.duration === '' || this.ratio === '' || this.videoclass === '' ||
    this.logo_all === '' || this.logo_end === '' || this.videotype === '') {
        this.$vux.toast.text('必填项不能为空', 'middle')
        return false
      }
      if (this.endtime <= this.starttime) {
        this.$vux.toast.text('交付日期必须大于立项日期', 'middle')
        return false
      }
      if (this.price !== '' && (isNaN(this.price) || parseFloat(this.price) < 0 || parseFloat(this.price).length > 7)) {
        this.$vux.toast.text('请输入正确的制作价格', 'middle')
        return false
      }
      if (this.videocount !== '' && (isNaN(this.videocount) || parseInt(this.videocount) < 0 || rule1.test(this.videocount))) {
        this.$vux.toast.text('请输入正确的视频数量', 'middle')
        return false
      }
      this.issubmit = true
      this.$http.post(`${ENV.BokaApi}/api/demands/add`, params).then(res => {
        let data = res.data
        this.$vux.toast.text(data.error, 'middle')
        if (this.isCustomer) {
          this.$router.push({path: '/makeUserList'})
        } else {
          this.$router.push({path: '/makeList'})
        }
        this.issubmit = false
      })
    },
    handleUploadBtn (fileList) {
      let isDis = false
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (!cur.issuccess) {
          isDis = true
          break
        }
      }
      this.disUploadBtn = isDis
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.handleUploadBtn(fileList)
    },
    handleChange (file, fileList) {
      this.handleUploadBtn(fileList)
    },
    afterUpload (res, file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        let cur = fileList[i]
        if (cur.response && cur.response.flag) {
          cur.name = cur.response.data
          cur.issuccess = true
          cur.url = cur.response.data
        }
      }
      this.fileList = fileList
      this.handleUploadBtn(fileList)
    },
    refresh () {
      this.loginUser = User.get()
      this.$util.setUserRole(this)
      let token = Token.get()
      this.uploadHeaders.Authorization = `Bearer ${token.token}`
      if (this.loginUser) {
        this.durationOptions = []
        this.ratioOptions = []
        this.videoclassOptions = []
        this.logo_allOptions = []
        this.logo_endOptions = []
        this.videotypeOptions = []
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
        this.customeridea = ''
        this.issubmit = false
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
.add-make-page{
  padding:10px;box-sizing: border-box;
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
.addmake-dialog{
  .el-dialog__body{padding:10px;}
  .el-radio-group{display:block;}
  .el-radio{display:block;margin-right:0;margin-left:0 !important;padding:5px 0;}
  .el-radio-group .el-radio:not(:last-child){margin-bottom:5px;}
}
</style>
