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
      <div class="from">
        <div class="from-item">
          <div class="item-title">您的姓名（已加密）<span>*</span></div>
          <div class="item-cell"><input v-model="linkman" placeholder="请输入" /></div>
        </div>
        <div class="from-item">
          <div class="item-title">您的电话（已加密）<span>*</span></div>
          <div class="item-cell">
            <input placeholder="请输入"/>
          </div>
        </div>
        <div class="from-item">
          <div class="item-title">您的身份是<span>*</span></div>
          <div class="item-cell">选择</div>
        </div>
        <div class="from-item">
          <div class="item-title">您所在的城市是<span>*</span></div>
          <div class="item-cell">地址</div>
        </div>
      </div>
      <div>
        <div>立即提交表单免费获取制...</div>
        <div>提交即视为您已阅读并同意<span class="">《个人信息保护声明》</span></div>
      </div>
    </div>
</template>
<script>
</script>
<style>
.header-img{
  width: 100%;
  height: 200px;
}
.from{
  width: 100%;
  padding: 20px;
  margin-bottom: 100px;
  .from-item{
    margin-bottom: 20px;
    .item-title{
      span{
        color: red
      }
    }
    .item-cell{
      border-bottom: 1px solid #bcbcbc
    }
  }
}
</style>
