// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/index'

// fortawesome setting
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fas의 faCoffee 아이콘만 add
// library.add(faCoffee)
// fas에 속한 모든 아이콘 add
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// http 통신
Vue.prototype.$http = axios

// bootstrap setting
require('bootstrap')
require('../node_modules/bootstrap/scss/bootstrap.scss')

// jquery.easing setting
require('jquery.easing')

// jquery.datatables setting
require('datatables')

// EventBus 비 부모-자식 컴포넌트 간 이벤트처리
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
