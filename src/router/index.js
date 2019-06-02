import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import UserMain from '@/views/UserMain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },{
      path:'/UserMain',
      name:'/UserMain',
      component: AdminMain,
      children: [
        {
          path: '/Register',
          name: 'Register',
          component: () => import('../views/Register.vue')
        }
      ]
    },
  ]
})
