import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

import store from "./store/index.js"

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
