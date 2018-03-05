import Vue from 'vue'
import App from './App'
import './assets/js/common.js'
import './assets/css/question.css'
import VueResource from 'vue-resource';

Vue.use(VueResource);
// import router from './router'

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
