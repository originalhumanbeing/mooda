import Vue from 'vue'
import Router from 'vue-router'
import Member from '@/components/Member'
import Forgot from '@/components/Forgot'
import Input from '@/components/Input'
import Today from '@/components/Today'

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
    },
    {
      path: '/input',
      name: 'Input',
      component: Input
    },
    {
      path: '/today',
      name: 'Today',
      component: Today
    }
  ]
})
