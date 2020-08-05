<template>
  <div id="personal-center" class="bg-page font14" v-cloak>
    <c-title :avatar-href="avatarHref"
            :user-name="linkMan"
            :user-credits="userCredits"
            :user-level="userLevels"
            :profile="profile"
            :messages="messages">
    </c-title>
    <div class="pl12 pr12 posi_r pb10" style="top:65px;z-index:2;">
      <div class=" list-shadow radius5">
        <group class="bg-white radius5">
          <cell>
            <div slot="inline-desc">{{ $t('Service') }}</div>
          </cell>
        </group>
        <grid class="pt10 pb10" :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item label="用户管理" @click.native="toLink('/userList')">
            <div slot="icon" class="circle-icon-bg rgba09 color-white flex_center mb10">
              <span class="al al-pengyouquan font20"></span>
            </div>
          </grid-item>
          <grid-item label="线索管理" @click.native="toLink('/cluesList')">
            <div slot="icon" class="circle-icon-bg rgba01 color-white flex_center mb10">
              <span class="al al-fuwu font20"></span>
            </div>
          </grid-item>
        </grid>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Grid, GridItem, Group, Cell } from 'vux'
import CTitle from '@/components/CTitle'
// import ENV from 'env'
import {User} from '#/storage'
export default {
  components: {
    Grid, GridItem, CTitle, Group, Cell
  },
  data () {
    return {
      avatarHref: 'https://tossharingsales.boka.cn/images/user.jpg',
      query: {},
      linkMan: '',
      userCredits: 0,
      userLevels: 0,
      profile: {},
      messages: 0,
      direct: '',
      loginUser: {}
    }
  },
  methods: {
    toLink (link) {
      this.$router.push({path: link})
    },
    refresh () {
      this.loginUser = User.get()
      console.log(this.loginUser);
      const user = this.loginUser.data ? this.loginUser.data : this.loginUser
      this.avatarHref = user.avatar
      this.linkMan = user.linkman
      this.userCredits = user.credit
      this.userLevels = user.levels
      this.profile = this.loginUser
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
/* css extension */
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.grid-title {
  background-color: #efeff4;
  color: #716f76;
  padding: 5px 15px;
  font-size: 14px;
}

/* vux css hack */
#personal-center .weui-grid__icon {
  height: auto;
  width: auto;
  text-align: center;
}

#personal-center .weui-grids::before {
  border-top: none;
  height: 0;
}

#personal-center .weui-grids {
  background-color: #ffffff;
}

#personal-center .weui-grid:after {
  height: 0px;
  border-bottom: none;
}
#personal-center .v_tit{
  border-bottom:1px solid #efeff4;
  color:#323232;
}
#personal-center .v_order{
  color: #323232;
  border-bottom: 1px solid #efeff4;
}
#personal-center .al-buoumaotubiao48:before{
  font-size: 24px;
}
#personal-center .weui-grid{padding: 5px;}

#personal-center .weui-grid__label{font-size:12px !important;}
#personal-center .weui-cells:before,#personal-center .no-after .weui-cells:after{display: none;}
#personal-center .weui-cells{margin-top:0px !important;}
#personal-center .radius5, #personal-center .weui-cells, #personal-center .weui-grids{
  border-radius:@list-border-radius5;
}
#personal-center .weui-grid__icon + .weui-grid__label{margin-top:0;}
#personal-center .weui-grid__label{color:#333;}
#personal-center .btn_icon{line-height:32px;display: block;height:32px;margin-bottom: 3px;}

#personal-center .icon_num{
  position: absolute;top: -2px;right:0px;z-index:1;
  text-align:center;background-color: #ea3a3a;color:#fff;font-size:8pt;
  width: 20px;height: 20px;line-height:20px;border-radius: 50%;
  display: block;padding: 0px;
}
</style>
