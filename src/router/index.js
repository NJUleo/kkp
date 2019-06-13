import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/Register'
import UserMain from '../views/UserMain'
import UserLogin from '../views/UserLogin'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLogin',
      component: UserLogin,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path :'/UserMovieList2',
      name:'UserMovieList2',
      component:() => import('../views/UserBuyTicket.vue')
    },
    {
      path:'/UserMain',
      name:'/UserMain',
      component: UserMain,
      children: [
        {
          path: '/UserMovieList',
          name: 'UserMovieList',
          component: () => import('../views/UserMovieList.vue')
        },
        {
          path: '/UserMovieDetail',
          name: 'UserMovieDetail',
          component: () => import('../views/UserMovieDetail.vue')
        },
        {
          path: '/UserCheckSchedule',
          name: 'UserCheckSchedule',
          component: () => import('../views/UserCheckSchedule.vue')
        },
        {
          path: '/UserBuyTicket',
          name: 'UserBuyTicket',
          component: () => import('../views/UserBuyTicket.vue')
        },
        {
          path: '/UserVipCardCheck',
          name: 'UserVipCardCheck',
          component:  () => import('../views/UserVipCardCheck.vue')
        },
        {
          path: '/UserCouponCheck',
          name: 'UserCouponCheck',
          component:  () => import('../views/UserCouponCheck.vue')
        },
        {
          path: '/UserOrderCheck',
          name: 'UserOrderCheck',
          component:  () => import('../views/UserOrderCheck.vue')
        },
      ]
    },
  ]
})
