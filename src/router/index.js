import Vue from 'vue'
import Router from 'vue-router'
import Member from '@/components/Member'
import Forgot from '@/components/Forgot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Member',
      component: Member
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    }
  ]
})
