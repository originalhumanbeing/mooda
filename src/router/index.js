import Vue from 'vue'
import Router from 'vue-router'

import FireBaseTest from '@/components/FireBaseTest'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/firebasetest',
      name: 'FireBaseTest',
      component: FireBaseTest
    }
  ]
})
