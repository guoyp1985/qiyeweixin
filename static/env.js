var ENV = {
  Version: '2.0.0.21',
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
  ],
  title: '共销客',
  logo: 'data/images/logo.png',
  fid: 10,
  AdminApi: 'https://admin.bsa.cn',
  GxkApi: 'https://gxkvpc.boka.cn'
}

ENV.NoAccessUrls = [
  ENV.AdminApi + '/api/factory/register'
]
