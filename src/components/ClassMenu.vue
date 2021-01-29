<style lang="less">
.left-col{
  width: 170px;min-height: 100px;margin-right: 30px;
  .left-inner{width:170px;}
  .left-menu{width: 170px;z-index: 1;background-color: #fff;}
  .left-menu .hd{height: 44px;line-height: 44px;color: #fff;background: #4889f3;border-radius: 3px 3px 0 0;font-size: 16px;text-align: center;}
  .class-list {border: 1px solid #f0f0f0;overflow: hidden;}
  .class-list .item {border-top: 1px solid #f0f0f0;}
  .class-list .item:first-child {border-top: none;}
  .class-list .item:hover{cursor:pointer;}
  .class-list .item .inner {
      position: relative;
      display: block;
      color: #666;
      font-size: 16px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background-color: #fff;
  }
  .class-list .item .inner.active {color: #4889f3;background: #f3f6f8;}
}
@media (max-width: 1199px) {
  .mobile{
    .left-col{
      margin-right:10px;
      .left-menu{}
    }
  }
}
</style>
<template>
  <div class="left-col">
      <div class="left-inner">
          <div class="left-menu">
              <div class="hd">相关频道</div>
              <div class="bd">
                  <div class="class-list">
                    <div v-for="(item, index) in classArr" :key="index" class="item" @click="toClass(item)">
                        <span :class="`inner ${query.classid == item.id ? 'active' : ''}`">{{item.title}}</span>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
export default {
  name: 'ClassMenu',
  data () {
    return {
      query: {},
      classArr: [],
      hostName: ''
    }
  },
  methods: {
    toClass (item) {
      this.$router.push({path: '/newslist', query: {classid: item.id}})
    }
  },
  created () {
    this.query = this.$route.query
    this.hostName = this.$util.getHostName()
    this.$http.get(`${ENV.GxkApi}/api/list_n/factorynewsclass`, {
      params: {module: 'factorynewsclass', prefixdomain: this.hostName}
    }).then(res => {
      const data = res.data
      if (data.flag) {
        this.classArr = data.data
      }
    })
  }
}
</script>
