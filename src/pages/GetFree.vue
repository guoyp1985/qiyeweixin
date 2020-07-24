<template>
    <div>
      <div class="header-img">
        <img src=""/>
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
            <select v-model="identity">
              <option value="1">我是客户，需要制作视频</option>
              <option value="2">我是视频制作团队，求合作</option>
            </select>
            </div>
        </div>
        <div class="from-item">
          <div class="item-title">您所在的城市是<span>*</span></div>
          <div class="item-cell">
            <x-address class="x-address" :title="``" style="width:100%;height:100%;" raw-value v-model="area" hide-district :list="addressData" :placeholder="`请选择您所在的城市`">
              <template slot="title" slot-scope="props">
              </template>
            </x-address>
          </div>
        </div>
      </div>
      <div class="submit-bottom  bg-white">
        <div class="btn submit-btn mb5" @click="submitEvent">立即提交表单免费获取制...</div>
        <div class="agree-statement font12">提交即视为您已阅读并同意<span class="statement" @click="toStatement">《个人信息保护声明》</span></div>
      </div>
    </div>
</template>
<script>
import {XAddress, ChinaAddressV4Data, Value2nameFilter as value2name} from 'vux'
import ENV from 'env'
export default {
  components: {
    XAddress
  },
  data () {
    return {
      linkman: '',
      telephone: '',
      linkman1: '',
      telephone1: '',
      identity: '',
      addressData: ChinaAddressV4Data,
      area: [],
      province: '',
      city: ''
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

      if (address === '' || this.linkman1 === '' || this.telephone1 === '' || this.identity === '') {
        this.$vux.toast.text('必填项不能为空', 'middle')
      } else if (!(/^1[3456789]\d{9}$/).test(this.telephone1)) {
        this.$vux.toast.text('请输入正确的手机号', 'middle')
      } else {
        this.$http.post(`${ENV.BokaApi}/api/Visitor/addClues`, {
          title: this.linkman1,
          mobile: this.telephone1,
          identity: this.identity,
          province: address[0],
          city: address[1]
        }).then(res => {
          console.log(res)
          // let data = res.data
        })
      }
    },
    toStatement () {
      this.$router.push({path: '/statement'})
    }
  },
  activated () {
  }
}
</script>
<style lang="less">
.header-img{
  width: 100%;
  height: 200px;
}
.from{
  padding: 20px;
  margin-bottom: 100px;
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
      input,select{
        height: 100%;
        width: 100%;
      }
    }
  }
}
.submit-bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  color: #bcbcbc;
  text-align: center;
  .submit-btn{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: red;
    color: #fff;
  }
  .statement{
    color: #2e92f6;
  }
}
.x-address{
  .weui-cell{height:100%;}
  .weui-cell__hd{display:none;}
  .vux-popup-picker-select-box{height:100%;}
  .vux-popup-picker-select{height:100%;text-align:left;display:flex;justify-content: flex-start;align-items: center;}
  .vux-popup-picker-select span{color:initial !important;}
}
</style>
