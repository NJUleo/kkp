import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import Main from '@/views/Main'
import Login from '@/views/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path:'/Main',
      name:'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'MovieMain',
          component: () => import('@/views/MovieMain.vue')
        },
        {
          path: 'MovieList',
          name: 'MovieList',
          component: () => import('@/views/MovieList.vue')
        },
        {
          path: 'MovieDetail',
          name: 'MovieDetail',
          component: () => import('../views/MovieDetail.vue')
        },
        {
          path: 'CheckSchedule',
          name: 'CheckSchedule',
          component: () => import('../views/CheckSchedule.vue')
        },
        {
          path: 'BuyTicket',
          name: 'BuyTicket',
          component: () => import('../views/BuyTicket.vue')
        },
        {
          path: 'VipCardCheck',
          name: 'VipCardCheck',
          component:  () => import('../views/VipCardCheck.vue')
        },
        {
          path: 'CouponCheck',
          name: 'CouponCheck',
          component:  () => import('../views/CouponCheck.vue')
        },
        {
          path: 'MyOrder',
          name: 'MyOrder',
          component:  () => import('../views/MyOrder.vue')
        },
      ]
    },
  ]
})
