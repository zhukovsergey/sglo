import Vue from 'vue'
import Photoswipe from 'vue-pswipe'

if (process.client) {
  Vue.use(Photoswipe)
}
