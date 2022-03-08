/**
 * 商城Vuex-actions
 */
export default {
    saveUserInfo(context,user){
        context.commit('saveUserInfo',user);
    }
}
