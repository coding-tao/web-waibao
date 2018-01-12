export default {
  routerList: [{
      path: '/',
      name: '网页管理',
      icon:'el-icon-document',
      itemList: [{
        name: '广告栏',
        path: '/'
      },{
        name: '公司信息',
        path: '/companyInfo'
      }]
    },{
      path: '/1',
      name: '产品管理',
      icon:'el-icon-document',
      itemList: [{
        name: '产品列表',
        path: '/productList'
      },{
        name: '分类列表',
        path: '/sortList'
      }]
    },{
      path: '/2',
      name: '招聘管理',
      icon:'el-icon-document',
      itemList: [{
        name: '职位列表',
        path: '/recruitList'
      }]
    },{
      path: '/3',
      name: '咨询管理',
      icon:'el-icon-document',
      itemList: [{
        name: '资讯列表',
        path: '/infoList'
      }]
    },{
      path: '/4',
      name: '留言管理',
      icon:'el-icon-document',
      itemList: [{
        name: '留言列表',
        path: '/messageList'
      }]
    }
  ]
}
