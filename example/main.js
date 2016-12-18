import Vue from 'vue'
import App from './app'
import clp from '../src'
window.clp = clp

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
})
