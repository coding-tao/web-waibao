import Vue from 'vue';
import Router from 'vue-router';
const register = resolve => require(['@/page/common/register'], resolve) 
const loginPage = resolve => require(['@/page/common/login-page'], resolve) 
const rechargePassword = resolve => require(['@/page/common/recharge-password'], resolve) 
const poster = resolve => require(['@/page/webManage/poster'], resolve) 
const posterList = resolve => require(['@/page/webManage/poster-list'], resolve) 
const companyInfo = resolve => require(['@/page/webManage/company-info'], resolve) 
const productList = resolve => require(['@/page/productManage/product-list'], resolve) 
const productEdit = resolve => require(['@/page/productManage/product-edit'], resolve) 
const sortList = resolve => require(['@/page/productManage/sort-list'], resolve) 
const recruitList = resolve => require(['@/page/recruitManage/recruit-list'], resolve) 
const recruitEdit = resolve => require(['@/page/recruitManage/recruit-edit'], resolve) 
const infoList = resolve => require(['@/page/infoManage/info-list'], resolve) 
const infoEdit = resolve => require(['@/page/infoManage/info-edit'], resolve) 
const messageList = resolve => require(['@/page/messageManage/message-list'], resolve) 

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/sys/', 
  routes: [
      {
          path: '/loginPage',
          name: 'loginPage',
          component: loginPage
      },
      {
        path: '/register',
        name: 'register',
        component: register
      },
      {
        path: '/rechargePassword',
        name: 'rechargePassword',
        component: rechargePassword
      },
      {
        path: '/',
        name: 'posterList',
        component: posterList
      },
      {
        path: '/poster',
        name: 'poster',
        component: poster
      },
      {
        path: '/companyInfo',
        name: 'companyInfo',
        component: companyInfo
      },
      {
        path: '/productList',
        name: 'productList',
        component: productList
      },
      {
        path: '/productEdit',
        name: 'productEdit',
        component: productEdit
      },
      {
        path: '/sortList',
        name: 'sortList',
        component: sortList
      },
      {
        path: '/recruitList',
        name: 'recruitList',
        component: recruitList
      },
      {
        path: '/recruitEdit',
        name: 'recruitEdit',
        component: recruitEdit
      },
      {
        path: '/infoList',
        name: 'infoList',
        component: infoList
      },
      {
        path: '/infoEdit',
        name: 'infoEdit',
        component: infoEdit
      },
      {
        path: '/messageList',
        name: 'messageList',
        component: messageList
      }
  ]
})
