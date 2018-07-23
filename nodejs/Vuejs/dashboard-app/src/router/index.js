import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import MngTemplate from '@/components/mng/MngTemplate'
import MenuManager from '@/components/mng/MenuManager'
import ExampleTemplate from '@/components/example/ExampleTemplate'
import ExampleHome from '@/components/example/ExampleHome'
import Modal from '@/components/example/Modal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/mng',
      name: 'Management',
      component: MngTemplate,
      children: [
        {
          path: 'menu',
          name: 'MenuManager',
          component: MenuManager
        }
      ]
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
    }
  ]
})
