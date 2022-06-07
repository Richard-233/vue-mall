import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from "vue-lazyload";
import App from './App.vue'
import ElementUI from 'element-ui';
import VueCookie from 'vue-cookie';
import store from './store'
import './assets/scss/element-variables.scss'
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});
//跨域
axios.defaults.baseURL='/api';
axios.defaults.timeout=8000;
//接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;
  // let path= location.hash;
  if(res.status ===666){
    return res.data;
  }else if(res.status ===10007){
    // if(path!=='#/index#reloaded'){
    //   window.location.href='/#/login'
    // }
  }else{
    alert(res.msg);
    return Promise.reject(res);
  }
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0;
})

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


