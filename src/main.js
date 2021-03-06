import Vue from 'vue'
import App from './App.vue'
import { router } from '@/router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.prototype.$config = {
  posterServiceURL: 'http://image.tmdb.org/t/p/'
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
