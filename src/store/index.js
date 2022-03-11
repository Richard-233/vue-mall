import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import sidebar from "./modules/sidebar";

Vue.use(Vuex);

const state = {
    nickname: '',
    user_image: '',
    user_id: ''

}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    sidebar
})
