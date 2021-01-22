/*
* @description: 注册页面
* @auther: gyp
* @created_date: 2021-01-21
*/
<style lang="less">
.register-page{
  width:100%;height:100%;background-color:#F2F3F7;padding-top:20px;box-sizing: border-box;
  .register-inner{width:600px;background-color:#fff;padding:20px;box-sizing:border-box;margin:0 auto;}

  .big-title{font-size:30px;color:#5889ec;padding-bottom: 10px;margin-bottom: 40px;text-align:center;}
  .form-list .form-item {
      margin-bottom: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  }
  .form-list .title-cell {
      width: 100px;
      box-sizing: border-box;
      font-weight: bold;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  .form-list .input-cell {
      flex: 1;
      overflow: hidden;
  }
  .form-list input[type=text] {
      width: 100%;
      height: 34px;
      padding: 0 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: none;
      outline: none;
  }

  .btn-submit{
      border-radius:5px;
      background-color: #ff0036;
      border: 1px solid #ff0036;
      color: #fff;
      width: 178px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-size: 16px;
      margin:0 auto;
  }
  .r-address .vux-popup-picker-select{text-align:left !important;}
}
</style>
<template>
  <div class="register-page">
    <div class="register-inner">
        <div class="big-title">注册信息</div>
        <div class="form-list register-area">
            <div class="form-item flex_left">
                <div class="title-cell">公司名称</div>
                <div class="input-cell">
                    <input v-model="submitData.title" class="post-input" name="title" type="text" placeholder="公司名称" />
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">营业执照</div>
                <div class="input-cell">
                    <input v-model="submitData.yyzz" type="hidden" name="photo" />
                    <form enctype="multipart/form-data">
                      <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
                    </form>
                    <div class="q_photolist align_left">
                      <template v-if="photoarr.length > 0">
                        <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                          <div class="inner photo" :photo="item">
                            <img :src="item" class="pic" @click="uploadPhoto('fileInput','photo',index)" />
                            <div class="close" @click.stop="deletePhoto(item,index,'photo')">×</div>
                          </div>
                        </div>
                      </template>
                      <div v-if="photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput','photo')">
                        <div class="inner">
                          <div class="innerlist">
                            <div class="flex_center h_100">
                              <div class="txt">
                                <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">公司地址</div>
                <div class="input-cell">
                  <x-address class="r-address" title="" raw-value v-model="areaData" :list="addressData" placeholder="选择地址">
                    <template slot="title" slot-scope="props">
                    </template>
                  </x-address>
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">详细地址</div>
                <div class="input-cell">
                    <input v-model="submitData.address" class="post-input" name="address" type="text" placeholder="公司地址" />
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">联系人</div>
                <div class="input-cell">
                    <input v-model="submitData.contact" class="post-input" name="contact" type="text" placeholder="联系人" />
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">手机号</div>
                <div class="input-cell">
                    <input v-model="submitData.mobile" class="post-input" name="mobile" type="text" placeholder="手机号" />
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">开户银行</div>
                <div class="input-cell">
                    <select v-model="submitData.bank" class="w_100" style="height:35px;">
                      <option value=''>请选择银行</option>
                      <option v-for="(item,index) in cardList" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">开户账号</div>
                <div class="input-cell">
                    <input v-model="submitData.account" class="post-input" name="account" type="text" placeholder="开户账号" />
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">公司简介</div>
                <div class="input-cell">
                    <textarea v-model="submitData.content" class="post-input" name="content" placeholder="公司简介" style="width:100%;height:100px;resize:none;" ></textarea>
                </div>
            </div>
        </div>
        <div class="padding20">
            <div class="btn-submit" @click="submitEvent">提交</div>
        </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import Reg from '#/reg'
import { XAddress, ChinaAddressV4Data } from 'vux'
const jweixin = require('../../static/jweixin')
export default {
  components: { XAddress },
  data () {
    return {
      query: {},
      submitData: {
        title: '',
        yyzz: '',
        province: '',
        city: '',
        country: '',
        address: '',
        contact: '',
        mobile: '',
        bank: '',
        account: '',
        content: ''
      },
      photoarr: [],
      maxnum: 1,
      addressData: ChinaAddressV4Data,
      areaData: [],
      cardList: [],
      requiredData: ['title', 'yyzz', 'province', 'city', 'country', 'address', 'contact', 'mobile', 'bank', 'account', 'content']
    }
  },
  methods: {
    photoCallback (data) {
      if (data.flag === 1) {
        this.photoarr.push(data.data)
        this.submitData.yyzz = this.photoarr.join(',')
      } else if (data.error) {
        this.$vux.toast.show({
          text: data.error,
          time: this.$util.delay(data.error)
        })
      }
    },
    uploadPhoto () {
      const self = this
      const fileInput = this.$refs.fileInput[0] ? this.$refs.fileInput[0] : this.$refs.fileInput
      if (this.$util.isPC()) {
        fileInput.click()
      } else {
        jweixin.ready(res => {
          this.$util.wxUploadImage({
            maxnum: self.maxnum,
            handleCallback: (data) => {
              this.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (e) {
      let files = e.target.files
      if (files.length > 0) {
        const fileForm = e.target.parentNode
        const filedata = new FormData(fileForm)
        this.$vux.loading.show()
        this.$http.post(`${ENV.GxkApi}/api/upload/files`, filedata).then(res => {
          let data = res.data
          this.$vux.loading.hide()
          this.photoCallback(data)
        })
      }
    },
    clipPhoto (item) {
      this.popupShow = true
      let index = item.indexOf('?')
      if (index > -1) {
        this.cutImg = item.substring(0, index)
      } else {
        this.cutImg = item
      }
    },
    deletePhoto (item, index) {
      this.photoarr.splice(index, 1)
      this.submitData.yyzz = this.photoarr.join(',')
    },
    submitEvent () {
      console.log(this.areaData)
      this.submitData.province = this.areaData[0]
      this.submitData.city = this.areaData[1]
      this.submitData.county = this.areaData[2]
      let iscontinue = true
      for (let i in this.requiredData) {
        let curKey = this.requiredData[i]
        if (!this.submitData[curKey] || this.submitData[curKey] === '') {
          this.$vux.toast.show({
            text: '请完善注册信息',
            type: 'text'
          })
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      if (!Reg.rPhone.test(this.submitData.mobile)) {
        this.$vux.toast.show({
          text: '请填写正确的手机号',
          type: 'text'
        })
        return false
      }
      this.$http.post(`${ENV.AdminApi}/api/factory/register`, this.submitData).then(res => {
        const data = res.data
        const timeout = this.$util.delay(data.error)
        this.$vux.toast.show({
          text: data.error,
          type: data.flag ? 'success' : 'warn',
          time: timeout,
          onHide: () => {
            if (data.flag) {

            }
          }
        })
      })
    },
    refresh () {
      this.$http.post(`${ENV.GxkApi}/api/common/getBankNames`).then(res => {
        const data = res.data
        this.cardList = data.data ? data.data : data
      })
    }
  },
  created () {
    this.query = this.$route.query
  },
  activated () {
    this.refresh()
  }
}
</script>
