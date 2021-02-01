<style lang="less">
.web-footer{
  width:100%;text-align:center;font-size:14px;background-color:#f7f7f7;
  padding:20px 0;box-sizing: border-box;line-height:25px;
  .txt1{color:#4889f3;}
  .txt1:hover{cursor: pointer;}
}
</style>
<template>
  <div class="web-footer">
    <div><span>{{factoryInfo.title}}</span><span class="ml10">版权所有</span></div>
    <div>地址: {{fulladdress}}</div>
    <div>
      <span>联系人: {{factoryInfo.newbankuser}}</span>
      <span class="ml20">联系电话: </span>
      <a :href="`tel:${factoryInfo.mobile}`" class="txt1">{{factoryInfo.mobile}}</a>
    </div>
    <div>
      <a class="txt1" :href="bokaUrl" target="_blank">博卡先锋 一云多屏</a>
      <span class="ml5">技术支持</span>
      <a class="txt1 ml20" :href="adminUrl" target="_blank">管理后台</a>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import {} from 'vux'
import { Factory } from '#/storage'
export default {
  name: 'Footer',
  data () {
    return {
      factoryInfo: {},
      fulladdress: '',
      adminUrl: ENV.AdminLogin,
      bokaUrl: ENV.BokaUrl
    }
  },
  methods: {
  },
  created () {
    this.factoryInfo = Factory.get()
    let address = this.factoryInfo.province
    if (this.factoryInfo.city !== '市辖区') address = `${address}${this.factoryInfo.city}`
    this.fulladdress = `${address}${this.factoryInfo.county}${this.factoryInfo.address}`
  }
}
</script>
