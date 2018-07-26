var ENV = {
  Version: '2.0.0.0',
  AppId: 'wxd50f3623bec2f5b5', // vux:'wx1e72f0c45242a94e' // vue: 'wxd50f3623bec2f5b5'
  // AppSecret: 'f22214afc8a01ec9a769bd0ba8551c48',
  FeedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxOAuthUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
  Host: 'http://vue.boka.cn', // vue: http://vue.boka.cn // vux: http://vux.boka.cn
  BokaApi: 'https://laravel.boka.cn',//'http://laravel.boka.cn', // test: http://124.207.246.107 // vux: http://vuxserver.boka.cn
  WeixinQrcode: 'https://osslaravel.boka.cn/weixin_qrcode.jpg',//vue 博卡授权中心: http://osslaravel.boka.cn/weixin_qrcode.jpg // vux 共销宝: http://vuxlaravel.boka.cn/weixin_qrcode.jpg
  WeixinName: '博卡授权中心', //vue: 博卡授权中心 // vux: 共销宝
  SocketBokaRoom: 'laravel.boka.cn',
  SocketServer: 'ws://124.207.246.109:7272', //'wss://chat.boka.cn/wss', // vux: 'ws://123.206.77.217:7272', // vue: 'ws://124.207.246.109:7272'
  OrderStatus: [
    {id: 0, status: '订单取消'},
    {id: 1, status: '已确认订单'},
    {id: 2, status: '待发货'},
    {id: 3, status: '已发货'},
    {id: 4, status: '已确认收货'},
    {id: 100, status: '已完成'}
  ],
  Emots: [
    '微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴',
    '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过',
    '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼',
    '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗',
    '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打',
    '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
    '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓',
    '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭',
    '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕',
    '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳',
    '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
    '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻',
    '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
    '激动', '街舞', '献吻', '左太极', '右太极'
  ]
}

ENV.NoAccessUrls = [
  ENV.BokaApi + '/api/login/*',
  ENV.BokaApi + '/api/authLogin/*',
  ENV.BokaApi + '/api/qrcode/login*',
  ENV.BokaApi + '/api/scanlogin'
]
