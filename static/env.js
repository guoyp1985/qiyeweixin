var ENV = {
  Version: '1.0.0',
  GzhName: '博卡授权中心',
  isKf: true,
  preName: 'sqdcj', // sqdcj zsygx
  Title: '共销客',
  Logo: 'data/images/logo.png',
  Fid: 10,
  AdminApi: 'https://admin.bsa.cn',
  GxkApi: 'https://laravel.boka.cn',
  WebHost: 'bsa.cn',
  AdminLogin: 'http://laravelcms.boka.cn/admin/login/login?role=wesite'
}

ENV.NoAccessUrls = [
  ENV.GxkApi + '/api/factory/webApply'
]
