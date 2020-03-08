import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios; //这样设置之后可以通过this引用

//全局的过滤
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg); //通配w.h，\.为转义为真正的.
});

//better-scroll全局注册
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller);

//loading
import Loading from '@/components/Loading'
Vue.component('Loading',Loading); //注册成全局组件


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
