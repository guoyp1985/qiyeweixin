<template>
    <div class="bg-white">
      <div class="from bg-white">
        <div class="from-item">
          <div class="item-title">姓名<span>*</span></div>
          <div class="item-cell"><input v-model="linkman" placeholder="请输入姓名" /></div>
        </div>
        <div class="from-item">
          <div class="item-title">手机号<span>*</span></div>
          <div class="item-cell">
            <input v-model="telephone" placeholder="请输入手机号"/>
          </div>
        </div>
        <div class="from-item">
          <div class="item-title">身份<span>*</span></div>
          <div class="item-cell">
            <!-- <select class="bg-white" v-model="identity">
              <option value="0">请选择身份</option>
              <option value="1">管理员</option>
              <option value="2">客户</option>
              <option value="3">供应商</option>
              <option value="4">业务员</option>
            </select> -->
            <el-dropdown @command="handleCommand" trigger="click">
              <div class="el-dropdown-link">
                {{groupname}}
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{name:'管理员',value:'1'}">管理员</el-dropdown-item>
                <el-dropdown-item :command="{name:'客户',value:'2'}">客户</el-dropdown-item>
                <el-dropdown-item :command="{name:'供应商',value:'3'}">供应商</el-dropdown-item>
                <el-dropdown-item :command="{name:'业务员',value:'4'}">业务员</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="submit-bottom  bg-white">
        <div class="btn submit-btn mb10" @click="submitEvent">立即提交</div>
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
      groupid: '0',
      groupname: '请选择身份',
      issubmit: false
    }
  },
  methods: {
    submitEvent () {
      if (!this.issubmit) {
        if (this.linkman === '' || this.telephone === '' || this.groupid === '0') {
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
    },
    handleCommand(command) {
      this.groupid = command.value;
      this.groupname = command.name
    }
  },
  activated () {
    this.issubmit = false
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
      input,select,.popup-picker,.x-address,.el-dropdown ,.el-dropdown-link{
        height: 100%;
        width: 100%;
        font-size: 15px;
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
.el-dropdown-menu{
  width: 94%;
  margin: 12px 20px;
}
</style>
