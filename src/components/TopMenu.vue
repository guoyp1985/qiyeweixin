<style lang="less">
.top-header{
  .header{
    position:fixed;z-index:50;left:0;top:0;right:0;display:flex;height:90px;
    box-sizing:border-box;border-bottom:#cccccc 1px solid;background-color:#fff;
  }
  .header .logo{
    padding-left:20px;height:100%;display:flex;justify-content:flex-end;
    flex-flow:row wrap; align-items:center;text-align:right;
  }
  .header .logo .pic{
    width:50px;height:50px;overflow:hidden;
    display:flex;justify-content:center;align-items:center;
  }
  .header .logo .pic img{width:50px;}
  .header .logo .txt{font-weight:bold;font-size:20px;padding-left:10px;}
  .header .menu{flex:1;width:28px;margin-left:24%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
  .menuarea .menu-item:hover{text-decoration:none;}
  .menu-item{color: #000000;}
  .menu-item:hover{cursor:pointer;}
  .menu-item.visited {color: #FF0036 !important;}
  .denglu {position: relative;display: inline-block;}
  .dropdowm{width: 100px;}
  .dropdown-content {display: none;position: absolute;background-color: #f9f9f9;width:100px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);border-radius: 4px;}
  .dropdown-content a {color: black;padding:13px 12px;text-decoration: none;display: block;
    border-radius:4px;text-align: center;margin-top: -4px;}
  .dropdown-content a:hover {background-color: rgb(60, 113, 242);color: #fff;}
  .dropdowm:hover .dropdown-content {display: block;}

  .menuarea{
    position:fixed;left:150px;top:0;right:50px;z-index:50;height:90px;
    display:flex;justify-content:flex-end;flex-flow:row wrap; align-items:center;text-align:right;
  }
  .header .btn-icon{display:none;}
  .menuarea .menu-list{display:flex;justify-content:flex-end;flex-flow:row wrap;align-items:center;text-align:right;}
  .menuarea .menu-item{font-size:20px;padding:0 30px;display:block;text-decoration:none;}
  .menuarea .menu-item:active{text-decoration:none;}

}
  @media (min-width:1200px) {
    .mobile .header{display:flex;}
    .mobile .menuarea{
      position:fixed;left:150px;top:0;right:245px;z-index:50;height:90px;
      display:flex;justify-content:flex-end;flex-flow:row wrap; align-items:center;text-align:right;
    }
    .mobile .header .btn-icon{display:none;}
    .mobile .menuarea .menu-list{display:flex;justify-content:flex-end;flex-flow:row wrap;align-items:center;text-align:right;}
    .mobile .menuarea .menu-item{font-size:20px;padding:0 30px;display:block;text-decoration:none;}
    .mobile .menuarea .menu-item:active{text-decoration:none;}
  }
  @media (max-width: 1199px) {
    .mobile .header{
      position:fixed;z-index:50;left:0;top:0;right:0;display:flex;height:80px;
      box-sizing:border-box;border-bottom:#828a9f 1px solid;background-color:#fff;
    }
    .mobile .menuarea{margin-top:-10px;}
    .mobile .header .login{width:220px;float:right;}
    .mobile .header .login .btn{width:100px;font-size:14px;}
    .mobile .header .menu{display:flex;justify-content:flex-end;flex-flow:row wrap; align-items:center;text-align:right;}
    .mobile .header .btn-icon{padding-left:10px;padding-right:10px;box-sizing:border-box;display: flex;justify-content:flex-end;flex-flow:row wrap; align-items:center;text-align:right;}
    .mobile .menuarea.active{display:block;}
    .mobile .menuarea{position:fixed;left:0px;top:90px;bottom:0;right:0px;z-index:50;display:none;}
    .mobile .menuarea .menu-list{background-color:#464646;height:0;transition:all 0.5s ease;overflow:hidden;}
    .mobile .menuarea.active .menu-list{height:462px;}
    .mobile .menuarea .menu-item{
      width:100%;height:65px;font-size:20px;text-align:center;color:#fff;display:flex;justify-content:center; align-items:center;
    }
    .mobile .menuarea .menu-list .menu-item:not(:last-child){border-bottom:#828a9f 1px solid;}
  }

  @media (max-width: 500px) {
    .mobile .header{
      position:fixed;z-index:10;left:0;top:0;right:0;display:flex;height:60px;
      box-sizing:border-box;border-bottom:#828a9f 1px solid;background-color:#fff;
    }
    .mobile .menuarea{margin-top:-30px;}
    .mobile .header .logo{width:195px;margin-left:-3%;}
    .mobile .header .logo .pic{width:35px;height:35px;}
    .mobile .header .logo .pic img{width:30px;}
    .mobile .header .logo .txt{font-size:14px;}
    .mobile .header .login{width:200px;padding-right:0px;display:flex;justify-content:center;align-items:center;}
    .mobile .header .login .btn{width:80px;font-size:14px;height:35px;}
    .mobile .menuarea .menu-item{font-size:14px;}
    .mobile .dropdowm{width: 80px;}
    .mobile .dropdown-content {width: 80px;}
    .mobile .dropdown-content a {padding:8px 2px;}
  }
  @media (max-width: 300px){
    .mobile .header{
      position:fixed;z-index:10;left:0;top:0;right:0;display:flex;height:60px;
      box-sizing:border-box;border-bottom:#828a9f  1px solid;background-color:#fff;
    }
    .mobile .menuarea{margin-top:-30px;}
    .mobile .menuarea .menu-list{height:250px !important;}
    .mobile .menuarea .menu-item{height:50px;}
    .mobile .header .logo{width:110px;}
    .mobile .header .logo .pic{width:30px;height:30px;}
    .mobile .header .logo .pic img{width:30px;}
    .mobile .header .logo .txt{font-size:10px;padding-left:8px;}
    .mobile .header .login{display:none;}
    .mobile .header .menu{margin-right: 10%;}
  }
</style>
<template>
  <div class="top-header">
    <div class="header">
      <div class="logo">
          <div class="pic" v-if="factoryInfo.photo && factoryInfo.photo != ''">
              <img :src="factoryInfo.photo" />
          </div>
          <div class="txt">{{factoryInfo.company}}</div>
      </div>
      <div class="menu">
          <div class="btn-icon btn-menu" @click="handleMenu">
              <i class="al al-menu"></i>
          </div>
      </div>
    </div>
    <div :class="`menuarea ${menuActive ? 'active' : ''}`" @click="clickMenu">
        <div class="menu-list">
            <div v-for="(item, index) in menuArr" :class="`menu-item ${(current) == (item.type + item.relateid) ? 'visited' : ''}`" @click="toMenu(item)">{{item.title}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
// import ENV from 'env'
import { MenuData, Factory } from '#/storage'
export default {
  name: 'TopMenu',
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      factoryInfo: {},
      menuArr: null,
      menuActive: false
    }
  },
  methods: {
    toMenu (item) {
      switch (item.type) {
        case 'home':
          if (item.type !== this.current) {
            this.$router.push('/')
          }
          break
        case 'newslist':
          if (item.type !== this.current) {
            let params = {}
            if (item.relateid) params.classid = item.relateid
            this.$router.push({path: '/newslist', query: params})
          }
          break
        case 'productlist':
          if (item.type !== this.current) {
            let params = {}
            if (item.relateid) params.classid = item.relateid
            this.$router.push({path: '/productlist', query: params})
          }
          break
        case 'aboutus':
          if (item.type !== this.current) {
            this.$router.push({path: '/aboutus'})
          }
          break
        default:
          this.$router.push({path: '/channel', query: {id: item.id}})
          break
      }
    },
    handleMenu () {
      this.menuActive = !this.menuActive
    },
    clickMenu () {
      this.menuActive = false
    }
  },
  created () {
    this.factoryInfo = Factory.get()
    this.menuArr = MenuData.get()
  }
}
</script>
