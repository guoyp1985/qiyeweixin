/*
* @description: 个人中心页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
    <div>
      <div class="header-img">
        <img src=""/>
      </div>
      <div class="from bg-white">
        <div class="from-item">
          <div class="item-title">您的姓名（已加密）<span>*</span></div>
          <div class="item-cell"><input @blur="blurName" v-model="linkman" placeholder="请输入" /></div>
        </div>
        <div class="from-item">
          <div class="item-title">您的电话（已加密）<span>*</span></div>
          <div class="item-cell">
            <input @blur="blurTelephone" v-model="telephone" placeholder="请输入"/>
          </div>
        </div>
        <div class="from-item">
          <div class="item-title">您的身份是<span>*</span></div>
          <div class="item-cell">
            <select v-model="identity">
              <option>我是客户，需要制作视频</option>
              <option>我是视频制作团队，求合作</option>
            </select>
            </div>
        </div>
        <div class="from-item">
          <div class="item-title">您所在的城市是<span>*</span></div>
          <div class="item-cell" @click="chooseCity">
            <VuePicker :data="tdata"
              :layer="2"
              :defaultIndex="defaultIndex"
              :showToolbar="true"
              @cancel="cancel"
              @confirm="confirm"
              :visible.sync="pickerVisible"
            />
          </div>
        </div>
      </div>
      <div class="submit-bottom  bg-white">
        <div class="btn submit-btn mb5">立即提交表单免费获取制...</div>
        <div class="agree-statement font12">提交即视为您已阅读并同意<span class="statement">《个人信息保护声明》</span></div>
      </div>
    </div>
</template>
<script>
  import VuePicker from 'vue-pickers'

export default {
  components: {
    VuePicker
  },
  data () {
    return {
      linkman: '',
      telephone: '',
      identity : '',
  },
  activated () {
    // console.log(areaList);
  },
  methods:{
    blurName () {
      let len = this.linkman.length
      this.addArray[0] = this.linkman
      this.linkman = new Array(len+1).join('*')
      console.log(this.linkman, this.addArray);
    },
    blurTelephone () {
      let len = this.telephone.length
      this.addArray[1] = this.telephone
      this.telephone = new Array(len+1).join('*')
      console.log(this.telephone, this.addArray);
    },
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
</style>
