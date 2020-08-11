<template>
  <div id="personal-center" class="bg-page font14 center-page" v-cloak>
    <div class="toparea">
      <div class="box-area">
        <div class="avatar">
          <img :src="userInfo.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        </div>
        <div class="txt">{{userInfo.linkman}}</div>
      </div>
    </div>
    <div class="app-box-area part">
      <div class="box-inner service">
        <div class="txt-item b_bottom_after">
          <div class="flex_cell">服务</div>
        </div>
        <div class="listicon list">
          <div class="item" @click="toLink('/userList')">
            <div class="item-inner">
              <div class="w_100">
                <div class="radius bg-invite"><span class="al al-set"></span></div>
                <div class="align_center">用户管理</div>
              </div>
            </div>
          </div>
          <div class="item" @click="toLink('/cluesList')">
            <div class="item-inner">
              <div class="w_100">
                <div class="radius bg-orange"><span class="al al-fuwu"></span></div>
                <div class="align_center">线索管理</div>
              </div>
            </div>
          </div>
          <div class="item" @click="toBind">
            <div class="item-inner">
              <div class="w_100">
                <div class="radius bg-blue"><span class="al al-set"></span></div>
                <div class="align_center">绑定公众号</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
import {User} from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      userInfo: {},
      query: {}
    }
  },
  methods: {
    toBind () {
      const originHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
      console.log('跳转绑定授权链接')
      console.log(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=miniAccess#wechat_redirect`)
      location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=miniAccess#wechat_redirect`)
    },
    toLink (link) {
      this.$router.push({path: link})
    },
    refresh () {
      this.userInfo = User.get()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.center-page{
  .toparea{
    position:relative;padding:10px;box-sizing:border-box;
    .bg{height:100px;position:absolute;left:0;top:0;right:0;z-index:1;/*background-color:#f64635;*/}
    .box-area{
      background: linear-gradient(#6f6e6e, #000);border-radius:10px;width:100%;color:#F5CD91;margin:0 auto;position:relative;z-index:2;
      padding:10px;box-sizing: border-box;
      .avatar{
        margin:0 auto;width:65px;height:65px;border-radius:50%;border:#fff 3px solid;box-sizing: border-box;
        img{width:100%;height:100%;border-radius:50%;}
      }
      .txt{text-align:center;margin-top:5px;}
      .top-item{
        margin-top:20px;border-top:#F5CD91 1px solid;padding-top:10px;padding-bottom:10px;
        .txt_cell{width:60px;}
        .btn_cell{
          width:100px;
          .btn{width:80px;height:30px;border-radius:20px;text-align: center;}
        }
      }
    }
  }
  .part{
    .box-inner{position:relative;padding:10px;}
    .service{
      .al{color:#fff !important;font-size:20px !important;}
      .listicon .item{margin-top:20px;}
    }
    .box-item:not(:first-child){margin-top:10px;}
    .box-item.money{padding:15px 10px;}
    .box-item{
      width:100%;padding:10px;box-sizing: border-box;font-size:12px;
      position:relative;background-color:#fff;border-radius:8px;border: 1px solid #e4e4e4;
    }
    .txt-item{
      color:#666;width:100%;padding-bottom:10px;display:flex;font-size:14px;color:#000;
      .al{font-size:20px;}
      .icon_cell{
        width:100px;text-align:right;color:rgba(0,0,0,0.8);
        .al{color:rgba(0,0,0,0.8) !important;}
      }
    }
    .listicon{
      width:100%;display:flex;flex-wrap: wrap;
      .item{
        width:33.3333%;
        .item-inner{
          display:flex;justify-content: center; align-items: center;
          .al{color:#ff6a61;font-size:25px;}
        }
        .inner{width:60px;position:relative;}
        .radius{
          display:flex;justify-content: center; align-items: center;
          width:43px;height:43px;border-radius:50%;color:#fff;
          margin:0 auto 5px;
        }
      }
    }
  }
}
</style>
