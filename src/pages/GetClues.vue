<template>
    <div class="bg-white">
      <div class="header-img">
        <img src="../assets/images/fromheaderimg.jpeg"/>
      </div>
      <div class="from bg-white">
        <div class="from-item">
          <div class="item-title">您的姓名（已加密）<span>*</span></div>
          <div class="item-cell"><input @blur="blurName" @focus="focusName" v-model="linkman" placeholder="请输入" /></div>
        </div>
        <div class="from-item">
          <div class="item-title">您的电话（已加密）<span>*</span></div>
          <div class="item-cell">
            <input @blur="blurTelephone" @focus="focusTelephone" v-model="telephone" placeholder="请输入"/>
          </div>
        </div>
        <div class="from-item">
          <div class="item-title">您的身份是<span>*</span></div>
          <div class="item-cell">
            <el-select v-model="groupid" placeholder="请选择您的身份">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
        </div>
        <div class="from-item">
          <div class="item-title">您所在的城市是<span>*</span></div>
          <div class="item-cell">
            <x-address class="x-address" :title="``" raw-value v-model="area" hide-district :list="addressData" :placeholder="`请选择您所在的城市`">
              <template slot="title" slot-scope="props">
              </template>
            </x-address>
          </div>
        </div>
        <div class="from-item">
          <div class="">
            <check-icon :value.sync="isagreecheckbox">我已阅读《个人信息保护声明》</check-icon>
          </div>
        </div>
      </div>
      <div class="submit-bottom  bg-white">
        <div v-if="!isagreecheckbox" class="btn submit-btn1 mb10">立即提交</div>
        <div v-else class="btn submit-btn mb10" @click="submitEvent">立即提交</div>
        <div class="agree-statement font12">提交即视为您已阅读并同意<span class="statement" @click="toStatement">《个人信息保护声明》</span></div>
      </div>
    </div>
</template>
<script>
import {XAddress, PopupPicker, CheckIcon, ChinaAddressV4Data, Value2nameFilter as value2name} from 'vux'
import ENV from 'env'
export default {
  components: {
    XAddress,
    CheckIcon,
    PopupPicker
  },
  data () {
    return {
      linkman: '',
      telephone: '',
      linkman1: '',
      telephone1: '',
      groupid: '',
      addressData: ChinaAddressV4Data,
      area: [],
      province: '',
      city: '',
      issubmit: false,
      isagreecheckbox: false,
      options: [{
        value: 1,
        label: '我是客户，需要制作视频'
      }, {
        value: 2,
        label: '我是视频制作团队，求合作'
      }]
    }
  },
  methods: {
    blurName () {
      let len = this.linkman.length
      this.linkman1 = this.linkman
      this.linkman = new Array(len + 1).join('*')
      console.log(this.linkman, this.addArray)
    },
    blurTelephone () {
      let len = this.telephone.length
      this.telephone1 = this.telephone
      this.telephone = new Array(len + 1).join('*')
      console.log(this.telephone, this.addArray)
    },
    focusName () {
      this.linkman = this.linkman1
    },
    focusTelephone () {
      this.telephone = this.telephone1
    },
    submitEvent () {
      let address = value2name(this.area || [], ChinaAddressV4Data).split(' ')
      // if (address && address.length) {
      //   for (let i = 0; i < address.length; i++) {
      //     if (address[i] === '市辖区') {
      //       address.splice(i, 1)
      //       address.push(address[0])
      //       break
      //     }
      //   }
      // }
      if (!this.issubmit) {
        if (address === '' || this.linkman1 === '' || this.telephone1 === '' || this.groupid === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
        } else if (!(/^1[3456789]\d{9}$/).test(this.telephone1)) {
          this.$vux.toast.text('请输入正确的手机号', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/Visitor/addClues`, {
            title: this.linkman1,
            mobile: this.telephone1,
            identity: this.groupid,
            province: address[0],
            city: address[1]
          }).then(res => {
            console.log(res)
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.issubmit = false
          })
        }
      }
    },
    toStatement () {
      this.$router.push({path: '/statement'})
    }
  },
  activated () {
    this.issubmit = false
  }
}
</script>
<style lang="less">
.header-img img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}
.from{
  padding: 20px;
  margin-bottom: 140px;
  .from-item{
    margin-bottom: 20px;
    .item-title{
      span{
        color: red;
      }
    }
    .item-cell{
      border-bottom: 1px solid #bcbcbc;
      height:50px;
      span{
        color: #999;
        font-size: 13px;
      }
      input,select,.popup-picker,.x-address,.el-select ,.el-input{
        height: 100%;
        width: 100%;
        font-size: 15px;
        border: none !important;
        padding-left: 0 !important;
      }
      .el-dropdown-link{
        line-height: 50px;
      }
    }
  }
}
.submit-bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 140px;
  color: #bcbcbc;
  text-align: center;
  .submit-btn,.submit-btn1{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: red;
    color: #fff;
  }
  .submit-btn1 {
    background: #ea9591;
  }
  .statement{
    color: #2e92f6;
  }
}
.x-address,.popup-picker {
  .weui-cell{height:100%;}
  .weui-cell__hd{display:none;}
  .vux-popup-picker-select-box{height:100%;}
  .vux-popup-picker-select{height:100%;text-align:left;display:flex;justify-content: flex-start;align-items: center;}
  .vux-popup-picker-select .vux-cell-value{color:initial !important;}
  .vux-cell-placeholder{color: #999 !important}
  .vux-popup-picker-select span{font-size: 15px !important}
}
</style>
