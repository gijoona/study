import Vue from 'vue'
import Router from 'vue-router'

import ExampleTemplate from '@/components/example/ExampleTemplate'
import ExampleHome from '@/components/example/ExampleHome'
import Modal from '@/components/example/Modal'

import DynamicTemplate from '@/components/dynamic/DynamicTemplate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DynamicTemplate',
      component: DynamicTemplate
    },
    {
      path: '/example',
      component: ExampleTemplate,
      children: [
        {
          path: '',
          name: 'ExampleHome',
          component: ExampleHome
        },
        {
          path: 'modal',
          name: 'Modal',
          component: Modal
        }
      ]
    },
    {
      path: '/dynamic',
      name: 'DynamicTemplate',
      component: DynamicTemplate
    }
  ]
})
