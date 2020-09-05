<template>
  <div class="bg-white">
    <div class="from bg-white">
      <div class="from-items">
        <div class="item-title">姓名<span>*</span></div>
        <div class="item-cell"><input v-model="linkman" placeholder="请输入姓名" /></div>
      </div>
      <div class="from-items">
        <div class="item-title">手机号<span>*</span></div>
        <div class="item-cell">
          <input v-model="telephone" placeholder="请输入手机号"/>
        </div>
      </div>
      <div class="from-items">
        <div class="item-title">身份<span>*</span></div>
        <div class="item-cell">
          <el-select v-model="groupid" placeholder="请选择身份">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="submit-bottom  bg-white">
      <div class="btn submit-btn mb10" @click="submitEvent">立即提交</div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import {User} from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      linkman: '',
      telephone: '',
      groupid: '',
      issubmit: false,
      options: [{
        value: 1,
        label: '管理员'
      }, {
        value: 2,
        label: '客户'
      }, {
        value: 3,
        label: '供应商'
      }, {
        value: 4,
        label: '业务员'
      }],
      loginUser: {},
      isManager: false, // 1:管理员
      isSale: false, // 4:业务员
      isCustomer: false, // 2:客户
      isSupplier: false // 3:供应商
    }
  },
  methods: {
    submitEvent () {
      if (!this.issubmit) {
        if (this.linkman === '' || this.telephone === '' || this.groupid === '') {
          this.$vux.toast.text('必填项不能为空', 'middle')
        } else if (!(/^1[3456789]\d{9}$/).test(this.telephone)) {
          this.$vux.toast.text('请输入正确的手机号', 'middle')
        } else {
          this.issubmit = true
          this.$http.post(`${ENV.BokaApi}/api/user/addMember`, {
            linkman: this.linkman,
            mobile: this.telephone,
            groupid: this.groupid
          }).then(res => {
            let data = res.data
            this.$vux.toast.text(data.error, 'middle')
            this.$router.push({path: '/userList'})
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
    this.loginUser = User.get()
    this.$util.setUserRole(this)
  }
}
</script>
<style lang="less">
.header-img{
  width: 100%;
  // height: 200px;
}
.from{
  padding: 20px;
  margin-bottom: 140px;
  .from-items{
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
