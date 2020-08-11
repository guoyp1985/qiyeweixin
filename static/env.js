var ENV = {
  Version: '2.0.0.21',
  AppId: 'wxf6907beecbd194ef', // vux:'wx1e72f0c45242a94e' // vue: 'wxd50f3623bec2f5b5'
  // AppSecret: 'f22214afc8a01ec9a769bd0ba8551c48',
  FeedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxOAuthUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
  Host: 'https://zhenludev.boka.cn', // vue: http://vue.boka.cn // vux: http://vux.boka.cn
  BokaApi: 'https://ifzhenlu.boka.cn',//'http://laravel.boka.cn', // test: http://124.207.246.107 // vux: http://vuxserver.boka.cn
  WeixinQrcode: 'https://osslaravel.boka.cn/weixin_qrcode.jpg',//vue 博卡授权中心: http://osslaravel.boka.cn/weixin_qrcode.jpg // vux 共销汇: http://vuxlaravel.boka.cn/weixin_qrcode.jpg
  WeixinName: '博卡授权中心', //vue: 博卡授权中心 // vux: 共销汇
  AdminUrl: 'http://laravelcms.boka.cn/admin/login/unionIdLogin',
  FactoryApi: 'https://factorydev.boka.cn',
  ApiVersion: 'V2',
  ApiAccept: 'application/vnd.factorydev.v2+json',
  DebugMode: false,
  DebugList: [
    // {uid: 25465, name: '黄一萌'},
    {uid: 8, name: 'young'},
    {uid: 27531, name: '戴飞'},
    {uid: 24675, name: '兰花草'},
    {uid: 1694},
    {uid: 65231},
    {uid: 99756},
    {uid: 39854},
    {uid: 25421},
    {uid: 98466}
  ]
}

ENV.NoAccessUrls = [
  ENV.BokaApi + '/api/login/*',
  ENV.BokaApi + '/api/authLogin/*',
  ENV.BokaApi + '/api/authUser/*',
  ENV.BokaApi + '/api/qrcode/login*',
  ENV.BokaApi + '/api/scanlogin',
  ENV.BokaApi + '/api/withMiniLogin*'
]
