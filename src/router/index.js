import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import UserMain from '@/views/UserMain'
import UserLogin from '@/views/UserLogin'

Vue.use(Router)

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
    },{
      path:'/UserMain',
      name:'/UserMain',
      component: UserMain,
      children: [
        {
          path: '/Register',
          name: 'Register',
          component: () => import('../views/Register.vue')
        },
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
          path: '/UserBuyTicket',
          name: 'UserBuyTicket',
          component: () => import('../views/UserBuyTicket.vue')
        }
      ]
    },
  ]
})
