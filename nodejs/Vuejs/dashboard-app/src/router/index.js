import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ExampleTemplate from '@/components/example/ExampleTemplate'
import ExampleHome from '@/components/example/ExampleHome'
import Modal from '@/components/example/Modal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/example',
      name: 'ExampleTemplate',
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
    }
  ]
})
